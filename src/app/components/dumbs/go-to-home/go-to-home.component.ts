import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-to-home',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './go-to-home.component.html',
  styleUrl: './go-to-home.component.scss',
})
export class GoToHomeComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigateByUrl('/');
  }
}
