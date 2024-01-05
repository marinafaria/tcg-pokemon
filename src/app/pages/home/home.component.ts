import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Deck } from 'src/app/models/deck.model';
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

  constructor(private store: Store) {
    this.decks$ = this.store.select(DecksState.getAll);
  }

  edit() {}

  remove(deck: Deck): void {
    this.store.dispatch(new DecksAction.Remove(deck));
  }
}
