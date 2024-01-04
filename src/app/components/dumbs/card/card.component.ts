import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardInfo } from 'src/app/models/card-info.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card!: CardInfo;
  @Input() displayAddButton!: boolean;
  @Input() displayRemoveButton!: boolean;
  @Output() addEvent = new EventEmitter<CardInfo>();
  @Output() removeEvent = new EventEmitter<CardInfo>();

  placeholder = '/assets/pokeball.jpg';

  add() {
    this.addEvent.emit(this.card);
  }

  remove() {
    this.removeEvent.emit(this.card);
  }
}
