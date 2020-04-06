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

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  topTours: Tour[];
  discoutTour: Tour;
  topToursClasses: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  reviews3: Review[];
  users: UserData[] = [];
  countries: string[] = [];
  countryExist: boolean = true;
  lang: string;

  constructor(private toursService: ToursService,
              private reviewService: ReviewService,
              private userService: UserService,
              private locationService: LocationService,
              private router: Router) { }

  ngOnInit() {
    AOS.init();

    this.toursService.getTop10Tours().subscribe(tours => {
      this.topTours = tours;
    });

    this.reviewService.getLimitReviews(3).subscribe(reviews => {
      this.reviews3 = reviews;
      this.reviews3.forEach((review, index) => {
        this.userService.getUserById(review.userId).subscribe((user: UserData) => {
            this.users.push(user);
        });
      });
    });

    this.toursService.getBiggestDiscountTour().subscribe(tour => {
      this.discoutTour = tour;
    });

    this.locationService.getContries().subscribe(countries => {
      this.countries = countries;
    });
  }

  isLoaded() {
    if (this.topTours && this.reviews3 && this.discoutTour && this.users.length === 3) {
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

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.countries.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  renderToursPageByCountry(country: string) {
    let isExist: boolean = false;

    this.countries.forEach((countryDB, index) => {
      if (countryDB.toLowerCase() === country.toLowerCase()) {
        isExist = true;
        this.countryExist = true;
        this.router.navigate(['/tours'], {queryParams: {country: countryDB}});
      }
    });

    if (!isExist) {
      this.countryExist = false;
    }
  }

  renderToursPageByRest(restType) {
    this.router.navigate(['/tours'], {queryParams: {rest: restType.innerHTML}});
  }

  renderProfilePage(user: UserData) {
    this.router.navigate(['/account', user._id]);
  }
}

