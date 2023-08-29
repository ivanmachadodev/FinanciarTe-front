import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCuotaComponent } from './vista-cuota.component';

describe('VistaCuotaComponent', () => {
  let component: VistaCuotaComponent;
  let fixture: ComponentFixture<VistaCuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaCuotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
