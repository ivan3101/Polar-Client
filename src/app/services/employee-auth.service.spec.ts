import { TestBed, inject } from '@angular/core/testing';

import { EmployeeAuthService } from './employee-auth.service';

describe('EmployeeAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeAuthService]
    });
  });

  it('should be created', inject([EmployeeAuthService], (service: EmployeeAuthService) => {
    expect(service).toBeTruthy();
  }));
});
