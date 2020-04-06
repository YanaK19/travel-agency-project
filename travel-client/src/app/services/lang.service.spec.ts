import {LangService} from './lang.service';
import {TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('LangService', () => {
  let langService: LangService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ LangService, TranslateService, TranslateStore ],
      imports: [ TranslateModule.forRoot({loader: {provide: TranslateLoader, useValue: {}}}), HttpClientModule, RouterTestingModule.withRoutes([])  ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it("setAndLangParam & setOnlyLangParam", () => {
    langService = TestBed.get(LangService);

    let spyOnly = spyOn(langService,"getLang").and.returnValue('ru');
    expect(langService.setOnlyLangParam()).toBe('?lang=ru');
    expect(langService.setAndLangParam()).toBe('&lang=ru');
    expect(spyOnly).toHaveBeenCalledTimes(2);

    spyOnly.and.returnValue('en');
    expect(langService.setOnlyLangParam()).toBe('');
    expect(langService.setAndLangParam()).toBe('');
    expect(spyOnly.calls.count()).toBe(4);
  });

});
