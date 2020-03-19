import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TourLocation} from '../interfaces/tourLocation/tourLocation.interface';
import {map} from 'rxjs/operators';
import {LangService} from './lang.service';

@Injectable({providedIn: 'root'})
export class LocationService {
  constructor(private http: HttpClient,
              private langService: LangService) {
  }

  getContries(): Observable<string[]> {
    return this.http.get<TourLocation[]>('api/location' + this.langService.setOnlyLangParam())
      .pipe(map((locations: any) => {
          return locations.map(location => location.country);
        })
      );
  }

  getAllLangsLocations(): Observable<any> {
    return this.http.get<any>('api/location/allLangs/locations');
  }

  createLocation(newLocation): Observable<any> {
    let location = {en: {country: newLocation.en.country, towns: [newLocation.en.town]},
                    ru: {country: newLocation.ru.country, towns: [newLocation.ru.town]}};
    return this.http.post<any>('api/location', location);
  }

  updateLocationById(updatedLocation): Observable<any> {
    return this.http.put<any>('api/location/' + updatedLocation._id, updatedLocation);
  }

  deleteLocationById(locationId): Observable<any> {
    return this.http.delete<any>('api/location/' + locationId);
  }
}
