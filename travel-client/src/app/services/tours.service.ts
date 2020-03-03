import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tour} from '../interfaces/tour/tour.interface';

@Injectable({providedIn: 'root'})
export class ToursService {
  constructor(private http: HttpClient) {
  }

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('api/tour');
  }

  getOneTour(id: string): Observable<Tour> {
    return this.http.get<Tour>('api/tour/' + id);
  }
}
