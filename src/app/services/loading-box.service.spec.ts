import { TestBed } from '@angular/core/testing';

import { LoadingBoxService } from './loading-box.service';

describe('LoadingBoxService', () => {
  let service: LoadingBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
