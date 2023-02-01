import { Component} from '@angular/core';
import {AfficheWebService } from '../websocket.service'
import io from "socket.io-client";
import { TRANSLATIONS ,OnInit} from '@angular/core';
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
  socket: any;

constructor(private websocketService: AfficheWebService, public AuthService: AuthService) {
  this.socket = io(this.uri);
 }
readonly uri:string ="ws://localhost:4001";
  ngOnInit() {
   
    this.AuthService.historique().subscribe(data=>{
      this.temp=data as unknown as Temp[]
      console.log(this.temp);
      
    })  
  }

  turnOnFan() {
    this.socket.emit('etat','1');
  }
  actRoute: any;
  currentUser: any;


  //ngOnInit() {
    /* let id = this.actRoute.snapshot.paramMap.get('id');
    this.AuthService.getUserProfile(localStorage.getItem('id')).subscribe((res) => {
      console.log(res)
      this.currentUser = res.msg
      ;
    }) */
 
 // };

  turnOffFan() {
    this.socket.emit('etat','0');
  }

  onClick(imageNameObject: { srcr: string; srcs: string; src: string;}) {
    this.imageSrc = imageNameObject.src;
    this.onSrc = imageNameObject.srcs;
    this.offSrc = imageNameObject.srcr;
    return this.turnOnFan();
  }

}