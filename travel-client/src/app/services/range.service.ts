import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Range} from '../interfaces/range/range.interface';
import {Tour} from '../interfaces/tour/tour.interface';
import {AuthorizationService} from './authorization.service';
import {LangService} from './lang.service';


@Injectable({providedIn: 'root'})
export class RangeService {
  constructor(private http: HttpClient,
              private auth: AuthorizationService,
              private langService: LangService) {
  }

  getRanges(): Observable<any> {
    return this.http.get<Range[]>('api/range' + this.langService.setOnlyLangParam());
  }

  updateRanges(updatedRanges): Observable<Range> {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', this.auth.getToken())
    };

    return this.http.put<Range>('/api/range', updatedRanges, httpOptions);
  }

  getAllLangsRanges(): Observable<any> {
    return this.http.get<Range[]>('api/range/allLangs/ranges');
  }
}
