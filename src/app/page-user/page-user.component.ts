import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
import { AfficheWebService } from '../affiche-web.service';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {
  temperature:any;
  humidite:any;
  dt: any;
  currentUser: any = {};
  getItem: any = {};
  submitted: Boolean= false
  mailExiste:string='';
  succes:string='Modifier avec succes';
  getId: any;
  registerForm!: FormGroup<any>;
  showForm = false;
  constructor(private activatedRoute: ActivatedRoute,
    private ngZone:NgZone,private router: Router,
    private actRoute: ActivatedRoute,
    public authService: AuthService,
    public AuthService: AuthService,
    private AfficheWebService :AfficheWebService,
   
    ){}

   /*  choice(){
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
    } */
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
    })
  }
  logout() {
    this.AuthService.doLogout();
  }
  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(localStorage.getItem('id')).subscribe((res) => {
      console.log(res)
      this.currentUser = res.msg;
      this.AfficheWebService.listen().subscribe((data)=>{
        console.log(data);
        this.dt= data;
        this.temperature = this.dt?.temperature
        console.log(this.temperature);
        this.humidite = this.dt?.humidite
        console.log(this.humidite);
      })
      
     
    }); 
  }
}


function rtn() {
   window.history.back();
}
