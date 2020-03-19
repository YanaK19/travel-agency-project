import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../services/lang.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  languages = {
    'en': {name: 'eng', icon: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg"},
    'ru': {name: 'рус', icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/320px-Flag_of_Russia.svg.png"}
  };

  selectedLang;

  links = [
    {url: '/admin/statistic', name: 'statistic'},
    {url: '/admin/orders', name: 'orders'},
    {url: '/admin/editing', name: 'editing'},
  ];

  constructor(private auth: AuthorizationService,
              private router: Router,
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

  ngOnInit() {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
  }

  renderSiteLayout() {
    this.router.navigate(['/home']);
  }

  onChangeLang(language: string) {
    this.langService.changeLang(language);
    this.selectedLang = this.languages[this.langService.getLang()];
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }
}
