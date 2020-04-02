/*import { TestBed, inject  } from '@angular/core/testing';
import {RangeService} from './range.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';

describe('RangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot()],
      providers: [RangeService]
    });
  });

  it(
    'should get ranges',
    inject(
      [HttpTestingController, RangeService],
      (
        httpMock: HttpTestingController,
        rangeService: RangeService
      ) => {
        const mockRages = [
          { category: 'rest', types: ['beach', 'exotic'] },
          { category: 'tramsport', types: ['car', 'bus'] }
        ];


        rangeService.getRanges().subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(mockRages);
          }
        });

        const mockReq = httpMock.expectOne('api/range');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');

        mockReq.flush(mockRages);

        httpMock.verify();

      }
    )
  );

});*/

import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import {RangeService} from './range.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule} from '@angular/router';
import {AuthorizationService} from './authorization.service';
import {LangService} from './lang.service';
import {of} from 'rxjs';
/*
describe('RangeService', () => {
  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpTestingController: HttpTestingController;
  let service: RangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RangeService,
      ],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(RangeService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // Angular default test added when you generate a service using the CLI
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});*/


describe('RangeService', () => {
  let spyHttp: {get: jasmine.Spy};
  let spyAuth: jasmine.SpyObj<AuthorizationService>;
  let spyLang: jasmine.SpyObj<LangService>;
  let rangeService: RangeService;

  beforeEach(() => {
    spyHttp = jasmine.createSpyObj('HttpClient', ['get']);
 /*   spyAuth = jasmine.createSpyObj('AuthorizationSevice', ['getToken']);*/
    spyLang = jasmine.createSpyObj('LangService', ['setOnlyLangParam']);

    rangeService = new RangeService(<any>spyHttp, spyAuth, spyLang);
  });

  it('shold return ranges', () => {
    const expectedRanges = [
      { category: 'rest', types: ['beach', 'exotic'] },
      { category: 'transport', types: ['car', 'bus'] }
    ];

    spyHttp.get.and.returnValue(of(expectedRanges));
    spyLang.setOnlyLangParam.and.returnValue('?lang=en');

    rangeService.getRanges().subscribe(ranges => {
      expect(ranges).toEqual(expectedRanges);
    });

/*    expect(spyHttp.get.calls.count()).toBe(1, 'one call');*/
    expect(spyHttp.get).toHaveBeenCalledTimes(1);
    expect(spyHttp.get).toHaveBeenCalledWith('api/range' + spyLang.setOnlyLangParam());
  })
});


