import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailService} from '../../../../services/email.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  isError = false;

  constructor(private emailService: EmailService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobile: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required])
    });
  }

  sendMessage(successModal) {
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

    this.emailService.sendUserMessage(message).subscribe(() => {
      this.contactForm.reset();
      this.modalService.open(successModal, { centered: true });
    })
  }
}
