import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { LocalLoginComponent } from "./local-login.component";

describe("LocalLoginComponent", () => {
	let component: LocalLoginComponent;
	let fixture: ComponentFixture<LocalLoginComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [LocalLoginComponent],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(LocalLoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
