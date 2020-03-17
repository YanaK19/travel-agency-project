import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class LangService {
  constructor(public translate: TranslateService) {
  }

  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }

  getLang() {
    return localStorage.getItem('locale');
  }

  setAndLangParam() {
    let lang = this.getLang();
    let langParam = '';
    if(lang !== 'en') {
      langParam += '&lang=' + lang;
    }

    return langParam;
  }

  setOnlyLangParam() {
    let currLang = this.getLang();
    let langParam = '';
    if(currLang !== 'en') {
      langParam += '?lang=' + currLang;
    }

    return langParam;
  }
}
