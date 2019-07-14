import { TestBed } from '@angular/core/testing';

import { PhoneNumberService } from './phone-number.service';

describe('PhoneNumberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhoneNumberService = TestBed.get(PhoneNumberService);
    expect(service).toBeTruthy();
  });
});
