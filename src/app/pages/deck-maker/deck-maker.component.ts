import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardInfo } from 'src/app/models/card-info.model';
import { Deck } from 'src/app/models/deck.model';
import { CardsService } from 'src/app/services/cards.service';
import { DeckState } from 'src/app/states/state/deck.state';
import { DecksAction } from 'src/app/states/state/decks.actions';

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

  constructor(
    private cardsService: CardsService,
    private store: Store,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.currentDeck$ = this.store.select(DeckState.getDeck);
  }

  ngOnInit(): void {
    this.cardsService.searchCards('togepi').subscribe();
    this.cardsService.searchedCards$.subscribe((list) => {
      this.searchedCardList = list;
    });
  }

  onSubmit() {
    let currentDeck = this.store.selectSnapshot(DeckState.getDeck);
    if (this.isValid(currentDeck)) {
      this.store.dispatch(new DecksAction.Add(currentDeck));
      this.router.navigateByUrl('/');
      this.openSnackBar('Baralho criado com sucesso', 'ok');
    } else {
      this.openSnackBar('O baralho deve ter entre 24 e 60 cartas!', 'ok');
    }
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  private isValid(currentDeck: Deck | null): boolean {
    return currentDeck
      ? currentDeck.cards.length >= 24 && currentDeck.cards.length <= 60
      : false;
  }
}
