import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardsListComponent } from 'src/app/components/smarts/cards-list/cards-list.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatExpansionModule,
    CardsListComponent,
    MatButtonModule,
  ],
})
export class HomeModule {}
