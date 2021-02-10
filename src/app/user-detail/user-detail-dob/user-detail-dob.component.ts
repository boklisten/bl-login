import {
	Component,
	DoCheck,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
} from "@angular/core";
import moment from "moment-es6";
import * as nbLocale from "date-fns/locale/nb";

@Component({
	selector: "bl-user-detail-dob",
	templateUrl: "./user-detail-dob.component.html",
	styleUrls: ["./user-detail-dob.component.scss"],
})
export class UserDetailDobComponent implements OnInit {
	@Input() dob: Date;
	@Output() dobChange: EventEmitter<Date>;
	@Output() under18: EventEmitter<boolean>;
	@Output() dateChange: EventEmitter<Date>;
	dobInput: string;
	dateInvalidError: boolean;
	public showDateStringFormat: boolean;

	constructor() {
		this.dobChange = new EventEmitter<Date>();
		this.under18 = new EventEmitter<boolean>();
		this.dateChange = new EventEmitter<Date>();
		this.dateInvalidError = false;
	}

	ngOnInit() {
		const dateField = document.getElementById("blDateField");
		if (dateField) {
			dateField.setAttribute("type", "date");
			if (dateField["type"] !== "date") {
				this.showDateStringFormat = true;
			}
		}

		if (moment(this.dob).isValid()) {
			this.dobInput = moment(this.dob).format("YYYY-MM-DD");
			if (!moment(this.dob).isSame(new Date(), "day")) {
				this.emitUnder18(this.dob); // should check under 18 on init
			}
		} else {
			this.dobInput = moment().toString();
		}
	}

	public onDobChange() {
		this.dateInvalidError = false;
		let momentDate = null;

		if (moment(new Date(this.dobInput)).isValid()) {
			momentDate = moment(new Date(this.dobInput));
		} else {
			momentDate = moment(this.dobInput.toString(), "DD.MM.YYYY");
		}

		if (!momentDate) {
			this.dateInvalidError = true;
			return;
		}

		this.setDates(moment(momentDate).toDate());
	}

	setDates(dob: Date) {
		this.dob = dob;
		this.dobChange.emit(this.dob);
		this.dateChange.emit(this.dob);
		this.emitUnder18(this.dob);
	}

	emitUnder18(date: Date) {
		if (this.isUnder18(date)) {
			this.under18.emit(true);
		} else {
			this.under18.emit(false);
		}
	}

	isUnder18(date) {
		return moment(date).isSameOrAfter(
			moment(new Date()).subtract(18, "years")
		);
	}
}
