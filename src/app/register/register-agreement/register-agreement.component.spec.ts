import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { RegisterAgreementComponent } from "./register-agreement.component";

describe("RegisterAgreementComponent", () => {
	let component: RegisterAgreementComponent;
	let fixture: ComponentFixture<RegisterAgreementComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [RegisterAgreementComponent],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(RegisterAgreementComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
