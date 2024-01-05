import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckMakerComponent } from './deck-maker.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardsListComponent } from 'src/app/components/smarts/cards-list/cards-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoadingBoxModule } from 'src/app/components/dumbs/loading-box/loading-box.module';

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
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    LoadingBoxModule,
  ],
})
export class DeckMakerModule {}
