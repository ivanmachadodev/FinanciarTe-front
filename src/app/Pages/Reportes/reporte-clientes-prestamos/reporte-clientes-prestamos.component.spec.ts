import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteClientesPrestamosComponent } from './reporte-clientes-prestamos.component';

describe('ReporteClientesPrestamosComponent', () => {
  let component: ReporteClientesPrestamosComponent;
  let fixture: ComponentFixture<ReporteClientesPrestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteClientesPrestamosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteClientesPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
