import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class BookingHistoryService {
  // templink:any=`http://localhost:5253/api/Payment/GetOrdersByemail`;
  constructor(private http: HttpClient) {}

  // getBook() {
  //   return this.http.get('http://localhost:5253/api/Booking/GetAllBookings');
  // }
  getBook(email: string) {
    return this.http.get(
      `http://localhost:5118/api/Payment/GetOrdersByemail/${email}`
    );
  }
  // getBook(email: string):Observable<any>{
  //   this.templink=`http://localhost:5253/api/Payment/GetOrdersByemail`+email;
  //   return this.http.get(this.templink);
  // }
  // viewprdt(id: any): Observable<any> {
  //   this.templink = `http://localhost:5142/GetProductById/` + id.toString();
  //   console.log(this.templink);

  //   return this.http.get(this.templink);
  // }
}