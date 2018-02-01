import {TestBed, inject} from '@angular/core/testing';

import {LocalRegisterService} from './local-register.service';

describe('LocalRegisterService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LocalRegisterService]
		});
	});
	
	it('should be created', inject([LocalRegisterService], (service: LocalRegisterService) => {
		expect(service).toBeTruthy();
	}));
});
