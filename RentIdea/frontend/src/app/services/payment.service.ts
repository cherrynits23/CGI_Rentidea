import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  createOrder(orderData: any): any {
    return this.http.post('http://localhost:5142/CreateOrder', orderData);
  }

  validatePayment(orderData: any): any {
    return this.http.post('http://localhost:5142/VerifyOrder', orderData);
  }

 


}
