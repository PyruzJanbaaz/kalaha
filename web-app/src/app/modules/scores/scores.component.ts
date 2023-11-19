import { Component } from '@angular/core';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent {
  displayedColumns: string[] = ['id', 'date', 'yourScore', 'opponentScore'];
  
  dataSource = [
    { id: 1, date: '2023/09/12 15:56:20', yourScore: 41, opponentScore: 25 },
    { id: 2, date: '2023/09/15 10:00:20', yourScore: 44, opponentScore: 16 },
    { id: 3, date: '2023/10/01 00:00:33', yourScore: 55, opponentScore: 5 },
    // Add more data as needed
  ];
}
