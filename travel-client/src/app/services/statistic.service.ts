import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Review} from '../interfaces/review/review.interface';

@Injectable({providedIn: 'root'})
export class StatisticService {
  constructor(private http: HttpClient) {
  }

  getMostActiveUsers(): Observable<any> {
    return this.http.get<any>('api/statistic/mostactive/users');
  }

  getGeneralStatistic(): Observable<any> {
    return this.http.get<any>('api/statistic/general/tours-orders-followers-icome');
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

  getTodoList(): Observable<any> {
    return this.http.get<any>('api/statistic/todo');
  }

  updateTask(todo): Observable<any> {
    return this.http.put<any>('api/statistic/todo/' + todo._id, todo);
  }

  deleteTask(todoId): Observable<any> {
    return this.http.delete<any>('api/statistic/todo/' + todoId);
  }

  createTask(task): Observable<any> {
    return this.http.post<any>('api/statistic/todo', {task});
  }
}



