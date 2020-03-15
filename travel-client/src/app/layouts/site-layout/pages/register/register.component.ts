import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../../services/authorization.service';
import {UserRegister} from '../../../../interfaces/user/userRegister.interface';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ErrorHandlerService} from '../../../../services/error-handler.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  subscriptions: Subscription[] = [];
  resultMessage: any = null;

  constructor(private auth: AuthorizationService,
              private router: Router,
              private errorHandler: ErrorHandlerService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      nickname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      tel: new FormControl(null, [Validators.required])
    });
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  onSubmit() {
    this.registerForm.disable();

    const user: UserRegister = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.nickname,
      telephone: this.registerForm.value.tel
    };

    this.subscriptions.push(
      this.auth.register(user).subscribe(
        () => {
          this.subscriptions.push(
            this.auth.login(user).subscribe(
              (res) => {
                const userId: string = res._id;
                return this.router.navigate(['/account/' + userId]);
              },
              (err) => {
                console.log('err', err.error);
                this.errorHandler.handleError(err);
              }
            )
          );
        },
        (err) => {
          this.registerForm.enable();
          console.log('errorRegister', err);
          this.resultMessage = err.error.message;
        }
      )
    );
  }
}
