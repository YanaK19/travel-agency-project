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
    });

    this.reviewService.getReviewsByTourId(this.id).subscribe((reviews) => {
      this.reviews = reviews;
      if (reviews.length) {
        this.reviews.sort((a, b) => -this.dateService.compareDates(a.date, b.date));
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

  renderProfilePage(user: UserData) {
    this.router.navigate(['/account', user._id]);
  }
}
