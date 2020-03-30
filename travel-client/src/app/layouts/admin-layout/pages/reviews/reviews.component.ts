import { Component, OnInit } from '@angular/core';
import {ReviewService} from '../../../../services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews = [];

  constructor(private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.reviewService.getReviews().subscribe(reviews => {
      this.reviews = reviews;
      console.log(reviews)
    });
  }

  onConfirm(reviewId, index) {
    this.reviews[index].confirmed = true;
    this.reviewService.confirmReview(reviewId).subscribe(confirmedReview => {})
  }

  onDelete(reviewId, index) {
    this.reviews.splice(index, 1);
    this.reviewService.deleteReviewById(reviewId).subscribe(msg => {});
  }
}
