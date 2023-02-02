import { Component, NgZone, OnInit } from '@angular/core';
//ici j'importe des proprietés de angular liées a l'utilisation des formulaire
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './.././shared/auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: Boolean = false;
  password = 'password';
  mailExiste: string | null = null;
  users: any;

  constructor(
    private formBuilder: FormBuilder,
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private ngZone:NgZone,
  ) {
    this.registerForm = this.fb.group({
      prenom: [''],
      nom: [''],
      email: [''],
      role: [''],
      password: [''],
      confirmPassword: [''],
      etat: [true],
      matricule: [Date.now()],
      date_inscription: [new Date()],
    });
  }

  
  //ici on gére le controle de saisit du formulaire
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        prenom: ['', [Validators.required, noWhitespaceValidator]],
        nom: ['', [Validators.required, noWhitespaceValidator]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,noWhitespaceValidator,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        role: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        etat: [true],
        matricule: [Date.now()],
        date_inscription: [new Date()],
      },
      {
        validator: MustMatch('password', 'confirmPassword'), //ici je précise au validator que la class MushMatch
        //va géré la comparaison des mots de passe
      }
    );

    this.getAllData();
  }

  getAllData() {
    return this.authService.getAllUser().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }

  registerUser() {
    for (const iterator of this.users) {
      if (iterator.email == this.registerForm.value.email) {
        this.mailExiste = 'Email existe déja';
        console.log(this.mailExiste);
        return;
      }
    }
    this.authService.signUp(this.registerForm.value).subscribe((res) => {
      console.log(res.errors.error.email.message);
      if (res.result) {
       Swal.fire('Modification',
                    'Réussie !',
                    'success');
          //window.location.reload();
          window.setTimeout(function(){location.reload()},1500)
          this.router.navigateByUrl('/pageAdmin')
      } else if (res.error) {
        console.log(res.error);
        this.mailExiste = 'Email existe déja';
      }
    });
  }

  // la fonction getter est utiliser pour un accès facile aux champs de formulaire
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // arrêtez-vous ici si le formulaire est invalide
    if (this.registerForm.invalid) {
      return;
    }

    for (const iterator of this.users) {
      if (iterator.email == this.registerForm.value.email) {
        this.mailExiste = 'Email existe déja';
        // alert ("Email existant");
       // this.registerForm.reset();
        console.log(this.mailExiste);
        return;
      }
    }
    this.authService.signUp(this.registerForm.value).subscribe((res) => {
      console.log(res.errors.error.email.message);
      if (res.result) {
       this.ngOnInit();
       Swal.fire('Modification',
                    'Réussie !',
                    'success');
          //window.location.reload();
          window.setTimeout(function(){location.reload()},1500)
          this.router.navigateByUrl('/pageAdmin')
      } else if (res.error) {
        this.mailExiste = 'Email existe déja';
      }
    });
Swal.fire("Inscription réussie")
   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
      window.location.reload();
  }
}
//ici j'exporte la class MushMatch pour la gestion de mes mots de passes
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      //renvoie si un autre validateur a déjà trouvé une erreur sur le matchingControl
      return;
    }

    //définir une erreur sur matchingControl si la validation échoue
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
export function noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
