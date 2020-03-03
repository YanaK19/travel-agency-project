import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Tour} from '../../../../interfaces/tour/tour.interface';
import {ToursService} from '../../../../services/tours.service';
import {TourDates} from '../../../../interfaces/tour/tourDates.interface';
import {TourDate} from '../../../../interfaces/tour/tourDate.interface';

@Component({
  selector: 'app-one-tour-page',
  templateUrl: './one-tour.component.html',
  styleUrls: ['./one-tour.component.scss']
})
export class OneTourComponent implements OnInit {
  loading = false;
  id: string;
  tour: Tour;
  imgActive = '';

  constructor(private activatedRoute: ActivatedRoute,
              private toursService: ToursService) {
    this.id = activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.loading = true;
    this.toursService.getOneTour(this.id).subscribe((data) => {
      this.tour = data;
      this.sortActualDates();
      this.loading = false;
      console.log(this.tour);
      /*console.log(this.tour, typeof this.tour, this.tour.title);*/
    });
  }

  showGallery(event) {
    console.log(event.target);
    this.imgActive = 'url';
  }

  exitGallery() {
    this.imgActive = '';
  }

  sortActualDates() {
    const today = new Date();
    const currDate: TourDate = {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };

    this.tour.dates = this.tour.dates.filter((date) => {
      console.log(date.dateTo, currDate);
      return this.compareDates(date.dateTo, currDate) === 1;
    });

    this.tour.dates.sort((a, b) => this.compareDates(a.dateTo, b.dateTo));
    console.log(this.tour.dates);
  }

  compareDates(a: TourDate, b: TourDate) {
      if ((a.year < b.year) ||
          (a.month < b.month && a.year === b.year) ||
          (a.day < b.day && a.month === b.month && a.year === b.year)
          ) {
        return -1;
    } else {
        return 1;
    }
  }
}
