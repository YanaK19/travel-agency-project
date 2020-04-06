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
  toggler = true;
  isMyAccount = false;
  subscribtionsData = [];
  reviewsData = [];
  ordersData: any = [];
  orderedToursData = [];
  subscriptions: Subscription = new Subscription();
  orderedToursLeft = [];
  orderedToursRight = [];
  favouriteTours = [];
  iter = 1;
  alreadySubscribed = false;
  image: any = '';
  isLoaded = false;
  reviewTourId = '';
  componentName = 'account';
  reviewForm: FormGroup;

  visitedTourOrders = [];
  visitedTours = [];

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
    this.reviewForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      info: new FormControl(null, [Validators.required])
    });

    this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      const user = this.userService.getUserData();

      if (user._id == params.id) {
        this.isMyAccount = true;
        this.userData = user;
        console.log('my account', this.isMyAccount);
        this.loadPageData();
      } else {
        this.userService.getUserById(params.id).subscribe((data => {
          this.userData = data;
          console.log('not my account');
          this.isMyAccount = false;

          user.subscriptions.forEach(subscription => {
            if (subscription == this.userData._id) {
              this.alreadySubscribed = true;
            }
          });

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
        console.log(this.subscribtionsData);
      }));
    });

    this.reviewService.getReviewsByUserId(this.userData._id).subscribe(reviews => {
      this.reviewsData = reviews;
    });

      this.orderService.getOrdersByUserId(this.userData._id).subscribe(orders => {
        this.ordersData = orders;

        this.orderedToursData= [];
        this.orderedToursLeft= [];
        this.orderedToursRight= [];
        this.iter = 1;

        if (orders.length) {
          orders.forEach(order => {
            this.tourService.getOneTour(order.tourId).subscribe(tour => {
              this.orderedToursData.push(tour);
              if (orders.length == this.orderedToursData.length) {
                this.isLoaded = true;

                const today = new Date();
                const currDate: TourDate = {
                  day: today.getDate(),
                  month: today.getMonth() + 1,
                  year: today.getFullYear()
                };

                //orders of tours, that user has already visited, sort by tourDate
                this.visitedTourOrders = this.ordersData.filter(order =>
                  this.dateService.compareDates(order.tourDate.dateFrom, currDate) == -1 && order.confirmed
                ).sort((a, b) => -this.dateService.compareDates(a.tourDate.dateFrom, currDate));

                //sorted tours ids that user has already visited
                const visitedToursIds = this.visitedTourOrders.map(order => order.tourId);

                //find tours by sorted ids
                visitedToursIds.forEach((tourId, i) => {
                  let tour = this.orderedToursData.find(tour => tour._id === tourId);
                  this.visitedTours.push(tour);
                  if (i % 2 === 0) {
                    this.orderedToursLeft.push({tour, orderIndex: i});
                  } else {
                    this.orderedToursRight.push({tour, orderIndex: i});
                  }
                });
              }
            });
          });
        } else {
          this.isLoaded = true;
        }
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
        this.userData = updatedUser;
        localStorage.setItem('userData', JSON.stringify(updatedUser));
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
    this.modalService.open(content, { centered: true });
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
      console.log(newReview);
      setTimeout(() => this.modalService.dismissAll(), 2000);
    });
  }

  renderTourPage(tourId: string) {
    this.router.navigate(['/one-tour', tourId]);
  }
}
