import {
	Component,
	EventEmitter,
	Injectable,
	Input,
	Output,
} from "@angular/core";
import {
	NgbCalendar,
	NgbDateAdapter,
	NgbDateParserFormatter,
	NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import moment from "moment-es6";

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = "/";

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		let day;
		let month;
		if (date) {
			day = date.day < 10 ? "0" + date.day : date.day;
			month = date.month < 10 ? "0" + date.month : date.month;
		}

		return date
			? day + this.DELIMITER + month + this.DELIMITER + date.year
			: "";
	}
}

@Component({
	selector: "bl-user-detail-dob",
	templateUrl: "./user-detail-dob.component.html",
	styleUrls: ["./user-detail-dob.component.scss"],

	providers: [
		{
			provide: NgbDateParserFormatter,
			useClass: CustomDateParserFormatter,
		},
	],
})
export class UserDetailDobComponent {
	@Output() under18: EventEmitter<boolean>;
	@Output() dateChange: EventEmitter<Date>;
	@Input() dob: Date;
	@Output() dobChange: EventEmitter<Date>;
	dateInvalidError: boolean;
	maxDate = {
		year: moment().subtract(10, "years").year(),
		month: 12,
		day: 31,
	};

	constructor(
		private ngbCalendar: NgbCalendar,
		private dateAdapter: NgbDateAdapter<string>
	) {
		this.under18 = new EventEmitter();
		this.dateChange = new EventEmitter();
		this.dobChange = new EventEmitter();
		this.dateInvalidError = false;
	}

	onDobChange() {
		this.dateInvalidError = !moment(this.dob).isValid();
		if (this.dateInvalidError) {
			this.dateChange.emit(null);
			this.dobChange.emit(null);
			this.under18.emit(false);
			return;
		}

		this.dateChange.emit(this.dob);
		this.dobChange.emit(this.dob);
		if (this.isUnder18()) {
			this.under18.emit(true);
		} else {
			this.under18.emit(false);
		}
	}

	isUnder18() {
		return moment(this.dob).isSameOrAfter(moment().subtract(18, "years"));
	}

	get today() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}
}
