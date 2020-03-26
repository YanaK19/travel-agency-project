import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToursService} from '../../../../services/tours.service';
import {DateHandlerService} from '../../../../services/date-handler.service';
import {Tour} from '../../../../interfaces/tour/tour.interface';
import {UserService} from '../../../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  price;
  amount=1;

  constructor(private activatedRoute: ActivatedRoute,
              private toursService: ToursService,
              private dateService: DateHandlerService,
              private userService: UserService) {
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
      amount: new FormControl(null, [Validators.required, Validators.email]),
      dates: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  onBook () {

  }

}
