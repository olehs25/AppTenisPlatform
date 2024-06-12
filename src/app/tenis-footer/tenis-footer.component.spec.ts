import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenisFooterComponent } from './tenis-footer.component';

describe('TenisFooterComponent', () => {
  let component: TenisFooterComponent;
  let fixture: ComponentFixture<TenisFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenisFooterComponent]
    });
    fixture = TestBed.createComponent(TenisFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
