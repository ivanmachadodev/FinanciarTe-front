import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteHistoricoPagosComponent } from './reporte-historico-pagos.component';

describe('ReporteHistoricoPagosComponent', () => {
  let component: ReporteHistoricoPagosComponent;
  let fixture: ComponentFixture<ReporteHistoricoPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteHistoricoPagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteHistoricoPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
