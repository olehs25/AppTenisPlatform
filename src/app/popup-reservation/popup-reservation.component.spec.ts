import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupReservationComponent } from './popup-reservation.component';

describe('PopupReservationComponent', () => {
  let component: PopupReservationComponent;
  let fixture: ComponentFixture<PopupReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupReservationComponent]
    });
    fixture = TestBed.createComponent(PopupReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
