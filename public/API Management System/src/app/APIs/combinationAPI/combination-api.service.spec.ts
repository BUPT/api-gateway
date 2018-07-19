import { TestBed, inject } from '@angular/core/testing';

import { CombinationApiService } from './combination-api.service';

describe('CombinationApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CombinationApiService]
    });
  });

  it('should be created', inject([CombinationApiService], (service: CombinationApiService) => {
    expect(service).toBeTruthy();
  }));
});
