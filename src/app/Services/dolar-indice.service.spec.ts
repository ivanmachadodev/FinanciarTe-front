import { TestBed } from '@angular/core/testing';

import { DolarIndiceService } from './dolar-indice.service';

describe('DolarIndiceService', () => {
  let service: DolarIndiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DolarIndiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
