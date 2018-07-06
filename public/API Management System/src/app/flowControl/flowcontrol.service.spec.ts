import { TestBed, inject } from '@angular/core/testing';

import { FlowcontrolService } from './flowcontrol.service';

describe('FlowcontrolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlowcontrolService]
    });
  });

  it('should be created', inject([FlowcontrolService], (service: FlowcontrolService) => {
    expect(service).toBeTruthy();
  }));
});
