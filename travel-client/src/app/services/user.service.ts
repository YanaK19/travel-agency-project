import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserData} from '../interfaces/user/userData.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }
  getUserById(userId: string): Observable<UserData> {
    return this.http.get<UserData>('api/user/' + userId);
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
  }
}
