import {Injectable} from "@angular/core";
import {User} from "../interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {UserReg} from "../interfaces/userReg.interface";

@Injectable({providedIn: "root"})
export class AuthorizationService{
  private token = null;

  constructor(private http: HttpClient){
  }

  login(user: User): Observable<any> {
    return this.http.post('api/user/login', user)
      .pipe(map((data: any) => {
          localStorage.setItem('token', data.token);
          console.log( data.user);
          localStorage.setItem('userData', JSON.stringify(data.user));
          this.setToken(data.token);

          return data.user;
        })
      )
  }

  logout(){
    this.setToken(null);
    localStorage.clear();
  }

  register(user: UserReg): Observable<any>{
      return this.http.post('/api/user/register', user)
  }

  setToken(token: string){
    this.token = token;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isAuthenticated(){
    return !!localStorage.getItem('token');
  }

  isAdmin(){
    const role: string = JSON.parse(localStorage.getItem('userData')).role;
    return role === 'admin';
  }
}
