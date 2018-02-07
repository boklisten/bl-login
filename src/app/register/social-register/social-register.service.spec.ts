import { TestBed, inject } from '@angular/core/testing';

import { SocialRegisterService } from './social-register.service';

describe('SocialRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialRegisterService]
    });
  });

  it('should be created', inject([SocialRegisterService], (service: SocialRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
