import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tour} from '../interfaces/tour/tour.interface';
import {map} from 'rxjs/operators';

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

  getTop10Tours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('api/tour?sortBy=views')
      .pipe(map((data: any) => {
        data.splice(10);
        return data;
      })
      );
  }

  getBiggestDiscountTour(): Observable<Tour> {
    return this.http.get<Tour>('api/tour?sortBy=discount')
      .pipe(map((data: any) => {
          return data[0];
        })
      );
  }
}
