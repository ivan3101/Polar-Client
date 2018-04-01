import { TestBed, inject } from '@angular/core/testing';

import { ClientAuthService } from './client-auth.service';

describe('ClientAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientAuthService]
    });
  });

  it('should be created', inject([ClientAuthService], (service: ClientAuthService) => {
    expect(service).toBeTruthy();
  }));
});
