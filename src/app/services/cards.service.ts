import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardInfo } from '../models/card-info.model';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient) {}

  searchedCards$ = new BehaviorSubject<CardInfo[]>([]);

  searchCards(name?: string): Observable<any> {
    return this.http.get(`${environment.baseApiUrl}/cards?q=name:${name}`).pipe(
      map(this.handleCardsResults),
      tap((list) => {
        this.searchedCards$.next(list);
      })
    );
  }

  handleCardsResults(result: any): CardInfo[] {
    return result.data;
  }

  getUniqueTypesNum(deck: Deck) {
    if (deck?.cards) {
      let typesList: any = [];
      deck?.cards.forEach((element: CardInfo) => {
        typesList.push(element.types);
      });
      return [...new Set([].concat(...typesList))].length;
    }
    return 0;
  }

  sameCardNameLesserThanFour(card: CardInfo, deck: Deck) {
    return deck.cards.filter((item) => item.name === card.name).length < 4;
  }
}
