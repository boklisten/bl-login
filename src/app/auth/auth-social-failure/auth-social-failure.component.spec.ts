import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthSocialFailureComponent} from './auth-social-failure.component';
import {Component, Injectable, Input} from "@angular/core";
import {Router} from "@angular/router";

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
	@Input() spin: any;
	@Input() size: any;
}

@Component({selector: 'ngb-alert', template: ''})
class NgbAlertStubComponent {
	@Input() type: any;
}

@Injectable()
class RouterStubService {}

describe('AuthSocialFailureComponent', () => {
	let component: AuthSocialFailureComponent;
	let fixture: ComponentFixture<AuthSocialFailureComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AuthSocialFailureComponent,
				FaIconStubComponent,
				NgbAlertStubComponent
			],
			providers: [
				{provide: Router, useClass: RouterStubService}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthSocialFailureComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
