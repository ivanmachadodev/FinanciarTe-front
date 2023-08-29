import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionClienteComponent } from './modificacion-cliente.component';

describe('ModificacionClienteComponent', () => {
  let component: ModificacionClienteComponent;
  let fixture: ComponentFixture<ModificacionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificacionClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificacionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
