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
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.put<any>('/api/tour/' + updatedTour._id + this.langService.setOnlyLangParam(), updatedTour, httpOptions);
  }

  createTour(newTour: Tour): Observable<any> {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.post('/api/tour' + this.langService.setOnlyLangParam(), newTour, httpOptions);
  }

  uploadImages(filesArr, tour): Observable<any> {
    const fd = new FormData();
    console.log(filesArr)
    filesArr.forEach(file => {
      console.log(file)
      fd.append('images', file, file.name);
    });

/*    for(let image of images) {
      fd.append('images', image, image.name);
    }*/

/*    const httpOptions  = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken()
      })
    };*/
    console.log(fd)
    return this.http.put<any>('/api/tour/' + tour._id + this.langService.setOnlyLangParam(), fd);
  }

  getAllLangsTours(params?: string): Observable<any[]> {
      return this.http.get<any[]>('api/tour/allLangs/tours');
  }

  getAllLangsTourById(tourId): Observable<any> {
    return this.http.get<any>('api/tour/allLangs/' + tourId);
  }
}
