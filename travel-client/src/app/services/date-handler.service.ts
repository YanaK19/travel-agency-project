import {Injectable} from '@angular/core';
import {TourDate} from '../interfaces/tour/tourDate.interface';
import {TourDates} from '../interfaces/tour/tourDates.interface';

@Injectable({providedIn: 'root'})
export class DateHandlerService {

  sortActualDates(dates: TourDates[]) {
    const today = new Date();
    const currDate: TourDate = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear()
    };

    dates = dates.filter((date) => {
      return (this.compareDates(date.dateFrom, currDate) == 1);
    });

    if (dates.length) {
      dates = dates.sort((a, b) => this.compareDates(a.dateFrom, b.dateFrom));
    }

    return dates;
  }

  sortDatesAfterDateFrom(dates: TourDates[], dateFrom: TourDate):TourDates[] {
    dates = dates.filter((date) => {
      return (this.compareDates(date.dateFrom, dateFrom) == 1);
    });

    dates = dates.sort((a, b) => this.compareDates(a.dateFrom, b.dateFrom));
    return dates;
  }

  compareDates(a: TourDate, b: TourDate) {
    if ((a.year < b.year) ||
      (a.month < b.month && a.year == b.year) ||
      (a.day < b.day && a.month == b.month && a.year == b.year)
    ) {
      return -1;
    } else {
      return 1;
    }
  }
}
