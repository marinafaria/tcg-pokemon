import { CardInfo } from './card-info.model';

export interface Deck {
  name: string;
  cards: CardInfo[];
  id: number;
}
