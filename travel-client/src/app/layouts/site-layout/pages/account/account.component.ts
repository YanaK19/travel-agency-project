import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute, Params} from '@angular/router';
import {UserData} from '../../../../interfaces/user/userData.interface';
import {ReviewService} from '../../../../services/review.service';
import {OrderService} from '../../../../services/order.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
   userData: any;
   toggler = true;
  isMyAccount = false;
  subscribtionsData = [];
  reviewsData = [];
  ordersData = [];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private reviewService: ReviewService,
              private  orderService: OrderService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const user = this.userService.getUserData();

      if (user._id === params.id) {
        this.isMyAccount = true;
        this.userData = user;
        console.log('my account');
        this.loadPageData();
      } else {
        this.userService.getUserById(params.id).subscribe((data => {
          this.userData = data;
          console.log('not my account');
          this.loadPageData();
        }));
      }
    });
  }

  loadPageData() {
    console.log(this.userData);

    this.userData.subscriptions.forEach((userId) => {
      this.userService.getUserById(userId).subscribe((data => {
        this.subscribtionsData.push(data);
/*        console.log(this.subscribtionsData);*/
      }));
    });

    this.reviewService.getReviewsByUserId(this.userData._id).subscribe(reviews => {
      this.reviewsData = reviews;
      console.log(this.reviewsData);
    });

    if (this.isMyAccount) {
      this.orderService.getOrdersByUserId(this.userData._id).subscribe(orders => {
        this.ordersData = orders;
        console.log(this.ordersData);
      });
    }
  }

  toggle() {
    this.toggler = !this.toggler;
  }
}
