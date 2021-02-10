import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { AuthPasswordResetComponent } from "./auth-password-reset.component";
import { Component, Injectable, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PasswordResetService } from "@boklisten/bl-connect";

@Component({ selector: "fa-icon", template: "" })
class FaIconStubComponent {
	@Input() icon: any;
	@Input() spin: any;
	@Input() size: any;
}

@Component({ selector: "ngb-alert", template: "" })
class NgbAlertStubComponent {
	@Input() type: any;
}

@Injectable()
class RouterStubService {}

@Injectable()
class ActivatedRouteStubService {
	snapshot = {
		paramMap: {
			get: (id: any) => {
				return "";
			},
		},
	};
}

@Injectable()
class TokenStubService {}

@Injectable()
class PasswordResetStubService {}

describe("AuthPasswordResetComponent", () => {
	let component: AuthPasswordResetComponent;
	let fixture: ComponentFixture<AuthPasswordResetComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				imports: [FormsModule],
				declarations: [
					AuthPasswordResetComponent,
					FaIconStubComponent,
					NgbAlertStubComponent,
				],
				providers: [
					{
						provide: ActivatedRoute,
						useClass: ActivatedRouteStubService,
					},
					{ provide: Router, useClass: RouterStubService },
					{
						provide: PasswordResetService,
						useClass: PasswordResetStubService,
					},
				],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthPasswordResetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
