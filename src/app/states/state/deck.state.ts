import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DeckAction } from './deck.actions';
import { Deck } from 'src/app/models/deck.model';
import { CardInfo } from 'src/app/models/card-info.model';
import { unfreezeObject } from 'src/app/helpers/utils';

export class DeckStateModel {
  public deck!: Deck | null;
}

const defaults = {
  deck: null,
};

@State<DeckStateModel>({
  name: 'deck',
  defaults,
})
@Injectable()
export class DeckState {
  @Action(DeckAction.AddCard)
  addCard(ctx: StateContext<DeckStateModel>, action: { card: CardInfo }) {
    const { card } = action;
    const state = ctx.getState();
    let editingDeck = unfreezeObject(state.deck);
    editingDeck.cards.push(card);
    ctx.patchState({ deck: editingDeck });
  }

  @Action(DeckAction.RemoveCard)
  removeCard(
    ctx: StateContext<DeckStateModel>,
    action: { card: CardInfo; id: number }
  ) {
    const { card } = action;
    const state = ctx.getState();
    if (state.deck) {
      var listWithoutCard = state.deck.cards.filter(
        (cardDeck) => cardDeck.id !== card.id
      );
      let editingDeck = unfreezeObject(state.deck);
      editingDeck.cards = listWithoutCard;
      ctx.setState({ deck: editingDeck });
    }
  }

  @Action(DeckAction.Create)
  createNewDeck(
    ctx: StateContext<DeckStateModel>,
    action: { lastId: number; name?: string }
  ) {
    const { lastId, name } = action;
    let emptyDeck = {
      name: name ? name : 'Meu novo baralho',
      cards: [],
      id: lastId + 1,
      types: [],
    };
    ctx.setState({ deck: emptyDeck });
    return;
  }

  @Action(DeckAction.Set)
  set(ctx: StateContext<DeckStateModel>, action: { deck: Deck }) {
    const { deck } = action;
    ctx.setState({ deck: deck });
  }

  @Action(DeckAction.SetName)
  setName(ctx: StateContext<DeckStateModel>, action: { name: string }) {
    const { name } = action;
    const state = ctx.getState();
    let editingDeck = unfreezeObject(state.deck);
    editingDeck.name = name;
    ctx.setState({ deck: editingDeck });
  }

  @Selector()
  static getDeck({ deck }: DeckStateModel) {
    return deck;
  }
}
