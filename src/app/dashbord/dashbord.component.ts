import { Component} from '@angular/core';
import {AfficheWebService } from '../websocket.service'
import io from "socket.io-client";
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})

export class DashbordComponent {

  imageSrc = 'assets/fanstop.png';
  onSrc = 'assets/noton.jpg';
  offSrc = 'assets/off.jpg' ;

  imageOn= [ {srco:'assets/on.jpg'}];
  imageButtons = [ {src:'assets/fanstop.png', srcs:'assets/noton.jpg', srcr :'assets/off.jpg'}];
  imageButtonOn = [ {src:'assets/fanrun.gif',  srcr:'assets/notoff.jpg', srcs : 'assets/on.jpg'}];
  socket: any;

constructor(private websocketService: AfficheWebService) {
  this.socket = io(this.uri);
 }
readonly uri:string ="ws://localhost:4001";
  ngOnInit() {
   
    
  }

  turnOnFan() {
    this.socket.emit('etat','1');
  }

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