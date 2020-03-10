import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserData} from '../interfaces/user/userData.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthorizationService} from './authorization.service';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient,
              private auth: AuthorizationService) {
  }
  getUserById(userId: string): Observable<UserData> {
    return this.http.get<UserData>('api/user/' + userId);
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
  }

  addAccountToSubscriptions(userId): Observable<any> {
    let myUserData = this.getUserData();
    myUserData.subscriptions.push(userId);
    localStorage.setItem('userData', JSON.stringify(myUserData));

    const httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.getToken()
      })
    };
    const putData = {'subscriptions': myUserData.subscriptions};
    return this.http.put<any>('/api/user', JSON.stringify(putData), httpOptions);
  }

  deleteAccountFromSubscriptions(userId): Observable<any> {
    let myUserData = this.getUserData();
    myUserData.subscriptions = myUserData.subscriptions.filter(subscription => subscription != userId);
    localStorage.setItem('userData', JSON.stringify(myUserData));

    const httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.getToken()
      })
    };
    const putData = {'subscriptions': myUserData.subscriptions};
    return this.http.put<any>('/api/user', JSON.stringify(putData), httpOptions);
  }

  uploadAvatar(image): Observable<any> {
    const fd = new FormData();
    fd.append('image', image, image.name);

    const httpOptions  = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken()
      })
    };

    return this.http.put<any>('/api/user', fd, httpOptions);
  }
}
