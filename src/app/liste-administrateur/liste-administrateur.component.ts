import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import UsersJson from '../users.json';
import { AuthService } from '../shared/auth.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter'; /* recherche */
import { HttpErrorResponse } from '@angular/common/http';

interface USERS {
  Nom: String;
  Prenom: String;
  Matricule: String;
  Email: String;
  Date_inscription: String;
}

@Component({
  selector: 'app-liste-administrateur',
  templateUrl: './liste-administrateur.component.html',
  styleUrls: ['./liste-administrateur.component.scss'],
})
export class ListeAdministrateurComponent implements OnInit {
  /* liste fiective à remplacer Books par []  pour les données rééels*/

  pages: number = 1;
  searchText: any; // search installer npm i ng2-search-filter

  User: any = [];
  data: any;
  ngZone: any;

  deconnect() {
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

  constructor(public AuthService: AuthService, private router: Router) {

    const role=localStorage.getItem('role')
    console.log(role)
    if (role=="utilisateur_simple"){
      this.router.navigateByUrl("/pageUser")
    }
  }

  ngOnInit(): void {
    this.AuthService.getAllUser().subscribe((res: any) => {
      console.log(res);
      

      this.data = res;
      const email=localStorage.getItem('email')
      console.log(email)
      this.User = this.data.filter((e: any) => e.etat == true && e.email!=email);
    });
    if (this.data.status == 401) {
      this.router.navigateByUrl("/connexion");
    }
  }
  
  logout() {
    this.AuthService.doLogout();
  }

  /*   delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.AuthService.deleteBook(id).subscribe((res) => {
        this.Books.splice(i, 1);
      });
    }
  } */
  changeRole = (id: any, role: any) => {
    role == 'administrateur'
      ? (role = 'utilisateur_simple')
      : (role = 'administrateur'); /* pour switche */
    const users = { role: role };
    if (confirm('Changer de role')) {
      this.AuthService.update(id, users).subscribe((data) => {
        this.ngOnInit();
      });
    }
  };

  changeEtat = (id: any, etat: any) => {
    etat == true ? (etat = false) : (etat = true); /* pour switche */
    const users = { etat: etat };
    if (confirm('Voulez vous archiver ?')) {
      this.AuthService.update(id, users).subscribe((data) => {
        this.ngOnInit();
      });
    }
  };

  // changeRole2 = (id: any, etat: any) => {
  // etat = etat == true ? false : true; /* pour archiver */
  /* const user = { etat: etat };
    if (confirm('Archiver !!!')) {
      this.crudService.change_role(id, user).subscribe((data) => {
        this.ngOnInit();
      });
    }
  }; */
}
