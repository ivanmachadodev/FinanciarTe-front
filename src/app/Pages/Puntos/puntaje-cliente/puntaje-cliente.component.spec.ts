import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntajeClienteComponent } from './puntaje-cliente.component';

describe('PuntajeClienteComponent', () => {
  let component: PuntajeClienteComponent;
  let fixture: ComponentFixture<PuntajeClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntajeClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntajeClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
