import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Tour} from '../../../../../interfaces/tour/tour.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserLogin} from '../../../../../interfaces/user/userLogin.interface';
import {Subscription} from 'rxjs';
import {AuthorizationService} from '../../../../../services/authorization.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from '../../../../../services/error-handler.service';
import {UserRegister} from '../../../../../interfaces/user/userRegister.interface';

@Component({
  selector: 'book-block',
  templateUrl: './book-block.component.html',
  styleUrls: ['./book-block.component.scss']
})
export class BookBlockComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = "";
  subscription: Subscription;
  registerForm: FormGroup;
  subscriptions: Subscription[] = [];
  resultMessage: any = null;
  activeForm = 'login';
  id: string;

  @Input() tour: Tour;
  constructor(private auth: AuthorizationService,
              private router: Router,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private errorHandler: ErrorHandlerService,
              private activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });

    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      nickname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      tel: new FormControl(null, [Validators.required])
    });
  }

  onSubmitLogin(modal) {
    this.loginForm.disable();

    const user: UserLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.subscription = this.auth.login(user).subscribe(
      (res) => {
        // res={role:..id..email..name..telephone..}
        console.log(modal, typeof modal);
        modal.close('Cross click');
      },
      (err) => {
        this.loginForm.enable();
        console.log('err', err.error);
        this.errorMessage = err.error.message;
      }
    );
  }

  onSubmitRegister(modal) {
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
                modal.close('Cross click');
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

  onBook(content) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/book', this.id]);
    } else {
      this.modalService.open(content, { centered: true });
    }
  }

  changeActiveForm(formName) {
    this.activeForm = formName;
  }
}
