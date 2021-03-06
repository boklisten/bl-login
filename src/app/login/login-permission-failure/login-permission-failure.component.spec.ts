import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { LoginPermissionFailureComponent } from "./login-permission-failure.component";

describe("LoginPermissionFailureComponent", () => {
	let component: LoginPermissionFailureComponent;
	let fixture: ComponentFixture<LoginPermissionFailureComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [LoginPermissionFailureComponent],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginPermissionFailureComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
