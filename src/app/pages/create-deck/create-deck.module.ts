import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDeckComponent } from './create-deck.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardsListComponent } from 'src/app/components/smarts/cards-list/cards-list.component';

@NgModule({
  declarations: [CreateDeckComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateDeckComponent,
      },
    ]),
    MatExpansionModule,
    CardsListComponent,
  ],
})
export class CreateDeckModule {}
