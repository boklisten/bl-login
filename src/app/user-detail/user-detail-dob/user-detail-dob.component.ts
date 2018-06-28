import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import moment from 'moment-es6';
import {DatepickerOptions} from "ng2-datepicker";
import * as nbLocale from 'date-fns/locale/nb';

@Component({
	selector: 'bl-user-detail-dob',
	templateUrl: './user-detail-dob.component.html',
	styleUrls: ['./user-detail-dob.component.scss']
})
export class UserDetailDobComponent implements OnInit, DoCheck {
	@Input() dob: Date;
	@Output() dobChange: EventEmitter<Date>;
	@Output() under18: EventEmitter<boolean>;
	@Output() dateChange: EventEmitter<Date>;
	currentDob: Date;

	datepickerOptions: DatepickerOptions;

	constructor() {
		this.dobChange = new EventEmitter<Date>();
		this.under18 = new EventEmitter<boolean>();
		this.dateChange = new EventEmitter<Date>();
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
			if (!moment(this.dob).isSame(new Date(), 'day')) {
				this.currentDob = this.dob;
				this.emitUnder18(this.currentDob); // should check under 18 on init
			} else {
				this.currentDob = this.dob;
			}
		} else {
			this.currentDob = new Date();
		}
	}

	ngDoCheck() {
		if (this.currentDob !== this.dob) {
			this.setDates();
		}
	}

	setDates() {
		this.dob = moment(this.currentDob).add(1, 'day').toDate();
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
