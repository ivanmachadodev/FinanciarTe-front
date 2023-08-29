import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPrestamoComponent } from './modificar-prestamo.component';

describe('ModificarPrestamoComponent', () => {
  let component: ModificarPrestamoComponent;
  let fixture: ComponentFixture<ModificarPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPrestamoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
