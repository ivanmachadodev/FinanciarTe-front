import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTransaccionComponent } from './modificar-transaccion.component';

describe('ModificarTransaccionComponent', () => {
  let component: ModificarTransaccionComponent;
  let fixture: ComponentFixture<ModificarTransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTransaccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
