import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {OrdersComponent} from '../../../admin-layout/pages/orders/orders.component';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule} from '@angular/router';
import {OrderService} from '../../../../services/order.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('LoginPageComponent', () => {
  let loginComponent: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [TranslateModule.forRoot({loader: {provide: TranslateLoader, useValue: {}}}), HttpClientTestingModule, RouterTestingModule.withRoutes([]), RouterModule.forRoot([])],
      providers: [TranslateService, TranslateStore],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    loginComponent = TestBed.createComponent(LoginComponent).componentInstance;

  });

  it('onSubmit', () => {
/*
    loginComponent.ngOnInit();
    loginComponent.loginForm.value.email = 'test@mail.ru';
    loginComponent.loginForm.value.password = '1234';
*/


  })
});
