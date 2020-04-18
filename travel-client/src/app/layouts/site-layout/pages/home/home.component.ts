import {Component, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as AOS from 'aos';
import {ReviewService} from '../../../../services/review.service';
import {Review} from '../../../../interfaces/review/review.interface';
import {UserService} from '../../../../services/user.service';
import {UserData} from '../../../../interfaces/user/userData.interface';
import {ToursService} from '../../../../services/tours.service';
import {Tour} from '../../../../interfaces/tour/tour.interface';
import {Router} from '@angular/router';
import {LocationService} from '../../../../services/location.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {LangService} from '../../../../services/lang.service';
import {EmailService} from '../../../../services/email.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  topTours: Tour[];
  discoutTour: Tour;
  topToursClasses: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  reviews = [];
  countries: string[] = [];
  countryExist: boolean = true;
  lang: string;
  prevInput: string;
  subscribeError = '';
  load = false;

  constructor(private toursService: ToursService,
              private reviewService: ReviewService,
              private userService: UserService,
              private locationService: LocationService,
              private router: Router,
              private emailService: EmailService,
              private modalService: NgbModal) { }

  ngOnInit() {
    AOS.init();

    this.toursService.getTop10Tours().subscribe(tours => {
      this.topTours = tours;
    });

    this.reviewService.getReviewsUsersLimit(3).subscribe(reviews => {
      this.reviews = reviews;
    });

    this.toursService.getBiggestDiscountTour().subscribe(tour => {
      this.discoutTour = tour;
    });

    this.locationService.getContries().subscribe(countries => {
      this.countries = countries;
    });
  }

  isLoaded() {
    if (this.topTours && this.reviews.length && this.discoutTour) {
      return true;
    } else {
      return false;
    }
  }

  renderTourPage(tourId: string) {
    this.router.navigate(['/one-tour', tourId]);
  }

  renderRegisterPage() {
    this.router.navigate(['/register']);
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.countries.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  };

  renderToursPageByCountry(country: string) {
    this.prevInput = country;
    this.countries.forEach((countryDB, index) => {
      if (countryDB.toLowerCase() === country.toLowerCase()) {
        this.countryExist = true;
        this.router.navigate(['/tours'], {queryParams: {country: countryDB}});
      }
    });

    this.countryExist = false;
  }

  renderToursPageByRest(restType) {
    this.router.navigate(['/tours'], {queryParams: {rest: restType.innerHTML}});
  }

  renderProfilePage(userId: string) {
    this.router.navigate(['/account', userId]);
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
        console.log(this.subscribeError)
      }
    );
  }
}
