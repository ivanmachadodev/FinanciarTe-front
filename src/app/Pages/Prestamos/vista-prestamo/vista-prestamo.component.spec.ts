import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPrestamoComponent } from './vista-prestamo.component';

describe('VistaPrestamoComponent', () => {
  let component: VistaPrestamoComponent;
  let fixture: ComponentFixture<VistaPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaPrestamoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
