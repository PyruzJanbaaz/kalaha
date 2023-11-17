import { Component, OnInit } from '@angular/core';
import { StompSockService } from 'src/app/core/websocket/StompSockService';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{

  constructor(private stompSockService: StompSockService) {}

  ngOnInit(): void {
    // WebSocket connection will be established on component initialization
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
    this.stompSockService.unsubscribe();
  }
}
