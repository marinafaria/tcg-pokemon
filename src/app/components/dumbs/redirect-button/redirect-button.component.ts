import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './redirect-button.component.html',
  styleUrl: './redirect-button.component.scss',
})
export class RedirectButtonComponent {
  constructor(private router: Router) {}

  @Input() iconName!: string;
  @Input() description!: string;
  @Input() url!: string;
  @Output() emitter = new EventEmitter<any>();

  goTo() {
    this.router.navigateByUrl(this.url);
    this.emitter.emit();
  }
}
