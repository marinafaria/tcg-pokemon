import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckMakerComponent } from './deck-maker.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardsListComponent } from 'src/app/components/smarts/cards-list/cards-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [DeckMakerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DeckMakerComponent,
      },
    ]),
    MatExpansionModule,
    CardsListComponent,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class DeckMakerModule {}
