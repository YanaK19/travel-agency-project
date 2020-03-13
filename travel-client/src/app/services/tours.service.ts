import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tour} from '../interfaces/tour/tour.interface';
import {map} from 'rxjs/operators';
import {Order} from '../interfaces/order/order.interface';
import {AuthorizationService} from './authorization.service';

@Injectable({providedIn: 'root'})
export class ToursService {
  constructor(private http: HttpClient,
              private auth: AuthorizationService) {
  }

  getTours(params?: string): Observable<Tour[]> {
    if (params) {
      return this.http.get<Tour[]>('api/tour' + params);
    } else {
      return this.http.get<Tour[]>('api/tour');
    }
  }

  getOneTour(id: string): Observable<Tour> {
    return this.http.get<Tour>('api/tour/' + id);
  }

  getToursByRestType(type: string): Observable<Tour[]> {
      return this.http.get<Tour[]>('api/tour?restType=' + type);
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

  deleteTourById(tourId): Observable<Tour>  {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.delete<Tour>('/api/tour/' + tourId, httpOptions);
  }

  updateTour(updatedTour): Observable<Tour> {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.put<Tour>('/api/tour/' + updatedTour._id, updatedTour, httpOptions);
  }

  createTour(newTour: Tour): Observable<any> {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.post('/api/tour', newTour, httpOptions);
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
    return this.http.put<any>('/api/tour/' + tour._id, fd);
  }
}
