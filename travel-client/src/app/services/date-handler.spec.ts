import {DateHandlerService} from './date-handler.service';
import {TourDate} from '../interfaces/tour/tourDate.interface';
import {TourDates} from '../interfaces/tour/tourDates.interface';

describe('DateHandlerService', () => {
  let service: DateHandlerService;
  beforeEach(() => { service = new DateHandlerService(); });

  it('should compare dates', () => {
    const date1: TourDate = {
      day: 11,
      month: 3,
      year: 2020
    };

    const date2: TourDate = {
      day: 11,
      month: 4,
      year: 2020
    };

    expect(service.compareDates(date1, date2)).toBe(-1);
  });

  it('should return sorted dates after curr date', () => {
    const today = new Date();
    const currDate: TourDate = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear()
    };

    const date1: TourDates = {
      dateFrom: {
        day: currDate.day + 1,
        month: currDate.month,
        year: currDate.year + 1
      },
      dateTo: {
        day: currDate.day + 3,
        month: currDate.month,
        year: currDate.year + 1
      }
    };

    const date2: TourDates = {
      dateFrom: {
        day: currDate.day,
        month: currDate.month,
        year: currDate.year - 1
      },
      dateTo: {
        day: currDate.day,
        month: currDate.month,
        year: currDate.year - 1
      }
    };

    let dates = [date1, date2];
    let expectedDates = [date1];

    expect(service.sortActualDates(dates)).toEqual(expectedDates);
  });

  it('should return sorted dates after dateFrom', () => {
    const dateFrom1: TourDate = {
      day: 11,
      month: 11,
      year: 2019
    };

    const dateFrom2: TourDate = {
      day: 11,
      month: 5,
      year: 2020
    };

    const date1: TourDates = {
      dateFrom: {
        day: 11,
        month: 11,
        year: 2020
      },
      dateTo: {
        day: 12,
        month: 11,
        year: 2020
      }
    };

    const date2: TourDates = {
      dateFrom: {
        day: 13,
        month: 3,
        year: 2020
      },
      dateTo: {
        day: 15,
        month: 3,
        year: 2020
      }
    };

    let dates = [date1, date2];
    let expectedDates1 = [date2, date1];
    let expectedDates2 = [date1];

    expect(service.sortDatesAfterDateFrom(dates, dateFrom1)).toEqual(expectedDates1);
    expect(service.sortDatesAfterDateFrom(dates, dateFrom2)).toEqual(expectedDates2);
  });
});
