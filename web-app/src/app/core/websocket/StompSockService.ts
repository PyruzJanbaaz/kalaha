import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class StompSockService {

  private stompClients: Stomp.Client;

  constructor() {
    const socket = new SockJS('http://localhost:3000/socket');
    this.stompClients = Stomp.over(socket);
    this.stompClients.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      this.stompClients.subscribe('/topic/messages', (message) => {
        console.log('Received: ' + message);
      });
    });
  }

  unsubscribe(): void {
    this.stompClients.unsubscribe('/topic/messages');
    this.stompClients.disconnect(() => {
      console.log('disconeted!')
    });
  }

}
