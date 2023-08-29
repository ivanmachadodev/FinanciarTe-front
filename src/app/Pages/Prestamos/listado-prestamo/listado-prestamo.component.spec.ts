import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPrestamoComponent } from './listado-prestamo.component';

describe('ListadoPrestamoComponent', () => {
  let component: ListadoPrestamoComponent;
  let fixture: ComponentFixture<ListadoPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPrestamoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
