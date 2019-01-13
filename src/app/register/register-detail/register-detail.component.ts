import { Component, Inject, Injectable, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LocalLoginService } from "../../login/local-login/local-login.service";
import { RegisterDetailService } from "./register-detail.service";
import { BlApiError, Branch, UserDetail } from "@wizardcoder/bl-model";
import { AuthLoginService } from "../../login/auth-login.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LOGIN_MODULE_SETTINGS } from "../../login/login-module-settings";
import { BranchService, UserDetailService } from "@wizardcoder/bl-connect";
import {
	NgbDateAdapter,
	NgbDatepickerConfig,
	NgbDateStruct
} from "@ng-bootstrap/ng-bootstrap";
import { DateService } from "../../date/date.service";

@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {
	fromModel(date: Date): NgbDateStruct {
		return date && date.getFullYear
			? {
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					day: date.getDate()
			  }
			: null;
	}

	toModel(date: NgbDateStruct): Date {
		return date ? new Date(date.year, date.month - 1, date.day) : null;
	}
}

@Component({
	selector: "bl-register-detail",
	templateUrl: "./register-detail.component.html",
	styleUrls: ["./register-detail.component.scss"],
	providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class RegisterDetailComponent implements OnInit {
	public registerDetailTitle: string;
	public successMsg: string;
	public warningMsg: string;

	public branchNotSelectedWarning: string;

	public defaultBranch: { name: string; id?: string };
	public username: string;
	public branches: any[];
	private _defaultGroup: any;
	private _userDetail: UserDetail;
	public userAgreementUrl: string;
	public warning: boolean;

	public registerForm: FormGroup;

	constructor(
		@Inject(FormBuilder) fb: FormBuilder,
		private _localLoginService: LocalLoginService,
		private _registerDetailService: RegisterDetailService,
		private _authLoginService: AuthLoginService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _branchService: BranchService,
		private _userDetailService: UserDetailService,
		private _ngbDatepickerConfig: NgbDatepickerConfig,
		private _dateService: DateService
	) {
		this._ngbDatepickerConfig.minDate = { year: 1890, month: 1, day: 1 };
		this._ngbDatepickerConfig.maxDate = {
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			day: new Date().getDate()
		};

		this._defaultGroup = {
			name: "",
			phone: "",
			address: "",
			postCity: "",
			postCode: "",
			dob: "",
			branch: "",
			guardian: fb.group({
				name: "",
				phone: "",
				email: ""
			})
		};

		this.warning = false;

		this.registerForm = fb.group(this._defaultGroup);

		this.userAgreementUrl = LOGIN_MODULE_SETTINGS.userAgreementUrl;
		this.defaultBranch = { name: "Velg skole", id: null };
	}

	ngOnInit() {
		if (!this._authLoginService.isLoggedIn()) {
			this._router.navigate(["../../menu"], { relativeTo: this._route });
		}

		this.fetchBranches();
		this.fetchUserDetails();
	}

	public showGuardianRegister(): boolean {
		return this.isUnder18();
	}

	private fetchBranches() {
		this._branchService
			.get()
			.then((branches: Branch[]) => {
				this.branches = branches;
			})
			.catch((blApiError: BlApiError) => {
				console.log("RegisterDetailComponent: could not get branches");
			});
	}

	private fetchUserDetails() {
		this._registerDetailService
			.getUserDetails()
			.then((userDetail: UserDetail) => {
				this.setUserDetail(userDetail);
			})
			.catch((err: BlApiError) => {
				this._router.navigate(["../../menu"], {
					relativeTo: this._route
				});
			});
	}

	private setUserDetail(userDetail: UserDetail) {
		this.registerForm.reset();
		this._userDetail = userDetail;
		this._defaultGroup.name = userDetail.name ? userDetail.name : "";
		this._defaultGroup.phone = userDetail.phone ? userDetail.phone : "";
		this._defaultGroup.address = userDetail.address
			? userDetail.address
			: "";
		this._defaultGroup.postCity = userDetail.postCity
			? userDetail.postCity
			: "";
		this._defaultGroup.postCode = userDetail.postCode
			? userDetail.postCode
			: "";
		this._defaultGroup.branch = userDetail.branch ? userDetail.branch : "";
		this._defaultGroup.dob = userDetail.dob ? new Date(userDetail.dob) : "";
		this._defaultGroup.guardian = userDetail.guardian
			? userDetail.guardian
			: { name: "", phone: "", email: "" };
		this.registerForm.setValue(this._defaultGroup);
		this.username = userDetail.email;
	}

	private convertDateToNgbDatepicker(theDate: Date) {
		return {
			year: theDate.getFullYear(),
			month: theDate.getMonth(),
			day: theDate.getDay()
		};
	}

	public isUnder18(): boolean {
		return this._dateService.isUnder18(this.registerForm.value.dob);
	}

	public onUpdateDetails() {
		if (!this.registerForm.dirty) {
			return;
		}

		this._registerDetailService
			.updateDetails(this.registerForm.value)
			.then((userDetail: UserDetail) => {
				this.setUserDetail(userDetail);
				this._userDetailService
					.isValid(userDetail.id)
					.then(valid => {
						this._router.navigateByUrl(
							LOGIN_MODULE_SETTINGS.successPath
						);
					})
					.catch(() => {
						console.log("could not check if userDetail was valid");
					});
			})
			.catch((blApiErr: BlApiError) => {
				console.log(
					"got error from server when updating the userDetail: ",
					blApiErr
				);
			});
	}

	private setSuccess(msg: string) {
		this.successMsg = msg;

		setTimeout(() => {
			this.successMsg = null;
		}, 3000);
	}

	private setWarning(msg: string) {
		this.warningMsg = msg;
	}

	public onDoItLater() {
		this._router.navigateByUrl(LOGIN_MODULE_SETTINGS.successPath);
	}
}
