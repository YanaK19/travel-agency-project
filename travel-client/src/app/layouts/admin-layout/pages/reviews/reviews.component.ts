import { Component, OnInit } from '@angular/core';
import {ReviewService} from '../../../../services/review.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviewsTours = [];

  constructor(private reviewService: ReviewService,
              private router: Router) {
  }

  ngOnInit() {
    this.reviewService.getReviewsTours().subscribe(reviewsTours => {
      this.reviewsTours = reviewsTours;
    });
  }

  onConfirm(reviewId, index) {
    this.reviewsTours[index].review.confirmed = true;
    this.reviewService.confirmReview(reviewId).subscribe(confirmedReview => {})
  }

  onDelete(reviewId, index) {
    this.reviewsTours.splice(index, 1);
    this.reviewService.deleteReviewById(reviewId).subscribe(msg => {});
  }

  renderTourPage(tourId) {
    this.router.navigate(['/one-tour', tourId]);
  }
}
