import {TestBed, inject, ComponentFixture} from '@angular/core/testing';

import {LocalLoginService} from './local-login.service';
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {LoginService, TokenService} from "@wizardcoder/bl-connect";


describe('LocalLoginService', () => {
	let service: LocalLoginService;
	beforeEach(() => {

		const fakeLoginService = {};
		const fakeTokenService = {};

		service = new LocalLoginService(fakeLoginService as LoginService);

	});

	describe('#login', () => {
		it('should reject with error when email is empty or undefined', (done: DoneFn) => {
			service.login("", "aPassword").then((ret) => {
				expect(ret).toBeFalsy();
			}).catch((err) => {
				expect(err).toEqual(new Error('email is empty or undefined'));
				done();
			});
		});

		it('should throw error when password is empty or undefined', (done: DoneFn) => {
			return service.login('albert@aaberg.com', null)
				.catch((err) => {
					expect(err).toEqual(new Error('password is empty or undefined'));
					done();
				});
		});

	});
});
