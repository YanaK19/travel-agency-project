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
  orders: any = [];
  ordersAll = [];
  ordersExist = true;
  ordersNumber = 0;
  filter = false;
  deleteOrderId: string;
  deleteOrderI: number;
  @ViewChild('modal_1', { static: false}) modal_1: TemplateRef<any>;
  @ViewChild('vc', {read: ViewContainerRef, static: false}) vc: ViewContainerRef;
  @ViewChild('bd', { static: false}) bd: ElementRef;
  idInputValue = '';
  modalInfo: any = {};

  constructor(private orderService: OrderService,
              private tourService: ToursService,
              private userService: UserService,
              private modalService: NgbModal,
              private emailService: EmailService) { }

  ngOnInit() {
    this.orderService.getFullOrdersInfo().subscribe((orders) => {
      this.orders = orders;
      this.ordersAll = orders;
    })
  }

  onConfirm(orderId) {
    this.orderService.confirmOrder(orderId).subscribe(updatedOrder => {
    });

    const index = this.orders.findIndex(orderFull => orderFull.order._id == orderId);
    this.orders[index].order.confirmed = true;

    this.emailService.sendEmailOrderConfirmed(this.orders[index].user.email, this.orders[index].order, this.orders[index].tour).subscribe(result => {
    })
  }

  openDeleteModal(content, orderId, i) {
    this.deleteOrderId = orderId;
    this.deleteOrderI = i;
    this.modalService.open(content, { centered: true });
  }

  deleteOrder(modal) {
    this.orderService.deleteOrderById(this.deleteOrderId).subscribe(result => {
    });

    this.orders = this.orders.filter(orderFull => orderFull.order._id != this.deleteOrderId);
    modal.close('Cross click');
  }

  onFilterChange() {
    this.filter = !this.filter;

    if (this.filter) {
      this.orders = this.orders.filter(orderFull => !orderFull.order.confirmed);
      if (!this.orders.length) {
        this.ordersExist = false;
      }
    } else {
      this.orders = this.ordersAll;
      this.ordersExist = true;
    }
  }

  findOrderById(orderId) {
    let order = this.orders.find(orderFull => orderFull.order._id === orderId);
    if(order) {
      this.orders = [ order ];
    } else {
     this.ordersExist = false;
    }
  }

  resetFilter() {
    this.orders = this.ordersAll;
    this.ordersExist = true;
    this.idInputValue = '';
  }
}



