import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {LoginModule} from "./login/login.module";
import {HttpClientModule} from "@angular/common/http";
import {Component, Injectable} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Router} from "@angular/router";

@Component({selector: 'router-outlet', template: ''})
class RouterStubComponent {}

@Injectable()
class RouterStubService {

}

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				RouterStubComponent
			],
			imports: [
				LoginModule,
				HttpClientModule
			],
			providers: [
				{provide: Router, useClass: RouterStubService}
			]
		}).compileComponents();
	}));

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
