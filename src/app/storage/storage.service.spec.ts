import {TestBed, inject} from '@angular/core/testing';

import {StorageService} from './storage.service';
import {LocalStorageService} from "angular-2-local-storage";
import {CookieService, CookieOptionsProvider} from 'ngx-cookie';

describe('StorageService', () => {
	let service: StorageService;
	beforeEach(() => {
		const fakeLocalStorage = {};
		const fakeCookieService = {};
		service = new StorageService(fakeLocalStorage as LocalStorageService, fakeCookieService as CookieService);
	});
	
	describe('#validate', () => {
		it('should throw error if accessToken is empty or undefined', () => {
			expect(() => {
				service.validate('', 'someString');
			}).toThrowError('accessToken is empty or undefined');
		});
		
		it('should throw error if refreshToken is empty or undefined', () => {
			expect(() => {
				service.validate('someOtherString', '');
			}).toThrowError('refreshToken is empty or undefined');
		});
		
		it('should return true if they both are valid', () => {
			expect(service.validate('someString', 'someOtherString'))
				.toBeTruthy();
		});
	});
	
	describe('#store', () => {
		const fakeLocalStorageService = {
				set: (key, value) => {
					if (value === 'accessTokenVal' || value === 'refreshTokenVal') {
						return true;
					}
					return false;
				},
				isSupported: true,
			};
		const cookieService = new CookieService({} as CookieOptionsProvider);
		const tokenService = new StorageService(fakeLocalStorageService as LocalStorageService, cookieService);
		
		beforeEach(() => {
			spyOn(cookieService, 'put').and.returnValue(true);
			spyOn(cookieService, 'get').and.returnValue('cookieValue');
		});
		
		
		it('should return true if both refreshToken and accessToken is stored', () => {
			expect(tokenService.store('accessTokenVal', 'refreshTokenVal'))
				.toBeTruthy();
		});
		
		it('should use cookies if localStorage is not supported', () => {
			fakeLocalStorageService.isSupported = false;
			
			expect(tokenService.store('accessTokenVal', 'refreshTokenVal'))
				.toBeTruthy();
			
			expect(tokenService.getAccessToken()).toEqual('cookieValue');
			expect(tokenService.getRefreshToken()).toEqual('cookieValue');
			
		});
	});
	
});
