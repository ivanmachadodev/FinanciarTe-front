import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaprestamoComponent } from './altaprestamo.component';

describe('AltaprestamoComponent', () => {
  let component: AltaprestamoComponent;
  let fixture: ComponentFixture<AltaprestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaprestamoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaprestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
