import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToursService} from '../../../../services/tours.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Tour} from '../../../../interfaces/tour/tour.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {RangeService} from '../../../../services/range.service';
import {DateHandlerService} from '../../../../services/date-handler.service';
import {TourDate} from '../../../../interfaces/tour/tourDate.interface';

@Component({
  selector: 'app-tours-page',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];
  loading = false;
  value: any;
  enabled: any;
  filterForm: FormGroup;
  rangeTransports: any;
  rangeTourTypes: any;
  @ViewChild('selectSort', {static: false})
  selectSort: ElementRef;
  dateFromFilter: TourDate;

  constructor(private toursService: ToursService,
              private rangeService: RangeService,
              private router: Router,
              private route: ActivatedRoute,
              private dateService: DateHandlerService) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      fromCountry: new FormControl(),
      toCountry: new FormControl(),
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
      transportType: new FormControl()
    });

    this.loading = true;
    this.route.queryParams.subscribe((params: Params) => {
      if (params.country) {
        const param = '?toCountry=' + params.country;
        this.getToursByParams(param);
        this.loading = false;
      } else if (params.rest) {
        const param = '?restType=' + params.rest;
        this.getToursByParams(param);
        this.loading = false;
      } else {
        this.toursService.getTours().subscribe((data) => {
          this.tours = data;
          this.loading = false;
        });
      }
    });

    this.rangeService.getRanges().subscribe(ranges => {
      ranges.forEach(range => {
        if (range.category == 'transport') {
          this.rangeTransports = range;
        }

        if (range.category === 'rest') {
          this.rangeTourTypes = range;
        }
      });
    });
  }

  Search() {
    let params = '?';
    for (let filter in this.filterForm.value) {
      if (this.filterForm.value[filter]) {
        console.log(this.filterForm.value[filter])
        if (filter == 'dateFrom' || filter == 'dateTo') {
          params += filter + '=' + this.filterForm.value[filter].day + '.' +
                                 + this.filterForm.value[filter].month + '.' +
                                 + this.filterForm.value[filter].year + '&';
        } else {
          params += filter + '=' + this.filterForm.value[filter] + '&';
        }

        if (filter == 'dateFrom') {
          this.dateFromFilter = this.filterForm.value[filter];
        }
      }
    }

    if (this.selectSort.nativeElement.value) {
      params += 'sortBy=' + this.selectSort.nativeElement.value;
    } else {
      params = (params.slice(0, params.length - 1));
    }
    this.getToursByParams(params);
  }

  getToursByRest(type: string) {
    this.filterForm = new FormGroup({
      fromCountry: new FormControl(),
      toCountry: new FormControl(),
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
      transportType: new FormControl()
    });

    this.toursService.getToursByRestType(type).subscribe(tours => {
      this.tours = tours;
    });
  }

  getToursByParams(params) {
    this.toursService.getTours(params).subscribe(tours => {
      // if any tours was founded (if not -> tours = [])
      if (tours.length) {
        // if user has inputed filter dateFrom
        if (this.dateFromFilter) {
          tours = tours.map(tour => {
            tour.dates = this.dateService.sortDatesAfterDateFrom(tour.dates, this.dateFromFilter);
            return tour;
          });
        } else {
          // filter tour.dates(after current date) and sort these dates
          tours = tours.map(tour => {
            tour.dates = this.dateService.sortActualDates(tour.dates);
            return tour;
          });

          //filter tours(delete tour from tours if tour.dates = [] after filter actual dates)
          tours = tours.filter(tour => tour.dates.length);
        }
      }

      this.tours = tours;
    });
  }
}
