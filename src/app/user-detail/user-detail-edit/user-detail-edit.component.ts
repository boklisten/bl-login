import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UserDetailService, TokenService, LoginService} from '@wizardcoder/bl-connect';
import {UserDetail, BlApiError} from '@wizardcoder/bl-model';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {isNumber} from "util";
import {NgbDateAdapter} from "@ng-bootstrap/ng-bootstrap";
import {NgbDateNativeAdapter} from "../../register/register-detail/register-detail.component";
import * as moment from "moment";

@Component({
	selector: 'bl-user-detail-edit',
	templateUrl: './user-detail-edit.component.html',
	styleUrls: ['./user-detail-edit.component.scss']
})
export class UserDetailEditComponent implements OnInit {
	@Input() userDetail: UserDetail;
	@Output() patchValues: EventEmitter<any>;
	userDetailForm: FormGroup;
	userUnder18: boolean;
	canSave: boolean;
	oldDob: Date;
	defaultDate: Date;

	constructor(private _userDetailService: UserDetailService, private _tokenService: TokenService, private _loginService: LoginService,
				private formBuilder: FormBuilder) {
		this.patchValues = new EventEmitter<any>();

		this.userDetailForm = this.formBuilder.group({
			email: new FormControl({value: '', disabled: true}, [Validators.required]),
			name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
			phone: new FormControl('', [Validators.minLength(8), Validators.maxLength(8), this.isValidNumber()]),
			address: new FormControl('', [Validators.required, Validators.maxLength(40)]),
			postCode: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), this.isValidNumber()]),
			postCity: new FormControl('', [Validators.required, Validators.maxLength(40)]),
			guardianPhone: new FormControl('', [this.requiredIfUserUnder18(), this.isValidNumber(), Validators.maxLength(8), Validators.minLength(8)]),
			guardianName: new FormControl('', [this.requiredIfUserUnder18()]),
			guardianEmail: new FormControl('', [this.requiredIfUserUnder18(), Validators.email])
		});

		this.userUnder18 = false;
		this.defaultDate = new Date();
	}

	ngOnInit() {


		if (this.userDetail && this.userDetail.dob && moment(this.userDetail.dob).isValid()) {
			this.oldDob = moment(this.userDetail.dob).subtract(1, 'day').toDate();
		} else {
			this.oldDob = this.defaultDate;
		}

		if (this.userDetail) {
			this.rebuildForm();
		}
	}

	isValidNumber(): ValidatorFn {
		return (control: AbstractControl): {[key: string]: any} | null => {

			if (!control.value || (!isNaN(control.value) && !isNaN(parseFloat(control.value)))) {
				return null;
			}

			return {notNumber: true};
		};
	}

	isDobValid() {
		return (this.userDetail.dob !== this.defaultDate);
	}

	requiredIfUserUnder18(): ValidatorFn {
		return (control: AbstractControl): {[key: string]: any} | null => {
			if (this.userUnder18 && (!control.value || control.value.length <= 0)) {
				return {requiredValue: true};
			}
			return null;
		};
	}

	public onSubmit() {

		const formValues = this.userDetailForm.getRawValue();
		const patchedValues = {
			name: formValues.name,
			phone: formValues.phone,
			address: formValues.address,
			postCode: formValues.postCode,
			postCity: formValues.postCity,
			dob: this.userDetail.dob,
			guardian: {
				name: formValues.guardianName,
				phone: formValues.guardianPhone,
				email: formValues.guardianEmail
			}
		};
		this.patchValues.emit(patchedValues);
	}

	public rebuildForm() {
		this.userDetailForm.reset({
			email: (this.userDetail.email) ? this.userDetail.email : '',
			name: (this.userDetail.name) ? this.userDetail.name : '',
			phone: (this.userDetail.phone) ? this.userDetail.phone : '',
			address: (this.userDetail.address) ? this.userDetail.address : '',
			postCode: (this.userDetail.postCode) ? this.userDetail.postCode : '',
			postCity: (this.userDetail.postCity) ? this.userDetail.postCity : '',
			guardianName: (this.userDetail.guardian && this.userDetail.guardian.name) ? this.userDetail.guardian.name : '',
			guardianPhone: (this.userDetail.guardian && this.userDetail.guardian.email) ? this.userDetail.guardian.phone : '',
			guardianEmail: (this.userDetail.guardian && this.userDetail.guardian.email) ? this.userDetail.guardian.email : ''
		});
		this.userDetail.dob = this.oldDob;
	}

	public onDobChange(dob: Date) {
		this.checkIfCanSave();
	}

	public onUserUnder18(under18: boolean) {
		this.userUnder18 = under18;

		if (!this.userUnder18) {
			this.userDetailForm.controls.guardianEmail.clearValidators();
			this.userDetailForm.controls.guardianName.clearValidators();
			this.userDetailForm.controls.guardianPhone.clearValidators();

			this.userDetailForm.patchValue({
				guardianEmail: '',
				guardianName: '',
				guardianPhone: ''
			});
		} else {
			this.userDetailForm.controls.guardianEmail.setValidators([Validators.email, Validators.required, Validators.maxLength(40)]);
			this.userDetailForm.controls.guardianName.setValidators([Validators.maxLength(40), Validators.required]);
			this.userDetailForm.controls.guardianPhone.setValidators([this.isValidNumber(), Validators.required]);
		}

		this.checkIfCanSave();
	}

	public checkIfCanSave() {
		if (this.userDetailForm.valid && (this.userDetailForm.touched || this.userDetailForm.dirty)) {
			this.canSave = true;
		} else if (this.userDetailForm.valid && this.oldDob !== this.userDetail.dob) {
			this.canSave = true;
		} else {
			this.canSave = false;
		}
	}

	public canSubmit(): boolean {
		this.checkIfCanSave();
		return this.canSave;
	}
}
