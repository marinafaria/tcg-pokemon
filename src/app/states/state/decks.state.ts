import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DecksAction } from './decks.actions';
import { Deck } from 'src/app/models/deck.model';
import { CardInfo } from 'src/app/models/card-info.model';
import { unfreezeObject } from 'src/app/helpers/utils';

export class DecksStateModel {
  public decks!: Deck[];
}

const defaults = {
  decks: [],
};

@State<DecksStateModel>({
  name: 'decks',
  defaults,
})
@Injectable()
export class DecksState {
  @Action(DecksAction.Add)
  addCard(ctx: StateContext<DecksStateModel>, action: { deck: Deck }) {
    const { deck } = action;
    const state = ctx.getState();
    // let newDeckConfig = unfreezeObject(state.decks);
    // newDeckConfig.cards.push(deck);
    ctx.setState({ decks: [...state.decks, deck] });
    console.log(ctx.getState());
  }

  findDeckById(id: number, decks: Deck[]): Deck | null {
    let found = decks.find((deck) => deck.id === id);
    if (found) {
      return found;
    }
    return null;
  }

  @Selector()
  static getDeckSize({ decks }: DecksStateModel): number {
    return decks.length;
  }
}
