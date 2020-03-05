import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class RangeService {
  constructor(private http: HttpClient) {
  }

  getRanges(): Observable<any> {
    return this.http.get<Range[]>('api/range');
  }
}
