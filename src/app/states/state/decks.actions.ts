import { CardInfo } from 'src/app/models/card-info.model';
import { Deck } from 'src/app/models/deck.model';

export namespace DecksAction {
  export class Add {
    static readonly type = '[Decks] Add a card in a deck';
    constructor(public deck: Deck | null) {}
  }
  export class GetAll {
    static readonly type = '[Decks] Get all decks';
  }

  export class ChangeName {
    static readonly type = '[Decks] Change the name of the deck';
    constructor(public payload: string) {}
  }
}
