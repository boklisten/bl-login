import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { UserAgreementModalComponent } from "./user-agreement-modal.component";

describe("UserAgreementModalComponent", () => {
	let component: UserAgreementModalComponent;
	let fixture: ComponentFixture<UserAgreementModalComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [UserAgreementModalComponent],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(UserAgreementModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
