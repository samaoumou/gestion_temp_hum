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
  temp!:Temp[]
 
  imageSrc = 'assets/fanstop.png';
  onSrc = 'assets/noton.jpg';
  offSrc = 'assets/off.jpg' ;

  imageOn= [ {srco:'assets/on.jpg'}];
  imageButtons = [ {src:'assets/fanstop.png', srcs:'assets/noton.jpg', srcr :'assets/off.jpg'}];
  imageButtonOn = [ {src:'assets/fanrun.gif',  srcr:'assets/notoff.jpg', srcs : 'assets/on.jpg'}];
  actRoute: any;
  currentUser: any;

constructor(public AuthService: AuthService) {}
  ngOnInit() {
    /* let id = this.actRoute.snapshot.paramMap.get('id');
    this.AuthService.getUserProfile(localStorage.getItem('id')).subscribe((res) => {
      console.log(res)
      this.currentUser = res.msg
      ;
    }) */
    this.AuthService.historique().subscribe(data=>{
      this.temp=data as unknown as Temp[]
      console.log(this.temp);
      
    })   
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
