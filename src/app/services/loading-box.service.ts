import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingBoxService {
  private loader$: BehaviorSubject<boolean>;
  public readonly isLoading$: Observable<boolean>;
  constructor() {
    this.loader$ = new BehaviorSubject(false);
    this.isLoading$ = this.loader$.asObservable();
  }

  start(): void {
    this.loader$.next(true);
  }

  end(): void {
    this.loader$.next(false);
  }
}
