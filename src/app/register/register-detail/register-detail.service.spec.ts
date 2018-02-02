import { TestBed, inject } from '@angular/core/testing';

import { RegisterDetailService } from './register-detail.service';

describe('RegisterDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterDetailService]
    });
  });

  it('should be created', inject([RegisterDetailService], (service: RegisterDetailService) => {
    expect(service).toBeTruthy();
  }));
});
