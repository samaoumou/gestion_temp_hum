import { Component, TRANSLATIONS } from '@angular/core';
import {AfficheWebService } from '../websocket.service'
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

constructor(private websocketService: AfficheWebService) { }
  ngOnInit() {
this.websocketService.socket();
  }
// function called when the "On" button is clicked
turnOnVentilator() {
  this.socket.emit("fan", '1')
}
  // function called when the "Off" button is clicked
  turnOffVentilator() {
  this.socket.emit("fan", '0')
  }

  onClick(imageNameObject: { srcr: string; srcs: string; src: string;}) {
    this.imageSrc = imageNameObject.src;
    this.onSrc = imageNameObject.srcs;
    this.offSrc = imageNameObject.srcr;
    
  }

}
