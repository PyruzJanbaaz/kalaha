import { Component } from '@angular/core';
import { StompSockService } from 'src/app/core/websocket/StompSockService';
import { ApiDataService } from 'src/app/core/http/api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent{

  constructor(private stompSockService: StompSockService,
              private apiDataService: ApiDataService,
              private router: Router) {
    this.subscribe();
  }

  subscribe(): void {
    this.stompSockService.stompClients.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      this.stompSockService.stompClients.subscribe('/topic/messages', (message) => {
        console.log('Received: ' + message);
      });
    });
  }

  players = [1, 2]; // Player 1 and Player 2
  playerPits: { [player: number]: number[] } = {
    1: [6, 6, 6, 6, 6, 6],
    2: [6, 6, 6, 6, 6, 6],
  };
  playerStores: { [player: number]: number } = {
    1: 0,
    2: 0
  };

  playerPitClick(player: number, pitIndex: number) {
    // Handle player's move for the clicked pit
    // Implement game logic for stone distribution
  }

  playerStoreClick(player: number) {
    // Handle player's move for the store
    // Implement game logic for capturing stones
  }

  getPits(player: number): number[] {
    return this.playerPits[player];
  }

  getPlayerStore(player: number): number {
    return this.playerStores[player];
  }

  getPlayerClass(player: number): string {
    return '';
  }

  unsubscribe() {
    this.apiDataService.exitGame().then(() => {
      this.stompSockService.unsubscribe();
      location.reload();
    })

  }
}
