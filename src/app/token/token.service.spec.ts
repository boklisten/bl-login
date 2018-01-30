import {TestBed, inject} from '@angular/core/testing';

import {TokenService} from './token.service';
import {LocalStorageService} from "angular-2-local-storage";

describe('TokenService', () => {
	let service: TokenService;
	beforeEach(() => {
		const fakeLocalStorage = {};
		service = new TokenService(fakeLocalStorage as LocalStorageService);
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
			
		const tokenService = new TokenService(fakeLocalStorageService as LocalStorageService);
		
		it('should throw error if accessToken could not be stored', () => {
			expect(() => {
				tokenService.store('aValue', 'refreshToken');
			}).toThrowError('could not store accessToken');
		});
		
		it('should throw error if refreshToken could not be stored', () => {
			expect(() => {
				tokenService.store('accessTokenVal', 'rToken');
			}).toThrowError('could not store refreshToken');
		});
		
		it('should return true if both refreshToken and accessToken is stored', () => {
			expect(tokenService.store('accessTokenVal', 'refreshTokenVal'))
				.toBeTruthy();
		});
		
		it('should use cookies if localStorage is not supported', () => {
			const spy = spyOn(fakeLocalStorageService, 'isSupported')
				.and.returnValue(false);
			
			
			
			expect(tokenService.store('accessTokenVal', 'refreshTokenVal'))
				.toBeTruthy();
			
		});
	});
	
});
