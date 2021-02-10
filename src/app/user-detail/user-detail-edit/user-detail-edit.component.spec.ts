import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { UserDetailEditComponent } from "./user-detail-edit.component";

describe("UserDetailEditComponent", () => {
	let component: UserDetailEditComponent;
	let fixture: ComponentFixture<UserDetailEditComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [UserDetailEditComponent],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(UserDetailEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
