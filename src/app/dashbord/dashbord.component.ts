import { Component, TRANSLATIONS ,OnInit} from '@angular/core';
import { Temp } from '../shared/temp';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})

export class DashbordComponent  implements OnInit{
  temperature:any;
  humidite:any;
  temp!:any[]
  tab!:any[]
  imageSrc = 'assets/fanstop.png';
  onSrc = 'assets/noton.jpg';
  offSrc = 'assets/off.jpg' ;

  imageOn= [ {srco:'assets/on.jpg'}];
  imageButtons = [ {src:'assets/fanstop.png', srcs:'assets/noton.jpg', srcr :'assets/off.jpg'}];
  imageButtonOn = [ {src:'assets/fanrun.gif',  srcr:'assets/notoff.jpg', srcs : 'assets/on.jpg'}];
  actRoute: any;
  currentUser: any;
  currentDate: any;
  hist: any;
  element!: any;
  element1!:any
  element2!: any;
  element4!: any;
  element3!:any
  element5!: any;
  element6!: any;

constructor(public AuthService: AuthService) {}
  ngOnInit() {
    /* let id = this.actRoute.snapshot.paramMap.get('id');
    this.AuthService.getUserProfile(localStorage.getItem('id')).subscribe((res) => {
      console.log(res)
      this.currentUser = res.msg
      ;
    }) */
    this.AuthService.historique().subscribe(data=>{
      //this.temp = data;
      this.temp=data as unknown as Temp[]
      /* console.log(this.temp); */
     /*  this.currentDate = new Date().getDate() -7 + '/' + new Date().getMonth() +1 + '/'+  new Date().getFullYear();
      this.hist = this.temp.filter((e:any)=> e.Date==this.currentDate)
      console.log(this.currentDate); */
   
      for (let index = 0; index < 7; index++) {
        
         this.element = Array(this.temp[0]);
         this.element1 = Array(this.temp[1]);
         this.element2 = Array(this.temp[2]);
         this.element3 = Array(this.temp[3]);
         this.element4 = Array(this.temp[4]);
         this.element5 = Array(this.temp[5]);
         this.element6 = Array(this.temp[6]);
            //console.log(this.element);
           /*  this.tab.push(this.element); */
            

    }
    console.log(this.element);
  } )   
  };

 
   
 



  onClick(imageNameObject: {
    srcr: string;
    srcs: string; src: string;
}) {
    this.imageSrc = imageNameObject.src;
    this.onSrc = imageNameObject.srcs;
    this.offSrc = imageNameObject.srcr;
  }

}
