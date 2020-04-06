import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ToursService} from '../../../../services/tours.service';
import {UserService} from '../../../../services/user.service';
import {EMPTY, of} from 'rxjs';
import {RegisterComponent} from '../register/register.component';
import {OrderService} from '../../../../services/order.service';

describe('BookComponent', () => {
  let bookComponent: BookComponent;
  let tourService: ToursService;
  let userService: UserService;
  let orderService: OrderService;
  let fixture: ComponentFixture<BookComponent>;

  const tour = {
    _id: '123',
    title: 'Tour Title',
    restType: ['cruise'],
    transportType: 'car',
    cost: 1000,
    route: {fromCountry: 'Belarus', fromTown: 'Minsk', toCountry: 'Russia', toTown: 'Moskow'},
    moreInfo: 'Info',
    images: [],
    dates: [{
      dateFrom: {
        day: 10,
        month: 5,
        year: 2019
      },
      dateTo:{
        day: 11,
        month: 5,
        year: 2019
        },
      _id: "5e6f5081bf9aba08acf6c161"
    },{
      dateFrom:{
        day: 22,
        month: 6,
        year: 2021},
      dateTo:{
        day: 23,
        month: 6,
        year: 2021,
        _id: "5e6f5081bf9aba08acf6c162"
      }
    }, {
      dateFrom:{
        day: 3,
        month: 7,
        year: 2020
      },
      dateTo:{
        day: 4,
        month: 7,
        year: 2020,
        _id: "5e6f5081bf9aba08acf6c165"
      }
    }],
    discount: 10,
    bookedMax: 100,
    booked: 11,
    views: 102020
  };

  const user = {_id: "5e615a17e582c82864111ca1"};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      imports: [TranslateModule.forRoot({loader: {provide: TranslateLoader, useValue: {}}}), HttpClientTestingModule, RouterTestingModule.withRoutes([]), RouterModule.forRoot([])],
      providers: [TranslateService, TranslateStore, ToursService, UserService, OrderService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    bookComponent = fixture.componentInstance;
    tourService = TestBed.get(ToursService);
    userService = TestBed.get(UserService);
    orderService = TestBed.get(OrderService);
    spyOn(tourService, 'getOneTour').and.returnValue(of(tour));
    spyOn(userService, 'getUserData').and.returnValue(user);
  });

  it('should initilize component', () => {
    expect(bookComponent.tour).toBe(undefined);

    bookComponent.ngOnInit();
    fixture.detectChanges();
    expect(bookComponent.tour).toBe(tour);
    expect(bookComponent.user).toBe(user);
    expect(bookComponent.tour.dates.length).toBe(2);
    const form = bookComponent.bookForm;
    expect(form.valid).toBeFalsy();
    expect(form.controls.amount.errors.required).toBeFalsy();
    expect(form.controls.dates.errors.required).toBeTruthy();
  });

  it('onBook', () => {
    expect(bookComponent.tour).toBe(undefined);
    spyOn(orderService, 'createOrder').and.callFake(() => EMPTY);

    bookComponent.ngOnInit();
    fixture.detectChanges();

    expect(bookComponent.errorMesage).toEqual('');
    bookComponent.onBook();
    expect(bookComponent.errorMesage).toEqual('You should select tour date');

    bookComponent.bookForm.controls.dates.setValue('11/11/1111 12/11/1111');
    bookComponent.onBook();
    expect(bookComponent.errorMesage).toEqual('');
  });
});
