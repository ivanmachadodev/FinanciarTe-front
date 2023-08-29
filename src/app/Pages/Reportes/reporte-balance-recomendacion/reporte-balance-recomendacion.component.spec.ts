import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteBalanceRecomendacionComponent } from './reporte-balance-recomendacion.component';

describe('ReporteBalanceRecomendacionComponent', () => {
  let component: ReporteBalanceRecomendacionComponent;
  let fixture: ComponentFixture<ReporteBalanceRecomendacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteBalanceRecomendacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteBalanceRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
