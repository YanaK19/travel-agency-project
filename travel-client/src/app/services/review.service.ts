import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Review} from '../interfaces/review/review.interface';
import {Order} from '../interfaces/order/order.interface';
import {AuthorizationService} from './authorization.service';

@Injectable({providedIn: 'root'})
export class ReviewService {
  constructor(private http: HttpClient,
              private auth: AuthorizationService) {
  }

  getReviewsByTourId(tourId: string): Observable<Review[]> {
    return this.http.get<Review[]>('api/review?confirmed=true&tourId=' + tourId);
  }

  getReviewsByUserId(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>('api/review?confirmed=true&userId=' + userId);
  }

  getLimitReviews(quantity: number): Observable<Review[]> {
    return this.http.get<Review[]>('api/review?confirmed=true&limit=' + quantity);
  }

  getReviews(): Observable<any> {
    return this.http.get<any>('api/review');
  }

  createReview(review): Observable<any> {
    return this.http.post<any>('api/review', review);
  }

  confirmReview(reviewId): Observable<any>  {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.put<any>('/api/review/' + reviewId, {confirmed: true}, httpOptions);
  }

  deleteReviewById(reviewId): Observable<Order>  {
    const httpOptions  = {
      headers: new HttpHeaders()
        .set('Authorization',  this.auth.getToken())
    };

    return this.http.delete<Order>('/api/review/' + reviewId, httpOptions);
  }
}
