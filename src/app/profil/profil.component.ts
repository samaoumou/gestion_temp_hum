import { Component, OnInit } from '@angular/core';
//ici j'importe des proprietés de angular liées a l'utilisation des formulaire
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { CrudService } from './../services/inscription.service';
import { AuthService } from '../shared/auth.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit{

  submitted: Boolean= false
  mailExiste:string='';
  succes:string='Modifier avec succes';
  getId: any;
  registerForm!: FormGroup<any>;
  //ici on gére le controle de saisit du formulaire
  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      prenom: ['', [Validators.required, noWhitespaceValidator]],
      nom: ['', [Validators.required, noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],



    })

    }
    constructor(
      public formBuilder: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private activatedRoute: ActivatedRoute,
      public AuthService: AuthService
    ){

      this.registerForm = this.formBuilder.group({
        prenom: [''],
        nom: [''],
        email: [''],
  
        
      });
  
       this.getId = this.activatedRoute.snapshot.paramMap.get('id');
  
      this.AuthService.getUserById(this.getId).subscribe((res) => {
        this.registerForm.setValue({
          prenom: res['prenom'],
          nom: res['nom'],
          email: res['email'],
        });
      }); 
  
     

  }

     // la fonction getter est utiliser pour un accès facile aux champs de formulaire
     get f() { return this.registerForm.controls; }

     onSubmit() {
         this.submitted = true;

         // arrêtez-vous ici si le formulaire est invalide
         if (this.registerForm.invalid) {
             return;
         }
         
          this.AuthService.miseAJour(this.getId, this.registerForm.value).subscribe(
            () => {
              alert(this.succes)
            //  this.ngZone.run(() => this.router.navigateByUrl(''));
            },
            (err) => {
              this.mailExiste = "Email existe déja";
            }
          );
        

        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
     }

  }
  export function  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}



