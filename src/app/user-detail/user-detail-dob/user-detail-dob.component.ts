import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import moment from 'moment-es6';
import {DatepickerOptions} from "ng2-datepicker";
import * as nbLocale from 'date-fns/locale/nb';

@Component({
	selector: 'bl-user-detail-dob',
	templateUrl: './user-detail-dob.component.html',
	styleUrls: ['./user-detail-dob.component.scss']
})
export class UserDetailDobComponent implements OnInit {
	@Input() dob: Date;
	@Output() dobChange: EventEmitter<Date>;
	@Output() under18: EventEmitter<boolean>;
	@Output() dateChange: EventEmitter<Date>;
	dobInput: string;
	dateInvalidError: boolean;

	datepickerOptions: DatepickerOptions;

	constructor() {
		this.dobChange = new EventEmitter<Date>();
		this.under18 = new EventEmitter<boolean>();
		this.dateChange = new EventEmitter<Date>();
		this.dateInvalidError = false;
	}

	ngOnInit() {
		this.datepickerOptions = {
			minYear: 1904,
			maxYear: new Date().getFullYear(),
			locale: nbLocale,
			firstCalendarDay: 1,
			displayFormat: 'DD.MM.YYYY'
		};


		if (moment(this.dob).isValid()) {
			this.dobInput = moment(this.dob).format('YYYY-MM-DD');
			if (!moment(this.dob).isSame(new Date(), 'day')) {
				this.emitUnder18(this.dob); // should check under 18 on init
			}
		} else {
			this.dobInput = moment().toString();
		}
	}

	public onDobChange() {
		this.dateInvalidError = false;
		let momentDate = null;

		if (moment(this.dobInput, 'DDMMYYYY').isValid())  {
			momentDate = moment(this.dobInput, 'DDMMYYYY');
		} else if (moment(this.dobInput, 'DD.MM.YYYY').isValid()) {
			momentDate = moment(this.dobInput, 'DD.MM.YYYY');
		} else if (moment(this.dobInput, 'DDMMYY').isValid()) {
			momentDate = moment(this.dobInput, 'DDMMYY');
		} else if (moment(this.dobInput).isValid()) {
			momentDate = moment(this.dobInput);
		}

		if (!momentDate) {
			console.log('the date is not valid');
			this.dateInvalidError = true;
			return;
		}

		this.setDates(moment(momentDate).toDate());
	}

	setDates(dob: Date) {
		this.dob = moment(dob).add(1, 'day').toDate();
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
		return moment(date).isAfter(moment(new Date()).subtract(18, 'years'));
	}

}
