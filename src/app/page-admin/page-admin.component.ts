import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/auth.service';

//ici j'importe des proprietés de angular liées a l'utilisation des formulaire
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//import { CrudService } from './../services/inscription.service';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent implements OnInit {

  currentUser: any = {};
  getItem: any = {};
  submitted: Boolean= false
  mailExiste:string='';
  succes:string='Modifier avec succes';
  getId: any;
  registerForm!: FormGroup<any>;
  showForm = false;

  constructor(private ngZone:NgZone,private router: Router,private activatedRoute: ActivatedRoute,
    private actRoute: ActivatedRoute,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public AuthService: AuthService,
    ){}


  deconnect(){
    Swal.fire({
      title: 'Déconnexion',
      text: 'Êtes-vous sûre de vouloir vous déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OUI',
      cancelButtonText: 'NON',
    }).then((result) => {
      if (result.value) {
        // this.ngZone.run(() => this.router.navigateByUrl(''));
        this.logout();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        result.dismiss === Swal.DismissReason.cancel;
      }
    });
  }
  choice(){
    Swal.fire({
      title: 'Modifier Profil',
      showCancelButton: true,
      confirmButtonText: 'modifier profil',
      cancelButtonText: 'modifier mot_de_passe',
    }).then((result) => {
   if (result.value) {
        this.ngZone.run(() => this.router.navigateByUrl('/modifierProfil'));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        (result.dismiss === Swal.DismissReason.cancel)
        this.ngZone.run(() => this.router.navigateByUrl('/modifierPassword'));
      }


    })
  }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(localStorage.getItem('id')).subscribe((res) => {
      console.log(res)
      this.currentUser = res.msg;


    });

    this.registerForm = this.formBuilder.group({
      prenom: ['', [Validators.required, noWhitespaceValidator]],
      nom: ['', [Validators.required, noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],



    })


  }
  logout() {
    this.AuthService.doLogout();
  }
  getData(id:any,nom:any,prenom:any, email:any){
      this.showForm= true
      this.registerForm = this.formBuilder.group({
        id: [id, [Validators.required, noWhitespaceValidator]],
        prenom: [prenom, [Validators.required, noWhitespaceValidator]],
        nom: [nom, [Validators.required, noWhitespaceValidator]],
        email: [email, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],



      })
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['connexion']);
    }
  }

  onSubmit() {
    this.submitted = true;

    // arrêtez-vous ici si le formulaire est invalide
    if (this.registerForm.invalid) {
        return;
    }

     this.AuthService.miseAJour(this.getId, this.registerForm.value).subscribe(
       () => {
         alert(this.succes),
         this.ngZone.run(() => this.router.navigateByUrl('/listeAdmin'));
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