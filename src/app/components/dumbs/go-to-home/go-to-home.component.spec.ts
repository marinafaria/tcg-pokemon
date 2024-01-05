import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToHomeComponent } from './go-to-home.component';

describe('GoToHomeComponent', () => {
  let component: GoToHomeComponent;
  let fixture: ComponentFixture<GoToHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoToHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoToHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
