
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
  selector: 'app-list-archives',
  templateUrl: './list-archives.component.html',
  styleUrls: ['./list-archives.component.scss']
})
export class ListArchivesComponent implements OnInit{

  /* liste fiective à remplacer Books par []  pour les données rééels*/

 pages: number = 1;
 searchText:any; // search installer npm i ng2-search-filter

 User: any = [];
 data:any;
  ngZone: any;
  router: any;

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
        // this.ngZone.run(() => this.router.navigateByUrl('/'));
        this.logout();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        (result.dismiss === Swal.DismissReason.cancel)
      }
  })
}

 constructor(public AuthService: AuthService) {}

 ngOnInit(): void {
   this.AuthService.getAllUser().subscribe((res) => {
     console.log(res);
     this.data = res;
     this.User = this.data.filter((e: any) => e.etat == false );
   });
 }
 
 logout(){
  this.AuthService.doLogout();
}

/* pour désarchiver */
desarchive = (id: any, etat: any) => {
  etat == false ? etat = true : etat= false; 
   const users = { etat: etat };
  if (confirm('Voulez vous désarchiver ?')) {
    this.AuthService.update(id, users).subscribe((data) => {
      this.ngOnInit();
    });
  }
}; 


}


