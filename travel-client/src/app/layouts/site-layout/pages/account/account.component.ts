import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserData} from '../../../../interfaces/user/userData.interface';
import {ReviewService} from '../../../../services/review.service';
import {OrderService} from '../../../../services/order.service';
import {ToursService} from '../../../../services/tours.service';
import {Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateHandlerService} from '../../../../services/date-handler.service';
import {TourDate} from '../../../../interfaces/tour/tourDate.interface';

@Component({
  selector: 'app-account-page',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  userData: any;
  updatedUserData: any;
  toggler = true;
  isMyAccount = false;
  isILoggedIn = false;
  subscribtionsData = [];
  reviewsData = [];
  ordersData: any = [];
  subscriptions: Subscription = new Subscription();
  favouriteTours = [];
  alreadySubscribed = false;
  image: any = '';
  isLoaded = false;
  reviewTourId = '';
  componentName = 'account';
  reviewForm: FormGroup;
  load = false;

  visitedTourOrders = [];
  visitedTourOrdersLeft = [];
  visitedTourOrdersRight = [];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private reviewService: ReviewService,
              private orderService: OrderService,
              private tourService: ToursService,
              private router: Router,
              private modalService: NgbModal,
              private dateService: DateHandlerService) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

    this.subscribtionsData = [];
    this.reviewsData = [];
    this.favouriteTours = [];
  }

  ngOnInit() {
    this.isLoaded = false;
    this.reviewForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      info: new FormControl(null, [Validators.required])
    });

    this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      const user = this.userService.getUserData();

      if(user) {
        this.isILoggedIn = true;
      }

      if (user && user._id == params.id) {
        this.isMyAccount = true;
        this.userData = user;
        this.loadPageData();
      } else {
        this.userService.getUserById(params.id).subscribe((data => {
          this.userData = data;
          this.isMyAccount = false;

          if(this.isILoggedIn) {
            user.subscriptions.forEach(subscription => {
              if (subscription == this.userData._id) {
                this.alreadySubscribed = true;
              }
            });
          }

          this.loadPageData();
        }));
      }
    }));
  }

  loadPageData() {
    this.subscribtionsData = [];
    this.userData.subscriptions.forEach((userId) => {
      this.userService.getUserById(userId).subscribe((data => {
        this.subscribtionsData.push(data);
      }));
    });

    this.reviewService.getReviewsByUserId(this.userData._id).subscribe(reviews => {
      this.reviewsData = reviews;
    });

      this.orderService.getOrderTourByUserId(this.userData._id).subscribe(orders => {
        this.ordersData = orders;

        this.visitedTourOrdersLeft= [];
        this.visitedTourOrdersRight= [];

        if (orders.length) {
          const today = new Date();
          const currDate: TourDate = {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear()
          };

          this.visitedTourOrders = this.ordersData.filter(orderTour =>
            this.dateService.compareDates(orderTour.order.tourDate.dateFrom, currDate) == -1 && orderTour.order.confirmed
          ).sort((a, b) => -this.dateService.compareDates(a.order.tourDate.dateFrom, currDate));

          this.visitedTourOrders.forEach((orderTour, i) => {
            if(i % 2 === 0) {
              this.visitedTourOrdersLeft.push(orderTour);
            } else {
              this.visitedTourOrdersRight.push(orderTour);
            }
          });
        }
          this.isLoaded = true;
      });

      if (this.userData.favouriteTourIds.length) {
        this.favouriteTours = [];
        this.userData.favouriteTourIds.forEach(tourId => {
          this.tourService.getOneTour(tourId).subscribe(tour => {
            this.favouriteTours.push(tour);
          })
        })
      }
  }

  toggle() {
    this.toggler = !this.toggler;
  }

  renderUserAccountPage(userAccount) {
    this.router.navigate(['/account/' + userAccount._id]);
  }

  addAccountToMySubscriptions() {
    this.userService.addAccountToSubscriptions(this.userData._id).subscribe(updatedUser => {
    });
    this.alreadySubscribed = true;
  }

  deleteAccountFromMySubscriptions() {
    this.userService.deleteAccountFromSubscriptions(this.userData._id).subscribe(updatedUser => {
      this.alreadySubscribed = false;
    });
  }

  onFileUpload(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;

      this.userService.uploadAvatar(file).subscribe(updatedUser => {
        this.userData = updatedUser.user;
        localStorage.setItem('userData', JSON.stringify(updatedUser.user));
      });

      const reader = new FileReader();

      reader.onload = () => {
        this.image = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  openReviewModal(content) {
    this.reviewTourId = '';
    this.modalService.open(content, { centered: true });
  }

  showFields(tourId) {
    this.reviewTourId = tourId;
  }

  openEditProfileModal(content) {
    this.updatedUserData = {
      name: this.userData.name,
      location: {
        country: this.userData.location.country,
        town: this.userData.location.town
      },
      languages: this.userData.languages.slice(),
      about: this.userData.about,
      telephone: this.userData.telephone,
      email: this.userData.email
    };

    this.modalService.open(content, { centered: true });
  }

  addLang(lang) {
    if (lang.trim().length < 4) {
      return;
    }
    this.updatedUserData.languages.push(lang);
  }

  deleteLang(index) {
    this.updatedUserData.languages.splice(index, 1);
  }

  createReview(msgModal) {
    const review = {
      title: this.reviewForm.value.title,
      info: this.reviewForm.value.info,
      userId: this.userData._id,
      tourId: this.reviewTourId
    };

    this.modalService.dismissAll();
    this.modalService.open(msgModal, { centered: true });

    this.reviewService.createReview(review).subscribe(newReview => {
      setTimeout(() => this.modalService.dismissAll(), 2000);
    });
  }

  renderTourPage(tourId: string) {
    this.router.navigate(['/one-tour', tourId]);
  }

  updateUser(modal) {
    this.load = true;
    this.userService.updateUserProfileInfo(this.updatedUserData).subscribe(user => {
      this.userData = user;
      modal.close('Cross click');
      this.load = false;
    })
  }
}
