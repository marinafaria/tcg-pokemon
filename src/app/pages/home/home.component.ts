import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Deck } from 'src/app/models/deck.model';
import { DeckAction } from 'src/app/states/state/deck.actions';
import { DecksAction } from 'src/app/states/state/decks.actions';
import { DecksState } from 'src/app/states/state/decks.state';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  decks$: Observable<Deck[]>;

  constructor(private store: Store, private router: Router) {
    this.decks$ = this.store.select(DecksState.getAll);
  }

  edit(deck: Deck) {
    this.store.dispatch(new DeckAction.Set(deck));
    this.router.navigateByUrl('/new');
  }

  remove(deck: Deck): void {
    this.store.dispatch(new DecksAction.Remove(deck));
  }

  create() {
    this.store.dispatch(
      new DeckAction.Create(
        this.store.selectSnapshot(DecksState.getDecksLastIndex)
      )
    );
  }
}
