import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { }

  getuser(email:any){
    return this.http.get(`https://localhost:7205/api/User/email?email=${email}`);
   }

}
