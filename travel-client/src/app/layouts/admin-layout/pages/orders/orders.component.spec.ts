import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {OrdersComponent} from './orders.component';
import {OrderService} from '../../../../services/order.service';
import {RegisterComponent} from '../../../site-layout/pages/register/register.component';
import {LangService} from '../../../../services/lang.service';
import {EMPTY, of} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Order} from '../../../../interfaces/order/order.interface';

describe('OrdersComponent', () => {
  let ordersComponent: OrdersComponent;
  let ordersFixture: ComponentFixture<OrdersComponent>;
  let orderService: OrderService;
  const orders = [{
    date:{
      day: 30,
      month: 3,
      year: 2020
    },
    tourDate:{
      dateFrom: {day: 10, month: 5, year: 2020},
      dateTo: {day: 11, month: 5, year: 2020}
    },
    _id: "5e81963f8bcbea294039bac6",
    userId: "5e615a17e582c82864111ca1",
    tourId: "5e6f5081bf9aba08acf6c160",
    cost: 980,
    peopleNumber: 2,
    confirmed: false
  }, {
    date: {
      day: 30,
      month: 3,
      year: 2020
    },
    tourDate:
      {
        dateFrom: {day: 5, month: 6, year: 2020},
        dateTo: {day: 9, month: 6, year: 2020}
      },
    _id: "5e8197ae8bcbea294039bacc",
    userId: "5e615a17e582c82864111ca1",
    tourId: "5e6f862669d8452c184c9642",
    cost: 1240,
    peopleNumber: 2,
    confirmed: false
  }, {
    date: {
      day: 30,
      month: 3,
      year: 2020
    },
    tourDate:
      {
        dateFrom: {day: 5, month: 6, year: 2020},
        dateTo: {day: 9, month: 6, year: 2020}
      },
    _id: "5e677ac4aa4d3916e088c830",
    userId: "5e615a17e582c82864111ca1",
    tourId: "5e6f8dcd4f9766291cef6d84",
    cost: 1240,
    peopleNumber: 2,
    confirmed: true
  }];

  const users = [
    {_id: "5e615a17e582c82864111ca1"}
  ];

  const tours = [
    {_id: "5e6f8dcd4f9766291cef6d84"},
    {_id: "5e6f5081bf9aba08acf6c160"},
    {_id: "5e6f862669d8452c184c9642"}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersComponent ],
      imports: [TranslateModule.forRoot({loader: {provide: TranslateLoader, useValue: {}}}), HttpClientTestingModule, RouterTestingModule.withRoutes([]), RouterModule.forRoot([])],
      providers: [TranslateService, TranslateStore, OrderService, NgbModal],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    ordersFixture = TestBed.createComponent(OrdersComponent);
    ordersComponent = ordersFixture.componentInstance;
    ordersComponent.orders = orders;
    ordersComponent.users = users;
    ordersComponent.tours = tours;
    orderService = TestBed.get(OrderService);
  });

  it('should set confirmed: true onConfirm', () => {
    spyOn(orderService, 'confirmOrder').and.callFake(() => EMPTY);

    ordersComponent.onConfirm(ordersComponent.orders[1]._id);
    expect(ordersComponent.orders[0].confirmed).toBeFalsy();
    expect(ordersComponent.orders[1].confirmed).toBeTruthy();

    ordersComponent.onConfirm( ordersComponent.orders[0]._id);
    expect(ordersComponent.orders[0].confirmed).toBeTruthy();
    expect(ordersComponent.orders[1].confirmed).toBeTruthy();
  });

  it('should delete order', () => {
    const modalService = TestBed.get(NgbModal);
    spyOn(modalService, 'open').and.callFake(() => {});

    expect(ordersComponent.deleteOrderId).toEqual(undefined);
    ordersComponent.openDeleteModal('content', orders[0]._id, 0);
    expect(ordersComponent.deleteOrderId).toEqual(orders[0]._id);
    expect(ordersComponent.deleteOrderI).toBe(0);

    spyOn(orderService, 'deleteOrderById').and.callFake(() => EMPTY);
    let ordersNum: number = orders.length;
    ordersComponent.ordersNumber = ordersNum;

    const fakeModal = {
      close(str: string) {}
    };
    ordersComponent.deleteOrder(fakeModal);
    expect(ordersComponent.ordersNumber).toBe(ordersNum - 1);
    expect(ordersComponent.orders.length).toBe(ordersNum - 1);
  });

/*  it('should show only unconfirmed orders if filter=true', () => {
    expect(ordersComponent.filter).toBeFalsy();
    expect(ordersComponent.ordersAll).toEqual([]);

    ordersComponent.onFilterChange();
    console.log(ordersComponent.filter);
    expect(ordersComponent.filter).toBeTruthy();
    expect(ordersComponent.ordersExist).toBeTruthy();
    expect(ordersComponent.orders.length).toEqual(2);
    expect(ordersComponent.ordersAll).toEqual(orders);
  });*/

  it('should show message orders not exist', () => {
    ordersComponent.orders = [];
    ordersComponent.onFilterChange();

    expect(ordersComponent.filter).toBeTruthy();
    expect(ordersComponent.ordersExist).toBeFalsy()
  });

  it('should show all orders', () => {
    ordersComponent.onFilterChange();
    ordersComponent.onFilterChange();

    expect(ordersComponent.filter).toBeFalsy();
    expect(ordersComponent.ordersExist).toBeTruthy();
    expect(ordersComponent.orders.length).toEqual(orders.length);
  });

  it('should find orderById', () => {
    const orderIndex = 1;

    ordersComponent.ordersNumber = orders.length;
    ordersComponent.findOrderById(orders[orderIndex]._id);
    spyOn(orderService, 'getOrderById').and.callFake(() => of(orders[orderIndex]));

    ordersComponent.findOrderById(orders[1]._id);
    expect(ordersComponent.orders.length).toBe(1);
    expect(ordersComponent.orders[0]).toEqual(orders[orderIndex]);
  });

  it('should show all orders if id is empty string', () => {
    const orderIndex = 1;
    ordersComponent.ordersNumber = orders.length;
    spyOn(orderService, 'getOrderById').and.callFake(() => of(orders[orderIndex]));
    ordersComponent.findOrderById('');
    expect(ordersComponent.orders.length).toBe(orders.length);
    expect(ordersComponent.ordersExist).toBeTruthy();
  });

  it('should establishRelationOrdersTours', () => {
    const expextedToursOrder = [
      {_id: "5e6f5081bf9aba08acf6c160"},
      {_id: "5e6f862669d8452c184c9642"},
      {_id: "5e6f8dcd4f9766291cef6d84"},
    ];

    ordersComponent.unorderedTours = tours;
    ordersComponent.tours = [];

    ordersComponent.establishRelationOrdersTours();
    expect(ordersComponent.tours).toEqual(expextedToursOrder);
  });

  it('should establishRelationOrdersUsers', () => {
    const expextedUsersOrder = [
      {_id: "5e615a17e582c82864111ca1"},
      {_id: "5e615a17e582c82864111ca1"},
      {_id: "5e615a17e582c82864111ca1"}
    ];

    ordersComponent.unorderedUsers = users;
    ordersComponent.users = [];

    ordersComponent.establishRelationOrdersUsers();
    expect(ordersComponent.users).toEqual(expextedUsersOrder);
  });
});
