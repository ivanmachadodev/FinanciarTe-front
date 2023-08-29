import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCuotaComponent } from './modificar-cuota.component';

describe('ModificarCuotaComponent', () => {
  let component: ModificarCuotaComponent;
  let fixture: ComponentFixture<ModificarCuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarCuotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
