import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {OrderService} from '../../../../services/order.service';
import {ToursService} from '../../../../services/tours.service';
import {UserService} from '../../../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Order} from '../../../../interfaces/order/order.interface';
import {RangeService} from '../../../../services/range.service';
import {EmailService} from '../../../../services/email.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders = [];
  ordersExist = true;
  ordersAll = [];
  ordersNumber = 0;
  unorderedTours = [];
  unorderedUsers = [];
  tours = [];
  toursAll = [];
  users = [];
  usersAll = [];
  filter = false;
  deleteOrderId: string;
  deleteOrderI: number;
  @ViewChild('modal_1', { static: false}) modal_1: TemplateRef<any>;
  @ViewChild('vc', {read: ViewContainerRef, static: false}) vc: ViewContainerRef;
  @ViewChild('bd', { static: false}) bd: ElementRef;
  modalInfo: any = {};

  constructor(private orderService: OrderService,
              private tourService: ToursService,
              private userService: UserService,
              private modalService: NgbModal,
              private rangeService: RangeService,
              private emailService: EmailService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders) => {
        this.ordersNumber = orders.length;
        this.orders = orders;
      console.log(this.orders);
      orders.forEach(order => {
        this.tourService.getOneTour(order.tourId).subscribe(tour => {
          this.unorderedTours.push(tour);

          if(this.orders.length == this.unorderedTours.length) {
            this.establishRelationOrdersTours();
          }
        });

        this.userService.getUserById(order.userId).subscribe(user => {
          this.unorderedUsers.push(user);

          if(this.orders.length == this.unorderedUsers.length) {
            this.establishRelationOrdersUsers();
          }
        });
      });
    });
  }

  establishRelationOrdersTours() {
     this.orders.forEach(order => {
       this.tours.push(this.unorderedTours.find(tour => tour._id == order.tourId));
     });
  }

  establishRelationOrdersUsers() {
    console.log(this.unorderedUsers)
    this.orders.forEach(order => {
      this.users.push(this.unorderedUsers.find(user => user._id == order.userId));
    });
  }

  onConfirm(orderId) {
/*    this.orderService.confirmOrder(orderId).subscribe(updatedOrder => {
    });

    const index = this.orders.findIndex(order => order._id == orderId);
    this.orders[index].confirmed = true;*/

    this.emailService.sendOrderConfirmedEmail("123").subscribe(data => {
      console.log(data)
    })
  }

  openDeleteModal(content, orderId, i) {
    this.deleteOrderId = orderId;
    this.deleteOrderI = i;
    this.modalService.open(content, { centered: true });
  }

  deleteOrder(modal) {
    this.orderService.deleteOrderById(this.deleteOrderId).subscribe(result => {
      console.log(result);
    });
    this.ordersNumber--;
    this.tours = this.tours.filter((tour, index) => index != this.deleteOrderI);
    this.users = this.users.filter((user, index) => index != this.deleteOrderI);
    this.orders = this.orders.filter(order => order._id != this.deleteOrderId);

    modal.close('Cross click');
  }

  onFilterChange(eve: any) {
    this.filter = !this.filter;

    if (this.filter) {
      this.ordersAll = this.orders;
      this.orders = this.orders.filter(order => !order.confirmed);

      if (!this.orders.length) {
        this.ordersExist = false;
      }
      console.log(this.orders)
    } else {
      this.orders = this.ordersAll;
      this.ordersAll = [];
      this.ordersExist = true;
    }
  }

  findOrderById(orderId) {
    if (!orderId) {
      if (this.ordersAll.length) {
        this.ordersExist = true;
        this.orders = this.ordersAll;
        this.tours = this.toursAll;
        this.users = this.usersAll;
        this.ordersAll = [];
      }
      return;
    }

    if (this.orders.length == this.ordersNumber) {
      this.ordersAll = this.orders;
      this.toursAll = this.tours;
      this.usersAll = this.users;
    }

    this.orderService.getOrderById(orderId).subscribe(order => {
      this.orders = [ order ];
      this.users = [ this.usersAll.find(user => user._id == order.userId) ];
      this.tours = [ this.toursAll.find(tour => tour._id == order.tourId) ];
      this.ordersExist = true;
    }, (err) => {
      this.ordersExist = false;
      console.log('error');
    });
  }
}



