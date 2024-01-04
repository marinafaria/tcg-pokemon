import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardInfo } from 'src/app/models/card-info.model';
import { Deck } from 'src/app/models/deck.model';
import { CardsService } from 'src/app/services/cards.service';
import { DecksState } from 'src/app/states/state/decks.state';

@Component({
  selector: 'app-create-deck',
  standalone: false,
  templateUrl: './create-deck.component.html',
  styleUrl: './create-deck.component.scss',
})
export class CreateDeckComponent implements OnInit {
  searchedCardList: CardInfo[] = [];
  deckPlaceholder = [];
  panelOpenState = false;
  currentDeck$!: Observable<Deck | null>;

  constructor(private cardsService: CardsService, private store: Store) {
    this.currentDeck$ = this.store.select(DecksState.getCurrent);
  }

  ngOnInit(): void {
    this.cardsService.searchCards('togepi').subscribe();
    this.cardsService.searchedCards$.subscribe((list) => {
      this.searchedCardList = list;
    });
  }
}
