import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../AuthServices/auth.service';
import { EmailService } from '../services/email.service';
import { CoinService } from '../services/coin.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent {

  email: any;
  emailobj: any;
  orderAmount: any;
  coin: any;
  productId: any;
  coinobj: any;
  coinOrderobj: any;
  orderid: any;

  paymentId: any;

  constructor(
    private router: Router,
    private svc: AuthService,
    private sendmail: EmailService,
    private coinSvc: CoinService
  ) {
    this.email = localStorage.getItem('email');
    this.coin = localStorage.getItem('coin');
    this.orderAmount = localStorage.getItem('orderAmount');
    this.productId = localStorage.getItem('productId');
    this.orderid = localStorage.getItem('currentOrderid');

    console.log(this.orderAmount / 100);
    console.log(this.coin);
    console.log(this.productId);
    this.coinobj = {
      email: this.email,
      coin: Number,
    };

    this.emailobj = {
      paymentId: '',
      to: this.email,
      subject: '',
      body: '',
    };
    this.coinOrderobj = {
      amount: this.orderAmount / 100,
      orderId: this.orderid,
      userId: this.email,

      paymentId: '',
    };
  }
  // isVisible = false;

  // togglePopup() {
  //   this.isVisible = !this.isVisible;
  // }

  paybycoin() {
    this.coinobj.coin = this.coin - this.orderAmount / 100;
    console.log(this.coinobj);

    console.log(this.coinobj.coin);

    // console.log('Payment is Successfull');

    //alert('Coin page');
    // this.isVisible = false;

    this.svc.OnUpdateCoin(this.coinobj).subscribe({
      next: (res: any) => {
        // console.log('coin updated');
        // this.paymentId = `coin_${Math.floor(
        //   Math.random() * 1000000
        // ).toString()}`;
        // this.emailobj.paymentId = this.paymentId;
        // // alert('Payment is Successfull');
        // this.emailobj.subject = 'Payment Successfull';
        // this.emailobj.body = `Payment of Amount ${
        //   this.orderAmount / 100
        // } is Sussessfull by Coin`;
        // this.sendMailed();
        // this.sendmail.sendEmail(this.emailobj).subscribe(
        //   (response: any) => {
        //     console.log('Email sent successfully:', response);
        //   },
        //   (error: any) => {
        //     console.error('Error sending email:', error);
        //   }
        // );
        // console.log('Payment successfull');
        // this.router.navigate(['Home']);
      },
      // error: (error) => {
      //   alert('payment failed');
      //   this.emailobj.subject = 'Payment UnSuccessfull';
      //   this.emailobj.body = `Payment of Amount ${
      //     this.orderAmount / 100
      //   } is UnSussessfull `;
      // },
    });

    this.paymentId = `coin_${Math.floor(Math.random() * 1000000).toString()}`;

    this.emailobj.paymentId = this.paymentId;

    // alert('Payment is Successfull');

    this.emailobj.subject = 'Payment Successfull';
    this.emailobj.body = `Payment of Amount ${
      this.orderAmount / 100
    } is Successfull by Coin`;
    this.coinOrderobj.paymentId = this.paymentId;
    this.coinSvc.coinOrderUpdate(this.coinOrderobj).subscribe();

    this.sendMailed();
    // window.location.reload();
  }

  sendMailed() {
    console.log('Sending mail');

    this.sendmail.sendEmail(this.emailobj).subscribe(
      (response: any) => {
        console.log('Email sent successfully:', response);
      },
      (error: any) => {
        console.error('Error sending email:', error);
      }
    );
    console.log('Payment successfull');
    
    this.router.navigate(['list-product']);
  }
  

}
