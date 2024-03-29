import { CardInfo } from 'src/app/models/card-info.model';
import { Deck } from 'src/app/models/deck.model';

export namespace DecksAction {
  export class Add {
    static readonly type = '[Decks] Add a deck';
    constructor(public deck: Deck | null) {}
  }

  export class Remove {
    static readonly type = '[Decks] Remove a deck';
    constructor(public deck: Deck) {}
  }

  export class Edit {
    static readonly type = '[Decks] Edit a deck';
    constructor(public deck: Deck | null) {}
  }

  export class ChangeName {
    static readonly type = '[Decks] Change the name of the deck';
    constructor(public payload: string) {}
  }
}
