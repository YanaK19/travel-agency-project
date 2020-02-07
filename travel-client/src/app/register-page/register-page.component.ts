import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService} from "../services/authorization.service";
import {UserReg} from "../interfaces/userReg.interface";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  subscr: Subscription;

  constructor(private auth: AuthorizationService, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      nickname:  new FormControl(null, [Validators.required, Validators.minLength(3)]),
      tel:  new FormControl(null, [Validators.required])
    });
  }

  ngOnDestroy(){
    if(this.subscr){
      this.subscr.unsubscribe()
    }
  }

  onSubmit(){
    this.registerForm.disable();

    const user: UserReg ={
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.nickname,
      telephone: this.registerForm.value.tel
    };

    this.subscr = this.auth.register(user).subscribe(
      ()=>{
        return this.router.navigate(['/login'],
          {queryParams: {registered: true}})
      },
      (err)=>{
        this.registerForm.enable();
        console.log('errorRegister', err);
      }
    );
  }

}
