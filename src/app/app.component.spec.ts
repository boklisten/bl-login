import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {LoginModule} from "./login/login.module";
import {HttpClientModule} from "@angular/common/http";
import {LocalStorageModule} from "angular-2-local-storage";

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent
			],
			imports: [
				LoginModule,
				HttpClientModule,
				LocalStorageModule
			]
		}).compileComponents();
	}));
	
	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
