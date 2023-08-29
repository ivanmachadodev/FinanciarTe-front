import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCuotaComponent } from './registro-cuota.component';

describe('RegistroCuotaComponent', () => {
  let component: RegistroCuotaComponent;
  let fixture: ComponentFixture<RegistroCuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCuotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
