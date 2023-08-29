import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPuntajeComponent } from './listado-puntaje.component';

describe('ListadoPuntajeComponent', () => {
  let component: ListadoPuntajeComponent;
  let fixture: ComponentFixture<ListadoPuntajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPuntajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPuntajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
