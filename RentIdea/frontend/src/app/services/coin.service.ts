import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor(private http: HttpClient) {}

  coinOrderUpdate(coinobj: any) {
    return this.http.post(
      'http://localhost:5004/api/Coin/CreateCoinOrder',
      coinobj
    );
  }
}
