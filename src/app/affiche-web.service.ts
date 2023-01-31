import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import io from "socket.io-client";


@Injectable({
  providedIn: 'root'
})
export class AfficheWebService {

  constructor() { 
    this.socket = io(this.uri);
  }

  socket: any;
  readonly uri:string ="ws://localhost:4001";

  listen(){
    return new Observable((Subscriber)=>{
    this.socket.on("data", (data:any) =>{
      Subscriber.next(data);
    })
    });
  }
 /*  emit (evenName:string ,data :any){
    this.socket.emit(evenName,data)
  } */
}
