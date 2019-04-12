import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _registerUserUrl = "http://localhost:3000/user/subscribe";
  private _loginUserUrl="http://localhost:3000/user/login";
  private _logoutUserUrl="http://localhost:3000/user/logout";
  private _infoUser="http://localhost:3000/user/info"

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUserUrl,user);
  }

  loginUser(user){
    return this.http.post<any>(this._loginUserUrl,user);

  }

  logoutUser(token){
    return this.http.post<any>(this._logoutUserUrl,token);
  }

  infoUser(token){
    return this.http.post<any>(this._infoUser,token)
  }
}
