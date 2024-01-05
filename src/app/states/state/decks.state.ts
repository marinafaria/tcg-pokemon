import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DecksAction } from './decks.actions';
import { Deck } from 'src/app/models/deck.model';
import { CardInfo } from 'src/app/models/card-info.model';
import { unfreezeObject } from 'src/app/helpers/utils';

export class DecksStateModel {
  public deck!: Deck[];
}

const defaults = {
  deck: [],
};

@State<DecksStateModel>({
  name: 'decks',
  defaults,
})
@Injectable()
export class DecksState {
  findDeckById(id: number, decks: Deck[]): Deck | null {
    let found = decks.find((deck) => deck.id === id);
    if (found) {
      return found;
    }
    return null;
  }

  @Selector()
  static getDeckSize({ deck }: DecksStateModel): number {
    return deck.length;
  }
}
