import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class StompSockService {

  public stompClients: Stomp.Client;

  constructor() {
    const socket = new SockJS('http://localhost:3000/socket');
    this.stompClients = Stomp.over(socket);
  }

  unsubscribe(): void {
    this.stompClients.unsubscribe('/topic/messages');
    this.stompClients.disconnect(() => {
      console.log('disconeted!')
    });
  }

}
