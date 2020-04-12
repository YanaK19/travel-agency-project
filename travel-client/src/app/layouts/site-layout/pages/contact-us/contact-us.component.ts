import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRegister} from '../../../../interfaces/user/userRegister.interface';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  isError = false;

  constructor() { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobile: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required])
    });
  }

  sendMessage() {
    this.isError = false;

    if (this.contactForm.invalid) {
      this.isError = true;
      return;
    }

    const message = {
      firstName: this.contactForm.value.firstName,
      lastName: this.contactForm.value.lastName,
      email: this.contactForm.value.email,
      mobile: this.contactForm.value.mobile,
      message: this.contactForm.value.message
    };

    console.log(message)
  }
}
