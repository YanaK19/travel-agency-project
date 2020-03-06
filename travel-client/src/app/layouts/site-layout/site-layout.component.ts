import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  userId = '';

  constructor(private auth: AuthorizationService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.userId = JSON.parse(localStorage.getItem('userData'))._id;
      console.log(this.userId);
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
  }

  gotoAccountPage() {
    this.router.navigate(['/account/' + this.userService.getUserData()._id]);
  }
}
