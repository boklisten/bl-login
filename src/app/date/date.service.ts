import { Injectable } from "@angular/core";
import moment from "moment-es6";

@Injectable()
export class DateService {
	constructor() {}

	isUnder18(dob: Date | string) {
		if (!(dob instanceof Date)) {
			dob = new Date(dob);
		}
		const eighteenDate = moment().subtract(18, "years");

		return moment(dob).isAfter(eighteenDate);
	}
}
