import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../../services/authorization.service';
import {UserLogin} from '../../../../interfaces/user/userLogin.interface';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ErrorHandlerService} from '../../../../services/error-handler.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  resultMessage: any = null;
  loginForm: FormGroup;
  subscription: Subscription;
  errorMessage = "";
  constructor(private auth: AuthorizationService,
              private router: Router,
              private route: ActivatedRoute,
              private errorHandler: ErrorHandlerService) {

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params.registered) {
          console.log('login page opened after registration');
          this.resultMessage = 'u are has been registered ';
      } else if (params.accessForbidden) {
        console.log('login page opened after trying to access to url /admin');
        this.resultMessage = 'u need to login at first';
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
}
