import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { MessageService } from './messageService';

@Injectable({
  providedIn: 'root'
})
export class StompSockService {

  private stompClients: Stomp.Client;

  constructor(private messageService: MessageService) {
    const socket = new SockJS('http://localhost:8080/socket');
    this.stompClients = Stomp.over(socket);
    this.stompClients.debug = () => {};
  }

  private handleReceivedMessage(message: Stomp.Message): void {
    // Publish the message to the MessageService
    this.messageService.publishMessage(message.body);
  }


  subscribe(topic: string, token: string ) :void {
    this.stompClients.connect({'Authorization':token}, (frame) => {
       console.log('Connected: ' + frame);
      this.stompClients.subscribe(topic, (message) => {
       console.log('Received: ' + message);
      this.handleReceivedMessage(message);
    });
  });
  }

  unsubscribe(topic: string): void {
    this.stompClients.unsubscribe(topic);
    this.stompClients.disconnect(() => {
      console.log('disconeted!')
    });
  }

}
