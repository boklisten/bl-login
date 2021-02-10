import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthEmailValidationComponent} from './auth-email-validation.component';
import {Component, Injectable, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {EmailValidationService, TokenService} from "@boklisten/bl-connect";

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
	@Input() spin: any;
	@Input() size: any;
}

@Injectable()
class RouterStubService {}

@Injectable()
class TokenStubService {
}

@Injectable()
class ActivatedRouteStubService {
	snapshot = {
		paramMap: {
			get: (id: any) => {
				return '';
			}
		}
	};
}

@Injectable()
class EmailValidationStubService {
	validateConfirmationLink(id: string) {
		return new Promise((resolve, reject) => {

		});
	}
}



describe('AuthEmailValidationComponent', () => {
	let component: AuthEmailValidationComponent;
	let fixture: ComponentFixture<AuthEmailValidationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AuthEmailValidationComponent,
				FaIconStubComponent
			],
			providers: [
				{provide: Router, useClass: RouterStubService},
				{provide: ActivatedRoute, useClass: ActivatedRouteStubService},
				{provide: TokenService, useClass: TokenStubService},
				{provide: EmailValidationService, useClass: EmailValidationStubService}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthEmailValidationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
