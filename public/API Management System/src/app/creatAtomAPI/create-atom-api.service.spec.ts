import { TestBed, inject } from '@angular/core/testing';

import { CreateAtomApiService } from './create-atom-api.service';

describe('CreateAtomApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateAtomApiService]
    });
  });

  it('should be created', inject([CreateAtomApiService], (service: CreateAtomApiService) => {
    expect(service).toBeTruthy();
  }));
});
