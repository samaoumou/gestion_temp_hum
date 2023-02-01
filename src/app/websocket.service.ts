
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import io from "socket.io-client";


@Injectable({
  providedIn: 'root'
})
export class AfficheWebService {
  socket$: any;

  constructor() { 
    this.socket = io(this.uri);
  }
  fanStatus = false;
  socket: any;
  readonly uri:string ="ws://localhost:4001";

  listen(){
    return new Observable((Subscriber)=>{
    this.socket.on("data", (data:any) =>{
      Subscriber.next(data);
    })
    });
  }
  sendMessage(message: string) {
    this.fanStatus = !this.fanStatus;
    this.socket$.next({ command: this.fanStatus ? 'turnOnFan' : 'turnOffFan' });
    }
    }
 /*  emit (evenName:string ,data :any){
    this.socket.emit(evenName,data)
  } */

