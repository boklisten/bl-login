import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { HttpClientModule } from "@angular/common/http";
import { LocalLoginService } from "./local-login/local-login.service";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { CookieModule } from "ngx-cookie";
import { StorageService, TokenService } from "@boklisten/bl-connect";

describe("LoginComponent", () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				imports: [
					HttpClientModule,
					JwtModule.forRoot({
						config: {
							whitelistedDomains: [],
							tokenGetter: () => {
								return "";
							},
						},
					}),
					CookieModule.forChild(),
				],
				declarations: [LoginComponent],
				providers: [LocalLoginService, TokenService, StorageService],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should be created", () => {
		expect(component).toBeTruthy();
	});
});
