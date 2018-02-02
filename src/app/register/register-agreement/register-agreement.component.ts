import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: 'bl-register-agreement',
	templateUrl: './register-agreement.component.html',
	styleUrls: ['./register-agreement.component.scss']
})
export class RegisterAgreementComponent implements OnInit {
	
	public userAgreement: boolean;
	public userAgreementInfoText: string;
	public privacyAgreementUrl: string;
	public privacyAgreementUrlText: string;
	
	private _closeResult: string;
	
	constructor(private _modalService: NgbModal) {
		this.userAgreement = false;
		this.privacyAgreementUrlText = 'Click here to read the user agreement.';
		this.userAgreementInfoText = 'I have read and understood the user-agreement.';
	}
	
	ngOnInit() {
	}
	
	public onUserAgreement(content) {
		this.userAgreement = !this.userAgreement;
		if (this.userAgreement) {
			this.open(content);
		}
	}
	
	public open(content) {
		this._modalService.open(content).result.then((result) => {
			this._closeResult = 'closed with' + result;
			console.log(this._closeResult);
		}).catch((reason) => {
			this._closeResult = 'Dismissed: ' + this.getDismissReason(reason);
			console.log(this._closeResult);
		});
		
	}
	
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return  `with: ${reason}`;
		}
	}

	
}
