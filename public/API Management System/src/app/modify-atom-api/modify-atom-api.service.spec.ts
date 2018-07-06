import { TestBed, inject } from '@angular/core/testing';

import { ModifyAtomApiService } from './modify-atom-api.service';

describe('ModifyAtomApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifyAtomApiService]
    });
  });

  it('should be created', inject([ModifyAtomApiService], (service: ModifyAtomApiService) => {
    expect(service).toBeTruthy();
  }));
});
