import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Tour} from '../../../../interfaces/tour/tour.interface';
import {ToursService} from '../../../../services/tours.service';
import {TourDate} from '../../../../interfaces/tour/tourDate.interface';
import {Review} from '../../../../interfaces/review/review.interface';
import {ReviewService} from '../../../../services/review.service';

import {UserData} from '../../../../interfaces/user/userData.interface';
import {UserService} from '../../../../services/user.service';
import {DateHandlerService} from '../../../../services/date-handler.service';

@Component({
  selector: 'app-one-tour-page',
  templateUrl: './one-tour.component.html',
  styleUrls: ['./one-tour.component.scss']
})
export class OneTourComponent implements OnInit {
  id: string;
  tour: Tour;
  reviews: Review[];
  users: UserData[] = [];
  imgActive = '';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private toursService: ToursService,
              private reviewService: ReviewService,
              private userService: UserService,
              private dateService: DateHandlerService) {
    this.id = activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.toursService.getOneTour(this.id).subscribe((data) => {
      this.tour = data;
      this.tour.dates = this.dateService.sortActualDates(this.tour.dates);
      console.log(this.tour);
    });

    this.reviewService.getReviewsByTourId(this.id).subscribe((reviews) => {
      console.log(reviews)
      this.reviews = reviews;
      if (reviews.length) {
        this.reviews.sort((a, b) => -this.dateService.compareDates(a.date, b.date));
        console.log(this.reviews);
        this.reviews.forEach((review, index) => {
          this.userService.getUserById(review.userId).subscribe(user => {
              this.users.push(user);
            }
          );
        });
      }
    });
  }

  isLoaded() {
    if (this.tour && this.reviews && this.users.length === this.reviews.length) {
      return true;
    } else {
      return false;
    }
  }

  showGallery(event) {
    this.imgActive = event.target.src;
  }

  exitGallery(event) {
    const element = event.target as HTMLElement;
    if(element.classList.contains('full-window-gallery') || element.classList.contains('exit-icon')) {
      this.imgActive = '';
    }
  }

/*  sortActualDates() {
    const today = new Date();
    const currDate: TourDate = {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };

    this.tour.dates = this.tour.dates.filter((date) => {
      return this.dateService.compareDates(date.dateTo, currDate) === 1;
    });
    this.tour.dates.sort((a, b) => this.dateService.compareDates(a.dateTo, b.dateTo));
  }*/

/*  compareDates(a: TourDate, b: TourDate) {
      if ((a.year < b.year) ||
          (a.month < b.month && a.year === b.year) ||
          (a.day < b.day && a.month === b.month && a.year === b.year)
          ) {
        return -1;
    } else {
        return 1;
    }
  }*/

  renderProfilePage(user: UserData) {
    this.router.navigate(['/account', user._id]);
  }
}
