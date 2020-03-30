import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToursService} from '../../../../services/tours.service';
import {DateHandlerService} from '../../../../services/date-handler.service';
import {Tour} from '../../../../interfaces/tour/tour.interface';
import {UserService} from '../../../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../../services/order.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  id: string;
  tour: Tour;
  user;
  bookForm: FormGroup;
  errorMesage = '';

  constructor(private activatedRoute: ActivatedRoute,
              private toursService: ToursService,
              private dateService: DateHandlerService,
              private userService: UserService,
              private orderService: OrderService) {
    this.id = activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.toursService.getOneTour(this.id).subscribe((data) => {
      this.tour = data;
      this.tour.dates = this.dateService.sortActualDates(this.tour.dates);
      console.log(this.tour);
      this.user = this.userService.getUserData();
    });

    this.bookForm = new FormGroup({
      amount: new FormControl(1, [Validators.required, Validators.email]),
      dates: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  onBook () {
    this.errorMesage = '';
    if(!this.bookForm.value.dates){
      this.errorMesage = 'You should select tour date';
      return;
    }

    const order = {
      tourDate: this.tour.dates[this.bookForm.value.dates],
      peopleNumber: this.bookForm.value.amount,
      cost: this.tour.cost * this.bookForm.value.amount,
      userId: this.user._id,
      tourId: this.id
    };

    this.orderService.createOrder(order).subscribe(order => {
      console.log(order);
    });
  }
}
