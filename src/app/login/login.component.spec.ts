import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {HttpClientModule} from "@angular/common/http";
import {LocalLoginService} from "./local-login/local-login.service";
import {LocalStorageModule} from "angular-2-local-storage";

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
				imports: [
					HttpClientModule,
					LocalStorageModule.withConfig({
						prefix: 'bl',
						storageType: "localStorage"
					})
				],
				declarations: [LoginComponent],
				providers: [LocalLoginService]
			})
			.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
