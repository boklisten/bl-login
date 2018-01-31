import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {HttpClientModule} from "@angular/common/http";
import {LocalLoginService} from "./local-login/local-login.service";
import {LocalStorageModule} from "angular-2-local-storage";
import {TokenService} from "../token/token.service";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {StorageService} from "../storage/storage.service";
import {CookieModule} from "ngx-cookie";

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
					}),
					JwtModule.forRoot({
						config: {
							whitelistedDomains: [],
							tokenGetter: () => {
								return '';
							}
						}
					}),
					CookieModule.forChild()
				],
				declarations: [LoginComponent],
				providers: [LocalLoginService, TokenService, StorageService]
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
