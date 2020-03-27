import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailService {
  constructor(private http: HttpClient) {
  }

  sendOrderConfirmedEmail(userId: string):Observable<any> {
    let user = "yana-03032017@mail.ru";
    return this.http.post<any>('/api/email', {'email': user});
  }
}
