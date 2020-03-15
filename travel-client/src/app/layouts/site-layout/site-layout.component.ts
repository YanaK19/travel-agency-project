import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  userId = '';

  constructor(private auth: AuthorizationService,
              private router: Router,
              private userService: UserService,
              public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
    }
  }


  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
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
    let userRole = JSON.parse(localStorage.getItem('userData')).role;

    if (userRole == 'admin') {
      this.router.navigate(['/admin'])
    } else {
      this.router.navigate(['/account/' + this.userService.getUserData()._id]);
    }
  }
}
