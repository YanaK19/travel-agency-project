import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TourLocation} from '../interfaces/tourLocation/tourLocation.interface';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LocationService {
  constructor(private http: HttpClient) {
  }

  getContries(): Observable<string[]> {
    return this.http.get<TourLocation[]>('api/location')
      .pipe(map((locations: any) => {
          return locations.map(location => location.country);
        })
      );
  }
}
