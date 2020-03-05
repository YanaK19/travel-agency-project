import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
 userData: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userData = this.userService.getUserData();
    console.log(this.userData)
  }

}
