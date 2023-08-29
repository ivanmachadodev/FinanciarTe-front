import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCuotasComponent } from './reporte-cuotas.component';

describe('ReporteCuotasComponent', () => {
  let component: ReporteCuotasComponent;
  let fixture: ComponentFixture<ReporteCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCuotasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
