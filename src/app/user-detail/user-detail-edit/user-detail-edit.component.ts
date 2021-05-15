import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from "@angular/core";
import {
	UserDetailService,
	TokenService,
	LoginService,
} from "@boklisten/bl-connect";
import { UserDetail } from "@boklisten/bl-model";
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	ValidatorFn,
	Validators,
} from "@angular/forms";

import moment from "moment-es6";

@Component({
	selector: "bl-user-detail-edit",
	templateUrl: "./user-detail-edit.component.html",
	styleUrls: ["./user-detail-edit.component.scss"],
})
export class UserDetailEditComponent implements OnInit {
	@Input() userDetail: UserDetail;
	@Output() patchValues: EventEmitter<any>;
	userDetailForm: FormGroup;
	userUnder18: boolean;
	canSave: boolean;
	oldDob: Date;
	defaultDate: Date;

	constructor(
		private _userDetailService: UserDetailService,
		private _tokenService: TokenService,
		private _loginService: LoginService,
		private formBuilder: FormBuilder
	) {
		this.patchValues = new EventEmitter<any>();
		const nameValidatorRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){},.|~<>;:[\]]{2,}$/;

		this.userDetailForm = this.formBuilder.group({
			email: new FormControl({ value: "", disabled: true }, [
				Validators.required,
			]),
			firstName: new FormControl("", [
				Validators.required,
				//Validators.pattern(nameValidatorRegex),

				Validators.maxLength(40),
			]),
			lastName: new FormControl("", [
				Validators.required,
				//Validators.pattern(nameValidatorRegex),
				Validators.maxLength(40),
			]),
			phone: new FormControl("", [
				Validators.minLength(8),
				Validators.maxLength(8),
				this.isValidNumber(),
			]),
			address: new FormControl("", [
				Validators.required,
				Validators.maxLength(40),
			]),
			postCode: new FormControl("", [
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(4),
				this.isValidNumber(),
			]),
			postCity: new FormControl("", [
				Validators.required,
				Validators.maxLength(40),
			]),
			guardianPhone: new FormControl("", [
				this.requiredIfUserUnder18(),
				this.isValidNumber(),
				Validators.maxLength(8),
				Validators.minLength(8),
			]),
			guardianName: new FormControl("", [
				this.requiredIfUserUnder18(),
				Validators.maxLength(40),
				//Validators.pattern(nameValidatorRegex)
			]),
			guardianEmail: new FormControl("", [
				this.requiredIfUserUnder18(),
				Validators.email,
			]),
		});

		this.userUnder18 = false;
		this.defaultDate = new Date();
	}

	ngOnInit() {
		/*
		this.userDetail = {
			id: "abc",
			name: "JONNY B GOOD-VIBES",
			email: "test@test.com",
			phone: "12345678",
			address: "osloveien",
			postCode: "1234",
			postCity: "oslo",
			country: "norway",
			branch: "branch1",
			dob: "2000-11-24T18:41:12.475Z",
		} as any;
		*/
		if (
			this.userDetail &&
			this.userDetail.dob &&
			moment(this.userDetail.dob).isValid()
		) {
			this.oldDob = moment(this.userDetail.dob).toDate();
		} else {
			this.oldDob = this.defaultDate;
		}

		if (this.userDetail) {
			this.rebuildForm();
		}
	}

	isValidNumber(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			if (
				!control.value ||
				(!isNaN(control.value) && !isNaN(parseFloat(control.value)))
			) {
				return null;
			}

			return { notNumber: true };
		};
	}

	isDobValid() {
		return this.userDetail.dob !== this.defaultDate;
	}

	requiredIfUserUnder18(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			if (
				this.userUnder18 &&
				(!control.value || control.value.length <= 0)
			) {
				return { requiredValue: true };
			}
			return null;
		};
	}

	public onSubmit() {
		const formValues = this.userDetailForm.getRawValue();
		const patchedValues = {
			name: formValues.firstName + " " + formValues.lastName,
			phone: formValues.phone,
			address: formValues.address,
			postCode: formValues.postCode,
			postCity: formValues.postCity,
			dob: this.userDetail.dob,
			guardian: {
				name: formValues.guardianName,
				phone: formValues.guardianPhone,
				email: formValues.guardianEmail,
			},
		};

		this.patchValues.emit(patchedValues);
	}

	private rebuildForm() {
		this.userDetailForm.reset({
			email: this.userDetail.email ? this.userDetail.email : "",
			firstName: this.extractFirstName(this.userDetail.name),
			lastName: this.extractLastName(this.userDetail.name),
			phone: this.userDetail.phone ? this.userDetail.phone : "",
			address: this.userDetail.address ? this.userDetail.address : "",
			postCode: this.userDetail.postCode ? this.userDetail.postCode : "",
			postCity: this.userDetail.postCity ? this.userDetail.postCity : "",
			guardianName:
				this.userDetail.guardian && this.userDetail.guardian.name
					? this.userDetail.guardian.name
					: "",
			guardianPhone:
				this.userDetail.guardian && this.userDetail.guardian.email
					? this.userDetail.guardian.phone
					: "",
			guardianEmail:
				this.userDetail.guardian && this.userDetail.guardian.email
					? this.userDetail.guardian.email
					: "",
		});
		this.userDetail.dob = this.oldDob;
	}

	private extractFirstName(fullName: string): string {
		if (!fullName || fullName.length <= 0) {
			return "";
		}

		const fullNameSplit = fullName.split(" ");

		if (fullNameSplit.length == 1) {
			return fullNameSplit[0];
		}

		return fullName
			.split(" ")
			.slice(0, fullNameSplit.length - 1)
			.join(" ");
	}

	private extractLastName(fullName: string): string {
		if (!fullName || fullName.length <= 0) {
			return "";
		}

		const fullNameSplit = fullName.split(" ");

		if (fullNameSplit.length > 1) {
			return fullNameSplit
				.slice(fullNameSplit.length - 1, fullNameSplit.length)
				.join(" ");
		}
		return "";
	}

	public onDobChange(dob: Date) {
		this.checkIfCanSave();
	}

	public onUserUnder18(under18: boolean) {
		if (!under18) {
			this.userDetailForm.controls.guardianEmail.clearValidators();
			this.userDetailForm.controls.guardianName.clearValidators();
			this.userDetailForm.controls.guardianPhone.clearValidators();

			this.userDetailForm.patchValue({
				guardianEmail: "",
				guardianName: "",
				guardianPhone: "",
			});
		} else {
			this.userDetailForm.controls.guardianEmail.setValidators([
				Validators.email,
				Validators.required,
				Validators.maxLength(40),
			]);
			this.userDetailForm.controls.guardianName.setValidators([
				Validators.maxLength(40),
				Validators.required,
			]);
			this.userDetailForm.controls.guardianPhone.setValidators([
				this.isValidNumber(),
				Validators.required,
			]);
		}
		this.userUnder18 = under18;

		this.checkIfCanSave();
	}

	public checkIfCanSave() {
		if (
			this.userDetailForm.valid &&
			(this.userDetailForm.touched || this.userDetailForm.dirty)
		) {
			this.canSave = true;
		} else if (
			this.userDetailForm.valid &&
			this.oldDob !== this.userDetail.dob
		) {
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
