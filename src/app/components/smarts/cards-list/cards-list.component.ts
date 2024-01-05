import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardInfo } from 'src/app/models/card-info.model';
import { CardComponent } from '../../dumbs/card/card.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { DeckAction } from 'src/app/states/state/deck.actions';
import { DecksState } from 'src/app/states/state/decks.state';
import { DeckState } from 'src/app/states/state/deck.state';
import { isEmpty } from 'src/app/helpers/utils';
import { LoadingBoxService } from 'src/app/services/loading-box.service';
import { CardsService } from 'src/app/services/cards.service';
import { Deck } from 'src/app/models/deck.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [MatPaginatorModule, CardComponent, CommonModule],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss',
})
export class CardsListComponent implements OnChanges {
  lowLimit: number = 0;
  highLimit: number = 8;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() hasPaginator: boolean = false;
  @Input() list!: CardInfo[];
  @Input() emptyListMessage: string = 'Campo vazio!';
  @Input() displayAddButton: boolean = true;
  @Input() displayRemoveButton: boolean = true;
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store,
    private loadingBoxService: LoadingBoxService,
    private cardService: CardsService,
    private _snackBar: MatSnackBar
  ) {
    this.isLoading$ = this.loadingBoxService.isLoading$;
  }

  ngOnChanges(): void {
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

  addCard(card: CardInfo) {
    if (this.isValid(card)) {
      this.store.dispatch(new DeckAction.AddCard(card));
    } else {
      this.openSnackBar(
        'Carta não adicionada: é permitido apenas 4 cartas com o mesmo nome!',
        'ok'
      );
    }
  }

  removeCard(card: CardInfo) {
    this.store.dispatch(new DeckAction.RemoveCard(card));
  }

  private isValid(card: CardInfo): boolean {
    return this.cardService.sameCardNameLesserThanFour(
      card,
      this.store.selectSnapshot(DeckState.getDeck) as Deck
    );
  }
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  private getPreviousPage(event: PageEvent): number {
    return event.previousPageIndex ? event.previousPageIndex : 0;
  }
}
