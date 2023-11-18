import { Component } from '@angular/core';
import { ApiDataService } from '../../../core/http/api-data.service';

@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.component.html',
  styleUrls: ['./newgame.component.css']
})
export class NewgameComponent {

  constructor(private apiDataService: ApiDataService) { }

  isLoading = false;
  isGameCreated = false;

  startGame() {
    this.isLoading = true;
    const data = {
      "player1": "Pyruz",
      "player2": "Riaz"
    };
    this.apiDataService.startGame(data)
    .then(response => {
      console.log(response);
      this.isLoading = false;
      this.isGameCreated = true;
    })
  }
  
}
