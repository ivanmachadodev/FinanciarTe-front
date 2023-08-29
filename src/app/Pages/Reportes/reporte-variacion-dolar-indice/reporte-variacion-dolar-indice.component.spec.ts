import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVariacionDolarIndiceComponent } from './reporte-variacion-dolar-indice.component';

describe('ReporteVariacionDolarIndiceComponent', () => {
  let component: ReporteVariacionDolarIndiceComponent;
  let fixture: ComponentFixture<ReporteVariacionDolarIndiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteVariacionDolarIndiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteVariacionDolarIndiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
