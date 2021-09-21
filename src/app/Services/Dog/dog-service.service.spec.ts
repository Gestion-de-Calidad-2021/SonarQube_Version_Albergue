import { TestBed } from '@angular/core/testing';

import { DogService } from './dog-service.service';

describe('DogServiceService', () => {
  let service: DogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
