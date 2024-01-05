import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardInfo } from 'src/app/models/card-info.model';
import { Deck } from 'src/app/models/deck.model';
import { CardsService } from 'src/app/services/cards.service';
import { DeckState } from 'src/app/states/state/deck.state';

@Component({
  selector: 'app-deck-maker',
  standalone: false,
  templateUrl: './deck-maker.component.html',
  styleUrl: './deck-maker.component.scss',
})
export class DeckMakerComponent implements OnInit {
  searchedCardList: CardInfo[] = [];
  deckPlaceholder = [];
  panelOpenState = false;
  currentDeck$!: Observable<Deck | null>;

  constructor(private cardsService: CardsService, private store: Store) {
    this.currentDeck$ = this.store.select(DeckState.getDeck);
  }

  ngOnInit(): void {
    this.cardsService.searchCards('togepi').subscribe();
    this.cardsService.searchedCards$.subscribe((list) => {
      this.searchedCardList = list;
    });
  }
}
