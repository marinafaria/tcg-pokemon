import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, debounceTime, filter, takeWhile } from 'rxjs';
import { isEmpty } from 'src/app/helpers/utils';
import { CardInfo } from 'src/app/models/card-info.model';
import { Deck } from 'src/app/models/deck.model';
import { Mode } from 'src/app/models/mode.enum';
import { CardsService } from 'src/app/services/cards.service';
import { LoadingBoxService } from 'src/app/services/loading-box.service';
import { DeckAction } from 'src/app/states/state/deck.actions';
import { DeckState } from 'src/app/states/state/deck.state';
import { DecksAction } from 'src/app/states/state/decks.actions';

@Component({
  selector: 'app-deck-maker',
  standalone: false,
  templateUrl: './deck-maker.component.html',
  styleUrl: './deck-maker.component.scss',
})
export class DeckMakerComponent implements OnInit, OnDestroy {
  searchedCardList: CardInfo[] = [];
  deckPlaceholder = [];
  panelOpenState = false;
  currentDeck$!: Observable<Deck | null>;
  mode!: Mode;
  typesNum: number = 0;
  shouldSubscribe: boolean;
  counterSubtypes: any;

  constructor(
    private cardsService: CardsService,
    private store: Store,
    private _snackBar: MatSnackBar,
    private router: Router,
    private loadingBoxService: LoadingBoxService
  ) {
    this.currentDeck$ = this.store.select(DeckState.getDeck);
    this.shouldSubscribe = true;
    this.counterSubtypes = this.defaultSubtypes;
  }

  get defaultSubtypes() {
    return {
      Pokémon: 0,
      Trainer: 0,
    };
  }

  ngOnInit(): void {
    let initialDeck = this.store.selectSnapshot(DeckState.getDeck);
    if (isEmpty(initialDeck?.cards)) {
      this.mode = Mode.Create;
    } else {
      this.mode = Mode.Edit;
    }

    this.deckSubscription();
  }

  deckSubscription(): void {
    this.currentDeck$
      .pipe(takeWhile(() => this.shouldSubscribe))
      .subscribe((deck) => {
        this.getUniqueTypesNumber(deck as Deck);
        this.getPokemonsNum(deck as Deck);
      });
  }

  private getUniqueTypesNumber(deck: Deck): void {
    if (!isEmpty(deck?.cards)) {
      this.typesNum = this.cardsService.getUniqueTypesNum(deck as Deck);
    } else {
      this.typesNum = 0;
    }
  }

  private getPokemonsNum(deck: Deck) {
    this.resetCardsNum();
    deck.cards.forEach((card) => {
      const type = card.supertype;
      this.counterSubtypes[type] = (this.counterSubtypes[type] || 0) + 1;
    });
  }

  private resetCardsNum(): void {
    this.counterSubtypes = this.defaultSubtypes;
  }

  onSubmit() {
    let currentDeck = this.store.selectSnapshot(DeckState.getDeck);
    let message = '';
    if (this.isValid(currentDeck)) {
      if (this.mode === Mode.Create) {
        this.store.dispatch(new DecksAction.Add(currentDeck));
        message = 'Baralho criado com sucesso';
      }
      if (this.mode === Mode.Edit) {
        this.store.dispatch(new DecksAction.Edit(currentDeck));
        message = 'Baralho editado com sucesso';
      }
      this.router.navigateByUrl('/');
      this.openSnackBar(message, 'ok');
    } else {
      this.openSnackBar('O baralho deve ter entre 24 e 60 cartas!', 'ok');
    }
  }

  // TODO: fazer com que debounce e filter sejam efetivos
  search($event: any) {
    let value = $event?.target?.value;
    this.loadingBoxService.start();
    this.searchedCardList = [];
    this.cardsService
      .searchCards(value)
      .pipe(
        // debounceTime(2000),
        // filter((value) => String(value).length >= 2)
        takeWhile(() => this.shouldSubscribe)
      )
      .subscribe((list) => {
        this.loadingBoxService.end();
        this.searchedCardList = list;
      });
  }

  editDeckName($event: any) {
    let value = $event?.target?.value;
    this.store.dispatch(new DeckAction.SetName(value));
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  private isValid(currentDeck: Deck | null): boolean {
    return currentDeck
      ? currentDeck.cards.length >= 24 && currentDeck.cards.length <= 60
      : false;
  }

  ngOnDestroy(): void {
    this.shouldSubscribe = false;
  }
}
