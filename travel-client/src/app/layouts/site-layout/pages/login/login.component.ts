import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../../services/authorization.service';
import {UserLogin} from '../../../../interfaces/user/userLogin.interface';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ErrorHandlerService} from '../../../../services/error-handler.service';
import {EmailService} from '../../../../services/email.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  resultMessage: any = null;
  loginForm: FormGroup;
  subscription: Subscription;
  errorMessage = "";
  encryptedEmail = "";
  errorResetPasswordMessage = "";
  errorEmail = "";

  @ViewChild('modalPassword', { static: false}) modalPassword: TemplateRef<any>;

  constructor(private auth: AuthorizationService,
              private router: Router,
              private route: ActivatedRoute,
              private errorHandler: ErrorHandlerService,
              private emailService: EmailService,
              private modalService: NgbModal,
              private userService: UserService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.email) {
        this.encryptedEmail = params.email;
        this.modalService.open(this.modalPassword, { centered: true });
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    this.loginForm.disable();

    const user: UserLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.subscription = this.auth.login(user).subscribe(
      (res) => {
          // res={role:..id..email..name..telephone..}
          if (res.role === 'admin') {
            return this.router.navigate(['/admin']);
          } else {
            return this.router.navigate(['/home']);
          }
        },
      (err) => {
        this.loginForm.enable();
        console.log('err', err.error);
        this.errorMessage = err.error.message;
      }
    );
  }

  onForgotPassword(modalInputEmail) {
    this.modalService.open(modalInputEmail, { centered: true });
  }

  onResetPassword(email, modal, modalCheckEmail) {
    this.errorEmail = "";
    this.userService.checkUserByEmail(email).subscribe(() => {
      this.emailService.sendEmailResetPassword(email).subscribe(result => {
        modal.close('Cross click');
        this.modalService.open(modalCheckEmail, { centered: true });
      })
    }, err => {
      this.errorEmail = "No registered user with such email!";
    });
  }

  resetUserPasswordInDB(modal, newPassword: string) {
    if (!newPassword) {
      this.errorResetPasswordMessage = "Fill this field"
    } else if (newPassword.length < 4) {
      this.errorResetPasswordMessage = "Password must contain more than 4 symbols"
    } else {
      this.errorResetPasswordMessage = "";
      this.userService.resetUserPasswordByEmail(newPassword, this.encryptedEmail).subscribe( user  => {
        modal.close('Cross click');
      });
    }
  }
}
