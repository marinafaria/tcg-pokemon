import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Deck } from 'src/app/models/deck.model';
import { DecksState } from 'src/app/states/state/decks.state';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  decks: Deck[];

  constructor(private store: Store) {
    this.decks = this.store.selectSnapshot(DecksState.getAll);
  }

  onClick() {}
}
