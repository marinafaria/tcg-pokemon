import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { CardInfo } from 'src/app/models/card-info.model';
import { CardComponent } from '../../dumbs/card/card.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { DeckAction } from 'src/app/states/state/deck.actions';
import { DecksState } from 'src/app/states/state/decks.state';
import { DeckState } from 'src/app/states/state/deck.state';
import { isEmpty } from 'src/app/helpers/utils';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [MatPaginatorModule, CardComponent, CommonModule],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss',
})
export class CardsListComponent implements OnInit {
  lowLimit: number = 0;
  highLimit: number = 8;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() hasPaginator: boolean = false;
  @Input() list!: CardInfo[];
  @Input() emptyListMessage: string = 'Campo vazio!';
  @Input() displayAddButton: boolean = true;
  @Input() displayRemoveButton: boolean = true;

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (!this.hasPaginator) this.highLimit = this.listSize;
  }

  get listSize(): number {
    return this.list?.length;
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowLimit = event.pageIndex * event.pageSize;
    this.highLimit =
      event.pageIndex > this.getPreviousPage(event)
        ? this.highLimit + event.pageSize
        : this.highLimit - event.pageSize;
    return event;
  }

  private resetPagination() {
    this.paginator.firstPage();
    this.lowLimit = 0;
    this.highLimit = 8;
  }

  private getPreviousPage(event: PageEvent): number {
    return event.previousPageIndex ? event.previousPageIndex : 0;
  }

  addCard(card: CardInfo) {
    this.store.dispatch(new DeckAction.AddCard(card));
  }

  removeCard(card: CardInfo) {
    this.store.dispatch(new DeckAction.RemoveCard(card));
  }
}
