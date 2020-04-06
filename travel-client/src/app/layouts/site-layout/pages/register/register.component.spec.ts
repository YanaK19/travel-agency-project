import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('RegisterComponent(validate form)', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ReactiveFormsModule, TranslateModule.forRoot({loader: {provide: TranslateLoader, useValue: {}}}), HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [TranslateService, TranslateStore],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  function setInputValue(control, value) {
    control.setValue(value);
    return control;
  }

  it('should create RegisterComponent instance', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const emailInput = compiled.querySelector('#emailField');
    const passwordInput = compiled.querySelector('#passwordField');
    const nickname = compiled.querySelector('#nicknameField');
    const tel = compiled.querySelector('#telField');

    expect(emailInput).toBeTruthy('there is no email input in DOM');
    expect(passwordInput).toBeTruthy();
    expect(nickname).toBeTruthy();
    expect(tel).toBeTruthy();
  });

  it('should test form validity', () => {
    const form = component.registerForm;
    expect(form.valid).toBeFalsy();

    expect(setInputValue(form.controls.email, 'admin@mail.ru').valid).toBeTruthy();
    expect(setInputValue(form.controls.email, '123').valid).toBeFalsy();

    expect(setInputValue(form.controls.password, '12345').valid).toBeTruthy();
    expect(setInputValue(form.controls.password, '123').valid).toBeFalsy();
    expect(setInputValue(form.controls.password, '').valid).toBeFalsy();

    expect(setInputValue(form.controls.nickname, 'Nico').valid).toBeTruthy();
    expect(setInputValue(form.controls.nickname, 'Ni').valid).toBeTruthy();
    expect(setInputValue(form.controls.nickname, 'N').valid).toBeFalsy();
    expect(setInputValue(form.controls.nickname, '').valid).toBeFalsy();

    expect(setInputValue(form.controls.tel, '+375332456123').valid).toBeTruthy();
    expect(setInputValue(form.controls.tel, '').valid).toBeFalsy();
  });

  it('should test input errors', () => {
    const form = component.registerForm;
    expect(component.registerForm.controls.email.errors.required).toBeTruthy();
    setInputValue(form.controls.nickname, 'N');
    const a: any = component.registerForm.controls.nickname;
    expect(component.registerForm.controls.nickname.errors.minlength).toBeTruthy();

    expect(component.registerForm.controls.password.errors.required).toBeTruthy();
    expect(component.registerForm.controls.nickname.errors.required).toBeFalsy();
    expect(component.registerForm.controls.tel.errors.required).toBeTruthy();
  });
});


