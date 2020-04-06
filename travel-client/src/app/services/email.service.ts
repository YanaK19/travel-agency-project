import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailService {
  constructor(private http: HttpClient) {
  }

  sendEmailResetPassword(email):Observable<any> {
    return this.http.post<any>('/api/email?theme=password', {email});
  }

  sendEmailBooked(email, tour, tourDate):Observable<any> {
    return this.http.post<any>('/api/email?theme=booked', {email, tour, tourDate});
  }

  sendEmailOrderConfirmed(email, order, tour):Observable<any> {
    return this.http.post<any>('/api/email?theme=confirmed', {email, order, tour});
  }
}
