import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  templink: any = `http://localhost:5142/GetProductById/{id}`;

  constructor(private http: HttpClient) { }

  addprdt(addprdtobj: any): Observable<any> 
  {
    return this.http.post(`http://localhost:5142/AddProduct`, addprdtobj);
  }

  listprdt(): Observable<any>
  {
    return this.http.get(`http://localhost:5142/GetProducts`);
  }

  viewprdt(id: any): Observable<any> {
    this.templink = `http://localhost:5142/GetProductById/` + id.toString();
    console.log(this.templink);

    return this.http.get(this.templink);
  }

  renterlist(renterName: string): Observable<any>
  {
    return this.http.get(`https://localhost:7191/api/Product/renterName?renterName=${renterName}`);
  }

  deleteprdt(id: any): Observable<any> {
    //this.templink = `https://localhost:7191/api/Product/DeleteProduct?id=${id}` ;
   // console.log(this.templink);

    return this.http.delete(`https://localhost:7191/api/Product/DeleteProduct?id=${id}`);
  }
  
}
