import { CardInfo } from 'src/app/models/card-info.model';

export namespace DeckAction {
  export class AddCard {
    static readonly type = '[Current deck] Add a card in a deck';
    constructor(public card: CardInfo) {}
  }

  export class RemoveCard {
    static readonly type = '[Current deck] Remove a card in a deck';
    constructor(public card: CardInfo) {}
  }

  export class Create {
    static readonly type = '[Current deck] Create a new deck';
    constructor(public lastId: number, public name?: string) {}
  }
}
