import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private https:HttpClient) { }

  OnSignup(userobj:any){
    return this.https.post('https://localhost:7205/api/User',userobj);
  }

  OnLogin(loginobj:any){
    return this.https.post("https://localhost:7084/api/Auth/Login",loginobj);
  }
  IsLogged(){
    return !!localStorage.getItem('token');
  }

  OnUpdateCoin(coinobj: any) {
    return this.https.put('https://localhost:7205/api/User/updateC', coinobj);
  }

}
