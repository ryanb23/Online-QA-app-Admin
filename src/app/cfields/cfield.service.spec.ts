import { TestBed, inject } from '@angular/core/testing';

import { CfieldService } from './cfield.service';

describe('CfieldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CfieldService]
    });
  });

  it('should ...', inject([CfieldService], (service: CfieldService) => {
    expect(service).toBeTruthy();
  }));
});
