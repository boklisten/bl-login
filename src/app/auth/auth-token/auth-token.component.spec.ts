import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthTokenComponent} from './auth-token.component';
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "@wizardcoder/bl-connect";
import {AuthLoginService} from "../../login/auth-login.service";

@Injectable()
class RouterStubService {}

@Injectable()
class TokenStubService {
}

@Injectable()
class ActivatedRouteStubService {
	paramMap = new Subject();
}

@Injectable()
class AuthLoginStubService {

}

describe('AuthTokenComponent', () => {
	let component: AuthTokenComponent;
	let fixture: ComponentFixture<AuthTokenComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AuthTokenComponent
			],
			providers: [
				{provide: ActivatedRoute, useClass: ActivatedRouteStubService},
				{provide: Router, useClass: RouterStubService},
				{provide: TokenService, useClass: TokenStubService},
				{provide: AuthLoginService, useClass: AuthLoginStubService}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthTokenComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
