import { Component, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "bl-register-agreement",
	templateUrl: "./register-agreement.component.html",
	styleUrls: ["./register-agreement.component.scss"],
})
export class RegisterAgreementComponent {
	@Output() confirmed: EventEmitter<boolean> = new EventEmitter();
	@Output() dismissed: EventEmitter<boolean> = new EventEmitter();

	public userAgreement: boolean;

	public onUserAgreement(): void {
		this.userAgreement = !this.userAgreement;
		if (this.userAgreement) {
			this.confirmed.emit(true);
		} else {
			this.dismissed.emit(true);
		}
	}
}
