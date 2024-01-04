import { CardInfo } from 'src/app/models/card-info.model';

export namespace DecksAction {
  export class AddCard {
    static readonly type = '[Decks] Add a card in a deck';
    constructor(public card: CardInfo, public id: number) {}
  }

  export class GetAll {
    static readonly type = '[Decks] Get all decks';
  }

  export class ChangeName {
    static readonly type = '[Decks] Change the name of the deck';
    constructor(public payload: string) {}
  }
}
