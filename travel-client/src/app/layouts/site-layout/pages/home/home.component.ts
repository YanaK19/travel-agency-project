import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import {ReviewService} from '../../../../services/review.service';
import {Review} from '../../../../interfaces/review/review.interface';
import {UserService} from '../../../../services/user.service';
import {UserData} from '../../../../interfaces/user/userData.interface';
import {ToursService} from '../../../../services/tours.service';
import {Tour} from '../../../../interfaces/tour/tour.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topTours: Tour[];
  discoutTour: Tour;
  topToursClasses: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  reviews3: Review[];
  users: UserData[] = [];

  constructor(private toursService: ToursService,
              private reviewService: ReviewService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    AOS.init();

    this.toursService.getTop10Tours().subscribe(tours => {
      this.topTours = tours;
    });

    this.reviewService.getLimitReviews(3).subscribe(reviews => {
      this.reviews3 = reviews;
      console.log(this.reviews3)
      this.reviews3.forEach((review, index) => {
        this.userService.getUserById(review.userId).subscribe((user: UserData) => {
            this.users.push(user);
          }
        );
      });
    });

    this.toursService.getBiggestDiscountTour().subscribe(tour => {
      this.discoutTour = tour;
    });
  }

  isLoaded() {
    if (this.topTours && this.reviews3 && this.discoutTour && this.users.length === this.reviews3.length) {
      return true;
    } else {
      return false;
    }
  }

  renderTourPage(tourId: string) {
    this.router.navigate(['/one-tour', tourId]);
  }
}
