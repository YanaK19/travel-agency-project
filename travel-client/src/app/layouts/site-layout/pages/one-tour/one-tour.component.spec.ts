import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OneTourComponent} from './one-tour.component';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {Tour} from '../../../../interfaces/tour/tour.interface';
import { By } from '@angular/platform-browser';
import {PlaneLoaderComponent} from '../../../../plane-loader/plane-loader.component';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, RouterModule} from '@angular/router';
import {OrderService} from '../../../../services/order.service';
import {UserLocation} from '../../../../interfaces/user/userLocation.interface';
import {ToursService} from '../../../../services/tours.service';
import {EMPTY, of} from 'rxjs';
import {DateHandlerService} from '../../../../services/date-handler.service';
import {ReviewService} from '../../../../services/review.service';
import {UserService} from '../../../../services/user.service';

describe('OneTourComponent (tour binding)', () => {
  let comp: OneTourComponent;
  let expectedTour: Tour;
  let fixture: ComponentFixture<OneTourComponent>;
  let tourDe: DebugElement;
  let tourEl: HTMLElement;

  function setupComponent() {
    fixture = TestBed.createComponent(OneTourComponent);
    comp = fixture.componentInstance;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OneTourComponent, PlaneLoaderComponent ],
      imports: [TranslateModule.forRoot({loader: {provide: TranslateLoader, useValue: {}}}), HttpClientTestingModule, RouterTestingModule.withRoutes([]), RouterModule.forRoot([])],
      providers: [TranslateService, TranslateStore],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  it('should display tour', async() => {
    setupComponent();
    fixture.autoDetectChanges();

    comp.tour = {
      _id: '123',
      title: 'Tour Title',
      restType: ['cruise'],
      transportType: 'car',
      cost: 1000,
      route: {fromCountry: 'Belarus', fromTown: 'Minsk', toCountry: 'Russia', toTown: 'Moskow'},
      moreInfo: 'Info',
      images: [],
      dates: [],
      discount: 10,
      bookedMax: 100,
      booked: 11,
      views: 102020
    };
    comp.reviews = [];

    fixture.detectChanges();
    await fixture.whenStable();

    tourDe = fixture.debugElement.query(By.css('.tour-title_inner'));
    tourEl = tourDe.nativeElement;
    const expectedTitle = comp.tour.title;
    expect(tourEl.textContent).toContain(expectedTitle);
  });
});

describe('OneTourComponent (account routing)', () => {
  let router: Router;
  let tourComponent: OneTourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OneTourComponent, PlaneLoaderComponent ],
      imports: [TranslateModule.forRoot({loader: {provide: TranslateLoader, useValue: {}}}), HttpClientTestingModule, RouterTestingModule.withRoutes([]), RouterModule.forRoot([])],
      providers: [TranslateService, TranslateStore],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    router = TestBed.get(Router);
    tourComponent = TestBed.createComponent(OneTourComponent).componentInstance;
  });

  it('navigate to account', async() => {
    let routerSpy = spyOn(router, 'navigate');
    const expectedUrl = '/account/5e615a17e582c82864111ca1';

    tourComponent.renderProfilePage({
      _id: "5e615a17e582c82864111ca1",
      name: "Test",
      email: "test@mail.ru",
      telephone: "123",
      role: "customer"
    });

    expect(routerSpy.calls.first().args[0].join('/')).toBe(expectedUrl);
  });
});

describe('OneTourComponent', () => {
  let tourComponent: OneTourComponent;
  let toursService: ToursService;
  let reviewService: ReviewService;
  let userService: UserService;

  const tour: Tour = {
    _id: "5e6f8dcd4f9766291cef6d84",
    title: "Test",
    route: {
      fromCountry: "",
      fromTown: "",
      toCountry: "",
      toTown: ""
    },
    restType: [],
    transportType: "",
    moreInfo: "",
    images: [],
    discount: null,
    cost: 0,
    dates: [],
    bookedMax: 0,
    booked: 0,
    views: 0
  };

  const reviews = [{
    date: {day: 1, month: 3, year: 2020},
    _id: "5e5e98ed4440fc1dc42f9f6f",
    title: "Amazing tour of Tokyo!",
    info: "Very educational tour of the city and surrounding shrines and temples! Highly recommend this tour as a great introduction to Tokyo!",
    img: "https://images.unsplash.com/photo-1535949134169-aa64c1a54f86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1046&q=80",
    confirmed: true,
    userId: "5e615749e582c82864111ca0",
    tourId: "5e6f4d96bf9aba08acf6c15d",
  }, {
    date: {day: 15, month: 1, year: 2019},
    _id: "5e5eaff2bd8abd1aec43c32f",
    title: "Great Experience",
    info: "The tour started on time and we had a great tour guide. Levin and he had a trainee, Angela. I recommend this tour as you stop at places that are must see. Shrines and temples and we even had pictures with geishas. It ended in a boat ride across the lake where we saw the Olympic rings. Levin spoke English, was very knowledgeable and answered all the questions. He seemed to know Japan even though he was from the Philippines. He also had a good sense of humor. Overall, very satisfied. Thank you Levin and Angela for the experience.",
    img: "https://images.unsplash.com/photo-1501560379-05951a742668?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    confirmed: true,
    userId: "5e615a17e582c82864111ca1",
    tourId: "5e6f4d96bf9aba08acf6c15d"
  }
];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OneTourComponent, PlaneLoaderComponent ],
      imports: [TranslateModule.forRoot({loader: {provide: TranslateLoader, useValue: {}}}), HttpClientTestingModule, RouterTestingModule.withRoutes([]), RouterModule.forRoot([])],
      providers: [TranslateService, TranslateStore, ToursService, DateHandlerService, ReviewService, UserService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    tourComponent = TestBed.createComponent(OneTourComponent).componentInstance;
    toursService = TestBed.get(ToursService);
    reviewService = TestBed.get(ReviewService);
    userService = TestBed.get(UserService);
  });

  it('ngOnInit', () => {
    spyOn(toursService, 'getOneTour').and.returnValue(of(tour));
    spyOn(reviewService, 'getReviewsByTourId').and.returnValue(of(reviews));
    spyOn(userService, 'getUserById').and.callFake(() => EMPTY);

    tourComponent.ngOnInit();
    expect(tourComponent.reviews.length).toBe(reviews.length);
    expect(tourComponent.tour).toEqual(tour);
  });
});

