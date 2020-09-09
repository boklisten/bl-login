import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "bl-register-agreement",
	templateUrl: "./register-agreement.component.html",
	styleUrls: ["./register-agreement.component.scss"]
})
export class RegisterAgreementComponent implements OnInit {
	@Output() confirmed: EventEmitter<boolean> = new EventEmitter();
	@Output() dismissed: EventEmitter<boolean> = new EventEmitter();

	public userAgreement: boolean;
	public userAgreementInfoText: string;
	private _closeResult: string;

	constructor(private _modalService: NgbModal) {
		this.userAgreement = false;
		this.userAgreementInfoText =
			"I have read and understood the user-agreement.";
		this._closeResult = "";
	}

	ngOnInit() {}

	public onUserAgreement(content) {
		if (!this.userAgreement) {
			this.open(content);
		} else {
			this.userAgreement = false;
			this.dismissed.emit(true);
		}
	}

	public open(content) {
		this._modalService
			.open(content, {
				centered: true,
				backdropClass: "bl-modal",
				size: "lg"
			})
			.result.then(result => {
				this._closeResult = "closed with" + result;
				this.userAgreement = true;
				this.confirmed.emit(true);
			})
			.catch(reason => {
				this._closeResult =
					"Dismissed: " + this.getDismissReason(reason);
				console.log(this._closeResult);
				this.userAgreement = false;
				this.dismissed.emit(true);
			});
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return "by pressing ESC";
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return "by clicking on a backdrop";
		} else {
			return `with: ${reason}`;
		}
	}
}
