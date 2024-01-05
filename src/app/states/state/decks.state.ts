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
  add(ctx: StateContext<DecksStateModel>, action: { deck: Deck }) {
    const { deck } = action;
    const state = ctx.getState();
    ctx.setState({ decks: [...state.decks, deck] });
    console.log(ctx.getState());
  }

  @Action(DecksAction.Remove)
  remove(ctx: StateContext<DecksStateModel>, action: { deck: Deck }) {
    const { deck } = action;
    const state = ctx.getState();
    let newDeck = state.decks.filter((eachDeck) => eachDeck.id != deck.id);
    ctx.setState({ decks: newDeck });
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

  @Selector()
  static getDecksLastIndex({ decks }: DecksStateModel): number {
    return decks[decks.length - 1].id;
  }

  @Selector()
  static getAll({ decks }: DecksStateModel): Deck[] {
    return decks;
  }
}
