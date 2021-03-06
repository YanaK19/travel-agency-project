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

  getOrderById(orderId): Observable<Order>  {
    return this.http.get<Order>('/api/order/' + orderId);
  }

  deleteOrderById(orderId): Observable<Order>  {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.delete<Order>('/api/order/' + orderId, httpOptions);
  }

  confirmOrder(orderId): Observable<Order>  {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.put<Order>('/api/order/' + orderId, {confirmed: true}, httpOptions);
  }

  getOrdersByUserId(userId): Observable<Order[]> {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.get<Order[]>('/api/order?userId=' + userId, httpOptions );
  }

  getFullOrderInfo(orderId): Observable<any[]> {
    return this.http.get<any[]>('/api/order/fullInfo/' + orderId);
  }

  getOrderTourByUserId(userId): Observable<any[]> {
    return this.http.get<any[]>('/api/order/orderstoursByuserid/' + userId);
  }

  getFullOrdersInfo(): Observable<any[]> {
    return this.http.get<any[]>('/api/order/allOrders/orders');
  }

  createOrder(order): Observable<any> {
    return this.http.post<any>('api/order', order);
  }
}

