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
import {EmailService} from '../../../../services/email.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-one-tour-page',
  templateUrl: './one-tour.component.html',
  styleUrls: ['./one-tour.component.scss']
})
export class OneTourComponent implements OnInit {
  id: string;
  tour: Tour;
  reviews = [];
  imgActive = '';
  isReviewsLoaded = false;
  subscribeError = '';
  load = false;
  reviewForm: FormGroup;
  reviewError = '';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private toursService: ToursService,
              private reviewService: ReviewService,
              private userService: UserService,
              private dateService: DateHandlerService,
              private emailService: EmailService,
              private modalService: NgbModal) {
    this.id = activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      info: new FormControl(null, [Validators.required])
    });

    this.toursService.getOneTour(this.id).subscribe((data) => {
      this.tour = data;
      this.tour.dates = this.dateService.sortActualDates(this.tour.dates);
    });

    this.reviewService.getReviewsUsersByTourId(this.id).subscribe((reviews) => {
      this.reviews = reviews;
      this.isReviewsLoaded = true;
    });
  }

  isLoaded() {
    if (this.tour && this.isReviewsLoaded) {
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


  subscribeNews(email: string, successModal) {
    this.subscribeError = '';

    if(!email.trim().length) {
      this.subscribeError = 'Enter your Email';
      return;
    }

    this.emailService.addEmailInNewsletter(email).subscribe(
      res => {
        this.load = true;
        this.emailService.sendEmailSubscribed(email).subscribe(
          res => {
            this.load = false;
            this.modalService.open(successModal, { centered: true });
          },
          err => {
            this.subscribeError = err.error.message;
          })
      },
      err => {
        this.subscribeError = err.error.message;
      }
    );
  }

  createReview(msgModal) {
    if(!this.userService.getUserData()) {
      this.reviewError = '* To leave feedback u must be authorized';
      return;
    }

    if(!this.reviewForm.value.title || !this.reviewForm.value.info
    ||  !String(this.reviewForm.value.title).trim().length
    || !String(this.reviewForm.value.info).trim().length) {
      this.reviewError = '* Please, fill all fields...';
      return;
    }

    const review = {
      title: this.reviewForm.value.title,
      info: this.reviewForm.value.info,
      userId: this.userService.getUserData()._id,
      tourId: this.id
    };

    this.modalService.open(msgModal, { centered: true });

    this.reviewService.createReview(review).subscribe(newReview => {
      setTimeout(() => this.modalService.dismissAll(), 2000);
    });
  }
}
