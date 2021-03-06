import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tour} from '../interfaces/tour/tour.interface';
import {map} from 'rxjs/operators';
import {Order} from '../interfaces/order/order.interface';
import {AuthorizationService} from './authorization.service';
import {LangService} from './lang.service';

@Injectable({providedIn: 'root'})
export class ToursService {
  constructor(private http: HttpClient,
              private auth: AuthorizationService,
              private langService: LangService) {
  }

  getTours(params?: string): Observable<Tour[]> {
    if (params) {
      return this.http.get<Tour[]>('api/tour' + params + this.langService.setAndLangParam());
    } else {
        return this.http.get<Tour[]>('api/tour' + this.langService.setOnlyLangParam());
    }
  }

  getOneTour(id: string): Observable<Tour> {
      return this.http.get<Tour>('api/tour/' + id + this.langService.setOnlyLangParam());
  }

  getToursByRestType(type: string): Observable<Tour[]> {
      return this.http.get<Tour[]>('api/tour?restType=' + type + this.langService.setAndLangParam());
  }

  getTop10Tours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('api/tour?sortBy=views' + this.langService.setAndLangParam())
      .pipe(map((data: any) => {
        data.splice(10);
        return data;
      })
      );
  }

  getBiggestDiscountTour(): Observable<Tour> {
    return this.http.get<Tour>('api/tour?sortBy=discount' + this.langService.setAndLangParam())
      .pipe(map((data: any) => {
          return data[0];
        })
      );
  }

  deleteTourById(tourId): Observable<any>  {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.delete<any>('/api/tour/' + tourId, httpOptions);
  }

  updateTour(updatedTour): Observable<any> {
    const httpOptions  = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken()
      })
    };

    return this.http.put<any>('/api/tour/' + updatedTour._id, updatedTour, httpOptions);
  }

  createTour(newTour: Tour): Observable<any> {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.post('/api/tour', newTour, httpOptions);
  }

  uploadImages(filesArr, tourId): Observable<any> {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };
    const fd = new FormData();

    filesArr.forEach(file => {

      fd.append('images', file, file.name);
    });

    return this.http.put<any>('/api/tour/' + tourId, fd, httpOptions);
  }

  getAllLangsTours(params?: string): Observable<any[]> {
      return this.http.get<any[]>('api/tour/allLangs/tours');
  }

  getAllLangsTourById(tourId): Observable<any> {
    return this.http.get<any>('api/tour/allLangs/' + tourId);
  }
}
