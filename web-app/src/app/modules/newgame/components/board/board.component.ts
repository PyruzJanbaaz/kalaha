import { Component } from '@angular/core';
import { ApiDataService } from 'src/app/core/http/api-data.service';
import { MessageService } from 'src/app/core/websocket/messageService';
import { StompSockService } from 'src/app/core/websocket/StompSockService';
import { SessionStorageService } from 'src/app/core/store/session.storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent{

  finalResult = {
    icon:'',
    text: ''
  };
  turnPlayerId = '';
  turning = {
    color: '',
    text: 'Processing...'
  }

  isWaiting = true;
  loadingMessage = 'Waiting to join an opponent...';
  players: string[] = ['1', '2']; // Player 1 and Player 2
  playerScores: { [player: string]: number } = {
    '1': 0,
    '2': 0
  };
  playerSuffix : { [player: string]: string }= {
    'Player1': '',
    'Palyer2': ''
  } 
  playerStores: { [player: string]: number } = {
    '1': 0,
    '2': 0
  };
  playerPits: { [player: string]: number[] } = {
    '1': [0, 0, 0, 0, 0, 0],
    '2': [0, 0, 0, 0, 0, 0],
  };

  constructor(private messageService: MessageService,
              private toastr: ToastrService,    
              private apiDataService: ApiDataService,
              private stompSockService: StompSockService,
              private sessionStorageService: SessionStorageService) {
    // Subscribe to the message$ observable to receive messages
    this.stompSockService.subscribe(
        '/app/user/' + /*this.sessionStorageService.get('user').userId*/ 'b93fee30-d097-44d3-9091-9f6a62b2b6de' + '/' + this.sessionStorageService.get('gameId'),
        this.sessionStorageService.get('token'));
    this.messageService.message$.subscribe((message) => {
      this.handleMessage(message);
    });
  }

  private handleMessage(message: string): void {
    // Do something with the received message
    const event = JSON.parse(message)
    this.turnPlayerId = event.gameDto.turnPlayerId;
    this.turning.text = this.turnPlayerId ===  'b93fee30-d097-44d3-9091-9f6a62b2b6de' /*this.sessionStorageService.get('user').userId */ ? 'Your turn' :"Opponent's turn";
    this.players = []; 
    this.playerStores = {};
    this.playerScores = {};
    this.playerPits = {};


      event.gameDto.boardList.forEach((el: any) => {
        this.players.push(el.playerName);
        // Sort the array based on the "order" property
        const sortedArray: { order: number; value: number }[] = el.pitDtoList.sort((a: { order: number; value: number }, b: { order: number; value: number }) => a.order - b.order);
        // Extract the "value" property and create a new array
        const resultArray: number[] = sortedArray.slice(0, 6).map(item => item.value);
        this.playerPits[el.playerName] = resultArray;
        const store: { order: number; value: number } = sortedArray[6];
        this.playerStores[el.playerName] = store.value;
        this.playerScores[el.playerName] = el.score;
        this.playerSuffix[el.playerName] = el.playerName === this.sessionStorageService.get('user').fullName ? '(You)' : '';
        console.log(this.playerPits)
        console.log('playerStores' +this.playerStores)
        console.log('playerScores' + this.playerScores)
        this.isWaiting = false;
      });


      switch (event.subject ) {
        case 'start':
          this.toastr.success('The game has started');
          break;
        case 'end':
          const maxEntry = Object.entries(this.playerScores).reduce((max, entry) => {
            return entry[1] > max[1] ? entry : max;
          }, ['', Number.MIN_VALUE]);
          console.log(maxEntry);
          if(maxEntry[0] === 'b93fee30-d097-44d3-9091-9f6a62b2b6de' /*this.sessionStorageService.get('user').userId */){
            this.finalResult = {
              icon: 'congrats.png',
              text: 'You won!'
            };
          } else {
            this.finalResult = {
              icon: 'sorry.png',
              text: 'You lost!'
            };
          }
        break;
        case 'leave':
          this.endGame();
          this.finalResult = {
            icon: 'sorry.png',
            text: 'Opponent left!'
          };
        break;
      }      
    console.log(event)
  }


  async playerPitClick(player: string, pitIndex: number) {
    if(!this.isWaiting && player === this.turnPlayerId &&
      this.turnPlayerId === 'b93fee30-d097-44d3-9091-9f6a62b2b6de' /*this.sessionStorageService.get('user').userId */){
      // Handle player's move for the clicked pit
      // Implement game logic for stone distribution
      // just to show how you can show/hode the loading component
      console.log(player  + ' '+ pitIndex)
      this.isWaiting = true;
      this.loadingMessage = 'Loading...';
      const moveRequestDto = {
        joinId: this.sessionStorageService.get('gameId'),
        selectedPitIndex: pitIndex
      }
      this.apiDataService.move(moveRequestDto).then((result) => {
        console.log(result)
      });
    }
  }

  getPits(player: string): number[] {
    return this.playerPits[player];
  }

  getPlayerStore(player: string): number {
    return this.playerStores[player];
  }


  endGame() {
    this.stompSockService.unsubscribe( '/app/user/' + /*this.sessionStorageService.get('user').userId*/ 'b93fee30-d097-44d3-9091-9f6a62b2b6de' + '/' + this.sessionStorageService.get('gameId'));
  }

  leaveTheGame() {
    const leaveRequestDto = {joinId: this.sessionStorageService.get('gameId')};
    this.isWaiting = true;
    this.loadingMessage = 'Leaving...';
    this.apiDataService.leave(leaveRequestDto).then(() => {
      this.endGame();
      this.reload();
    })
  }

  reload() {
    location.reload();
  }

}
