import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTransaccionComponent } from './alta-transaccion.component';

describe('AltaTransaccionComponent', () => {
  let component: AltaTransaccionComponent;
  let fixture: ComponentFixture<AltaTransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaTransaccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
