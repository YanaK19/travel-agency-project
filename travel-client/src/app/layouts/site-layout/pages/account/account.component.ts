import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserData} from '../../../../interfaces/user/userData.interface';
import {ReviewService} from '../../../../services/review.service';
import {OrderService} from '../../../../services/order.service';
import {ToursService} from '../../../../services/tours.service';
import {Subscription} from 'rxjs';

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
  ordersData = [];
  orderedToursData = [];
  subscriptions: Subscription = new Subscription();
  orderedToursLeft = [];
  orderedToursRight = [];
  iter = 1;
  alreadySubscribed = false;
  image: any = '';
  isLoaded = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private reviewService: ReviewService,
              private  orderService: OrderService,
              private tourService: ToursService,
              private router: Router) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

    this.subscribtionsData = [];
    this.reviewsData = [];
  }

  ngOnInit() {
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
    /*  console.log(this.reviewsData);*/
    });

/*    if (this.isMyAccount) {*/
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
              if (this.iter % 2 === 0) {
                this.orderedToursLeft.push(tour);
              } else {
                this.orderedToursRight.push(tour);
              }
              this.iter++;
              if (orders.length == this.orderedToursLeft.length + this.orderedToursRight.length) {
                this.isLoaded = true;
              }
            });
          });
        } else {
          this.isLoaded = true;
        }
      });
  }

  toggle() {
    this.toggler = !this.toggler;
  }

  renderUserAccountPage(userAccount) {
    console.log(userAccount);
    this.router.navigate(['/account/' + userAccount._id]);
  }

  addAccountToMySubscriptions() {
    this.userService.addAccountToSubscriptions(this.userData._id).subscribe(updatedUser => {
      console.log(updatedUser)
    });
    this.alreadySubscribed = true;
  }

  deleteAccountFromMySubscriptions() {
    this.userService.deleteAccountFromSubscriptions(this.userData._id).subscribe(updatedUser => {
      console.log(updatedUser);
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
}
