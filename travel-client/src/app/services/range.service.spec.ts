import {RangeService} from './range.service';

import {AuthorizationService} from './authorization.service';
import {LangService} from './lang.service';
import {of} from 'rxjs';


describe('RangeService (with spies)', () => {
  let spyHttp: {get: jasmine.Spy};
  let spyAuth: jasmine.SpyObj<AuthorizationService>;
  let spyLang: jasmine.SpyObj<LangService>;
  let rangeService: RangeService;

  beforeEach(() => {
    spyHttp = jasmine.createSpyObj('HttpClient', ['get']);
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

    expect(spyHttp.get).toHaveBeenCalledTimes(1);
    expect(spyHttp.get).toHaveBeenCalledWith('api/range' + spyLang.setOnlyLangParam());
  })
});


