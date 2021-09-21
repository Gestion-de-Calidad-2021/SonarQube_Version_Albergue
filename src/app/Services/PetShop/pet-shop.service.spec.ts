import { TestBed } from '@angular/core/testing';

import { PetShopService } from './pet-shop.service';

describe('PetShopService', () => {
  let service: PetShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
