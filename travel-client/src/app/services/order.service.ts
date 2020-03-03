import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../interfaces/order/order.interface';
import {AuthorizationService} from './authorization.service';

@Injectable({providedIn: 'root'})
export class OrderService {
  constructor(private http: HttpClient,
              private auth: AuthorizationService) {
  }

  getOrders(): Observable<Order[]> {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.get<Order[]>('/api/order', httpOptions );
  }
}

