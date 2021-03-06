import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToursService} from '../../../../services/tours.service';
import {DateHandlerService} from '../../../../services/date-handler.service';
import {Tour} from '../../../../interfaces/tour/tour.interface';
import {UserService} from '../../../../services/user.service';
import {FormGroup} from '@angular/forms';
import {OrderService} from '../../../../services/order.service';
import {EmailService} from '../../../../services/email.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  tourDateIndex = 0;
  amount = 1;
  load=false;

  constructor(private activatedRoute: ActivatedRoute,
              private toursService: ToursService,
              private dateService: DateHandlerService,
              private userService: UserService,
              private orderService: OrderService,
              private emailService: EmailService,
              private modalService: NgbModal,
              private router: Router) {
    this.id = activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.toursService.getOneTour(this.id).subscribe((data) => {
      this.tour = data;
      this.tour.dates = this.dateService.sortActualDates(this.tour.dates);
      this.user = this.userService.getUserData();
    } , (err) => {
      this.router.navigate(['/error404']);
    });
  }

  onBook (successModal) {
    this.errorMesage = '';

    const order = {
      tourDate: this.tour.dates[this.tourDateIndex],
      peopleNumber: this.amount,
      cost: this.tour.cost * this.amount,
      userId: this.user._id,
      tourId: this.id
    };

    this.load = true;
    this.orderService.createOrder(order).subscribe(order => {
      this.emailService.sendEmailBooked(this.user.email, this.tour, order.tourDate).subscribe(result => {
        this.load = false;
        this.modalService.open(successModal, { centered: true });
      });
    });
  }

  increaseAmount() {
    if (this.tour.bookedMax - this.tour.booked < this.amount + 1) {
      return;
    }
    this.amount++;
  }

  decreaseAmount() {
    if (this.amount == 1) {
      return;
    }
    this.amount--;
  }
}
