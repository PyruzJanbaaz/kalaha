import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { NewgameComponent } from './components/newgame.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [NewgameComponent, BoardComponent],
  imports: [CommonModule, 
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressSpinnerModule
],
})
export class NewgameModule {}