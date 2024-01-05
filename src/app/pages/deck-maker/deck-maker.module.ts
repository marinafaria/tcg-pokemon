import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckMakerComponent } from './deck-maker.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardsListComponent } from 'src/app/components/smarts/cards-list/cards-list.component';

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
  ],
})
export class DeckMakerModule {}
