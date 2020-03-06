import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Review} from '../interfaces/review/review.interface';

@Injectable({providedIn: 'root'})
export class ReviewService {
  constructor(private http: HttpClient) {
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
}
