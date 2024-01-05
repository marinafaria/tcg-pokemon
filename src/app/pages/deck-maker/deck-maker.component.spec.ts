import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckMakerComponent } from './deck-maker.component';

describe('CreateDeckComponent', () => {
  let component: DeckMakerComponent;
  let fixture: ComponentFixture<DeckMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckMakerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
