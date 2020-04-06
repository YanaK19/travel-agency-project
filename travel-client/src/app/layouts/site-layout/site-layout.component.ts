import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';
import {NavigationEnd, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../services/lang.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  userId = '';
  languages = {
    'en': {name: 'eng', icon: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg"},
    'ru': {name: 'рус', icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/320px-Flag_of_Russia.svg.png"}
  };

  selectedLang;

  constructor(private auth: AuthorizationService,
              private router: Router,
              private userService: UserService,
              public translate: TranslateService,
              private langService: LangService) {
    translate.addLangs(['en', 'ru']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      this.selectedLang = this.languages[browserLang];
      translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
      this.selectedLang = this.languages['en'];
    }
  }


  onChangeLang(language: string) {
    this.langService.changeLang(language);
    this.selectedLang = this.languages[this.langService.getLang()];
    this.refresh();
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.userId = JSON.parse(localStorage.getItem('userData'))._id;
    }

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
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

  refresh(): void {
    window.location.reload();
  }
}
