import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/auth.service';
import { AfficheWebService } from '../affiche-web.service';
import { Temp } from '../shared/temp';

//ici j'importe des proprietés de angular liées a l'utilisation des formulaire
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//import { CrudService } from './../services/inscription.service';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent implements OnInit {
open() {
throw new Error('Method not implemented.');
}
  temperature:any;
  humidite:any;
  currentUser: any = {};
  getItem: any = {};
  submitted: Boolean= false
  mailExiste:string='';
  succes:string='Modifier avec succes';
  getId: any;
  registerForm!: FormGroup<any>;
  showForm = false;
  
  

  
  tmoy: any;
  dt: any;
  tempHuitHeure:any;
  tempDouzeHeure:any;
  tempDixNeufHeure:any;
  temp!:Temp[]
  currentDate:any;
  Tmoy :any;
  Hmoy: any;
 /*  var!: moyT; */
  constructor(private ngZone:NgZone,private router: Router,private activatedRoute: ActivatedRoute,
    private actRoute: ActivatedRoute,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public AuthService: AuthService,
    private websocketService: AfficheWebService,
    private AfficheWebService :AfficheWebService,
    ){
      const role=localStorage.getItem('role')
     // console.log(role)
      if (role=="utilisateur_simple"){
        this.router.navigateByUrl("/pageUser")
      }
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
   // let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(localStorage.getItem('id')).subscribe((res) => {
     // console.log(res)
      this.currentUser = res.msg;
      this.AfficheWebService.listen().subscribe((data)=>{
        console.log(data);
        this.dt= data;
        this.temperature = this.dt?.temperature
        console.log(this.temperature);
        this.humidite = this.dt?.humidite
        console.log(this.humidite);
       /*  this.tempHuitHeure = this.dt?.tempHuitHeure
        console.log(this.tempHuitHeure);
        this.tempDouzeHeure = this.dt?.tempDouzeHeure
        console.log(this.tempDouzeHeure);
        this.tempDixNeufHeure = this.dt?.tempDixNeufHeure
        console.log(this.tempDixNeufHeure); */
        
     /*  this.Mhum = (parseInt(String(this.hum8h)) + parseInt(String(this.hum12h)) + parseInt(String(this.hum19h))) / 3; */
      }
      )

    });
    this.AuthService.historique().subscribe(data=>{

      this.temp=data as unknown as Temp[]
      this.currentDate ='0'+ (+new Date().getDate()) + '/' +'0'+ (+(new Date().getMonth()+1)) + '/'+  new Date().getFullYear();
      console.log(this.currentDate)
       this.tempHuitHeure = this.temp.filter((e:any)=>e.Heure=="9:23:00"&& e.Date==this.currentDate)
       console.log(this.tempHuitHeure)
       this.tempDouzeHeure = this.temp.filter((e:any)=>e.Heure=="9:37:00"&& e.Date==this.currentDate)
       this.tempDixNeufHeure = this.temp.filter((e:any)=>e.Heure=="9:44:00"&& e.Date==this.currentDate)
       const temp8 = this.tempHuitHeure[0].Temperature;
       const temp12 = this.tempDouzeHeure [0].Temperature;
       const temp19 = this.tempDixNeufHeure [0].Temperature;
       console.log(this.temp)
       this.tmoy = (parseInt(String(temp8)) + parseInt(String(temp12)) + parseInt(String(temp19))) / 3; 
       
       console.log(this.tmoy)
    })


   

    this.registerForm = this.formBuilder.group({
      prenom: ['', [Validators.required, noWhitespaceValidator]],
      nom: ['', [Validators.required, noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],



    })
    this.websocketService.socket.on('data', (data: any) => {
       console.log(data);
      this.temperature=data.temperature ;
      this.humidite=data.humidite 
    });

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
// changement de l'image par apport à la température
/* imageth =''
ht = [{humide:'assets/humide.png',sec:'assets/sec.jpg'}];
changetime(imageNameObject: { src: string;}) {
  this.imageth = imageNameObject.src;
}
 */

}
export function  noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}