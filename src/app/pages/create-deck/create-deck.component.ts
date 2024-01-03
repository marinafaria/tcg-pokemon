import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardInfo } from 'src/app/models/card-info.model';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-create-deck',
  standalone: false,
  templateUrl: './create-deck.component.html',
  styleUrl: './create-deck.component.scss',
})
export class CreateDeckComponent implements OnInit {
  cardList: CardInfo[];

  constructor(private cardsService: CardsService) {
    this.cardList = [];
  }

  ngOnInit(): void {
    this.cardsService.searchCards('togepi').subscribe();
    this.cardsService.searchedCards$.subscribe((list) => {
      console.log(list);
      this.cardList = list;
    });
  }
}
