import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserData} from '../interfaces/user/userData.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthorizationService} from './authorization.service';
import {map} from 'rxjs/operators';

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

  addToFavourites(tourId): Observable<any> {
    const httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.getToken()
      })
    };

    const userData = JSON.parse(localStorage.getItem('userData'));
    userData.favouriteTourIds.push(tourId);
    localStorage.setItem('userData', JSON.stringify(userData));
    return this.http.put<any>('/api/user', {'favouriteTourIds': userData.favouriteTourIds}, httpOptions);
  }

  deleteFromFavourites(tourId): Observable<any> {
    const httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.getToken()
      })
    };

    const userData = JSON.parse(localStorage.getItem('userData'));
    userData.favouriteTourIds.splice(userData.favouriteTourIds.indexOf(tourId), 1);
    localStorage.setItem('userData', JSON.stringify(userData));
    return this.http.put<any>('/api/user', {'favouriteTourIds': userData.favouriteTourIds}, httpOptions);
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

  checkUserByEmail(email: string) {
    return this.http.get<any>('/api/user/check/users?email=' + email);
  }

  resetUserPasswordByEmail(password: string, encryptedEmail: string): Observable<any> {
    return this.http.put<any>('/api/user/reset/password', {password, encryptedEmail})
      .pipe(map((data: any) => {
        localStorage.setItem('token', data.token);
        console.log(data.user);
        localStorage.setItem('userData', JSON.stringify(data.user));
        return data.user;
      })
    );
  }
}
