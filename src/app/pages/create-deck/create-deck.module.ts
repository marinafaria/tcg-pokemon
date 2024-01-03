import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDeckComponent } from './create-deck.component';
import { RouterModule } from '@angular/router';

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
  ],
})
export class CreateDeckModule {}
