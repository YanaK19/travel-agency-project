import {Injectable} from '@angular/core';
import {UserLogin} from '../interfaces/user/userLogin.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserRegister} from '../interfaces/user/userRegister.interface';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthorizationService {
  constructor(private http: HttpClient, private router: Router) {
  }

  login(user: UserLogin): Observable<any> {
    return this.http.post('api/user/login', user)
      .pipe(map((data: any) => {
          localStorage.setItem('token', data.token);
          console.log(data.user);
          localStorage.setItem('userData', JSON.stringify(data.user));
          return data.user;
        })
      );
  }

  logout() {
    const lang = localStorage.getItem('locale');
    localStorage.clear();
    localStorage.setItem('locale', lang);
    this.router.navigate(['/home']);
  }

  register(user: UserRegister): Observable<any> {
    return this.http.post('/api/user/register', user);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  isAdmin() {
    const role: string = JSON.parse(localStorage.getItem('userData')).role;
    return role === 'admin';
  }
}
