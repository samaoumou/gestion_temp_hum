import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
import { AfficheWebService } from '../affiche-web.service';
import { Temp } from '../shared/temp';
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
  tmoy: any;
 
  tempHuitHeure:any;
  tempDouzeHeure:any;
  tempDixNeufHeure:any;
  temp!:Temp[]
  currentDate:any;
  Tmoy :any;
  Hmoy: any;

  
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
  //  let id = this.actRoute.snapshot.paramMap.get('id');
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
      
      this.AuthService.historique().subscribe(data=>{
        this.temp=data as unknown as Temp[]
        this.currentDate ='0'+ (+new Date().getDate()) + '/' +'0'+ (+(new Date().getMonth()+1)) + '/'+  new Date().getFullYear();
        console.log(this.currentDate)
         this.tempHuitHeure = this.temp.filter((e:any)=>e.Heure=="9:23:00"&& e.Date==this.currentDate)
         console.log(this.tempHuitHeure)
         this.tempDouzeHeure = this.temp.filter((e:any)=>e.Heure=="9:37:00"&& e.Date==this.currentDate)
         this.tempDixNeufHeure = this.temp.filter((e:any)=>e.Heure=="9:44:00"&& e.Date==this.currentDate)
         console.log(this.temp)
         const temp8 = this.tempHuitHeure[0].Temperature;
         const temp12 = this.tempDouzeHeure [0].Temperature;
         const temp19 = this.tempDixNeufHeure [0].Temperature;
         console.log(this.temp)
         this.tmoy = (parseInt(String(temp8)) + parseInt(String(temp12)) + parseInt(String(temp19))) / 3; 
      })
    }); 
    
  }
}


function rtn() {
   window.history.back();
}
