import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionEscuelaComponent } from './inscripcion-escuela.component';

describe('InscripcionEscuelaComponent', () => {
  let component: InscripcionEscuelaComponent;
  let fixture: ComponentFixture<InscripcionEscuelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscripcionEscuelaComponent]
    });
    fixture = TestBed.createComponent(InscripcionEscuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
