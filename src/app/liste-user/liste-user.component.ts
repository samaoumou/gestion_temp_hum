
import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';import UsersJson from '../users.json';
import { AuthService } from '../shared/auth.service';


interface USERS {

  Nom: String;
  Prenom: String;
  Matricule: String;
  Email: String;
  Date_inscription: String;
}

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss']
})
export class ListeUserComponent implements OnInit{
  /* Users: USERS[] = UsersJson;
  constructor() {
    console.log(this.Users);
  } */
  pages:number=1;
  searchText!:string;
 /*  Users: USERS[] = UsersJson; */
 User: any = [];
 data:any;

  prenom!:any;
  nom!:any;
  matricule!:any
  etat:any = localStorage.getItem('token');

  constructor(public AuthService: AuthService){
  /*   console.log(this.Users); */
  }
  ngOnInit(): void {
    this.AuthService.getAllUser().subscribe((res) => {
      console.log(res);
      this.data = res;
      const email=localStorage.getItem('email')
      this.data = res;
      this.User = this.data.filter((e: any) => e.etat == true  && e.email!=email);

    });
  }

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
          (result.dismiss === Swal.DismissReason.cancel)
        }
    })
  }
  logout(){
    this.AuthService.doLogout();
  }

  deconnexion()
  {
    // Effacer tous les éléments
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('prenom');
    localStorage.removeItem('nom');
    localStorage.removeItem('matricule');
  }
}
