import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'                            //https://localhost:7205/api/User/email
})
export class UpdateService {
  
  User : any;
  constructor(private https:HttpClient) { }
  update_profile(User: any  ){
    return this.https.put(`https://localhost:7205/api/User`,User);   //https://localhost:7205/api/User
  }

  add_profile(email:any){
   return this.https.get(`https://localhost:7205/api/User/email?email=${email}`);
  }
}
