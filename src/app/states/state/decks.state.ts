import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DecksAction } from './decks.actions';
import { Deck } from 'src/app/models/deck.model';
import { CardInfo } from 'src/app/models/card-info.model';
import { unfreezeObject } from 'src/app/helpers/utils';

export class DecksStateModel {
  public deck!: Deck[];
  public current!: Deck | null;
}

const defaults = {
  deck: [],
  current: null,
};

@State<DecksStateModel>({
  name: 'decks',
  defaults,
})
@Injectable()
export class DecksState {
  @Action(DecksAction.AddCard)
  addCard(
    ctx: StateContext<DecksStateModel>,
    action: { card: CardInfo; id: number }
  ) {
    const { card, id } = action;
    const state = ctx.getState();
    let editingDeck = unfreezeObject(this.findDeckById(id, state.deck));
    editingDeck.cards.push(card);
    console.log([editingDeck, ...state.deck]);
    ctx.setState({ deck: [...state.deck, editingDeck], current: editingDeck });
  }

  findDeckById(id: number, decks: Deck[]): Deck {
    let found = decks.find((deck) => deck.id === id);
    if (found) {
      return found;
    } else {
      return this.createNewDeck(decks.length);
    }
  }

  createNewDeck(lastId: number, name: string = 'Meu novo baralho'): Deck {
    return {
      name: name,
      cards: [],
      id: lastId + 1,
    };
  }

  @Selector()
  static getCurrent({ current }: DecksStateModel) {
    return current;
  }
}
