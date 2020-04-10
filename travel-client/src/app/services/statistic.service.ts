import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Review} from '../interfaces/review/review.interface';

@Injectable({providedIn: 'root'})
export class StatisticService {
  constructor(private http: HttpClient) {
  }

  getIncomeByMonth(): Observable<any> {
    return this.http.get<any>('api/statistic/income/monthly');
  }

  getPopularDestnationsMonth(): Observable<any> {
    return this.http.get<any>('api/statistic/populardestinations/month');
  }

  getOrdersLastMonth(): Observable<any> {
    return this.http.get<any>('api/statistic/orders/lastmonth');
  }
}



