import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {NgbCalendar, NgbDatepicker, NgbDatepickerConfig} from "@ng-bootstrap/ng-bootstrap";
import moment from 'moment-es6';

@Component({
	selector: 'bl-user-detail-dob',
	templateUrl: './user-detail-dob.component.html',
	styleUrls: ['./user-detail-dob.component.scss']
})
export class UserDetailDobComponent implements OnInit, OnChanges {
	@Input() dob: Date;
	@Output() dobChange: EventEmitter<Date>;
	@Output() under18: EventEmitter<boolean>;
	@ViewChild(NgbDatepicker) datepicker;
	@Output() dateChange: EventEmitter<Date>;
	currentDob: Date;

	constructor(private _config: NgbDatepickerConfig, private _calendar: NgbCalendar) {

		const maxDate = moment(new Date()).add(2, 'month'); // again, ng-bootstrap fucks up dates, must add two months to start date just to display current date..
		this._config.minDate = {year: 1904, month: 4, day: 2}; // currently oldest person on the planet
		this._config.maxDate = {year: maxDate.year(), month: maxDate.month(), day: maxDate.month()};


		this.dobChange = new EventEmitter<Date>();
		this.under18 = new EventEmitter<boolean>();
		this.dateChange = new EventEmitter<Date>();
	}

	ngOnInit() {
		this.setDates();
	}

	ngOnChanges() {
	}

	setDates() {
		if (moment(this.dob).isValid()) {
			this.currentDob = this.dob;
			this._config.startDate = {year: this.currentDob.getFullYear(), month: this.currentDob.getMonth() + 1};
			this.datepicker.navigateTo(this._config.startDate); // navigate the view of the calendar to the date
		}
		this.emitUnder18();
	}

	onDateSelect() {
		// ng-bootstrap really can't do date properly, the date selected is always a day off..
		const selectedDate = moment(this.currentDob).add(1, 'day').toDate();
		this.dob = selectedDate;
		this.dobChange.emit(this.dob);
		this.dateChange.emit(this.dob);
		this.emitUnder18();
	}

	emitUnder18() {
		const selectedDate = moment(this.currentDob).add(1, 'day').toDate();
		if (this.isUnder18(selectedDate)) {
			this.under18.emit(true);
		} else {
			this.under18.emit(false);
		}

	}

	isUnder18(date) {
		return moment(date).isAfter(moment(new Date()).subtract(18, 'years'));
	}

}
