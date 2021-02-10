import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { LocalRegisterComponent } from "./local-register.component";

describe("LocalRegisterComponent", () => {
	let component: LocalRegisterComponent;
	let fixture: ComponentFixture<LocalRegisterComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [LocalRegisterComponent],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(LocalRegisterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
