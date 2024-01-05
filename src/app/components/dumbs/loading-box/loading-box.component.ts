import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingBoxService } from 'src/app/services/loading-box.service';

@Component({
  selector: 'app-loading-box, [app-loading-box]',
  standalone: false,
  templateUrl: './loading-box.component.html',
  styleUrl: './loading-box.component.scss',
})
export class LoadingBoxComponent {
  @Input() loadingSize?: number = 100;
  isLoading$: Observable<boolean>;

  constructor(private loadingBoxService: LoadingBoxService) {
    this.isLoading$ = this.loadingBoxService.isLoading$;
  }
}
