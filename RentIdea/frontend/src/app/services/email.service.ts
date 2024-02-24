import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {}
  sendEmail(emailobj: any) {
    console.log(emailobj);

    return this.http.post('http://localhost:5140/api/Email', emailobj);
  }
}
