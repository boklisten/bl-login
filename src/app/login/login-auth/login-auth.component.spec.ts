import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { LoginAuthComponent } from "./login-auth.component";

describe("LoginAuthComponent", () => {
	let component: LoginAuthComponent;
	let fixture: ComponentFixture<LoginAuthComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [LoginAuthComponent],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginAuthComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
