// import {
//   ChangeDetectorRef,
//   HostListener,
//   Inject,
// } from '@angular/core';
// import { Component } from '@angular/core';
// import { PaymentService } from '../services/payment.service';
// import { WindowRefService } from '../services/window-ref.service';
// import { ActivatedRoute } from '@angular/router';
// import { UserserviceService } from '../services/userservice.service';
// import { ProductService } from '../services/product.service';
// import { Router } from '@angular/router';
// import { EmailService } from '../services/email.service';
// import {
//   MAT_DIALOG_DATA,
//   MatDialog,
//   MatDialogRef,
// } from '@angular/material/dialog';
// import { Location } from '@angular/common';
// import { ChangeDetectionStrategy } from '@angular/core';


// @Component({
//   selector: 'app-booking',
//   templateUrl: './booking.component.html',
//   styleUrls: ['./booking.component.css'],
//   providers: [WindowRefService],
//   changeDetection: ChangeDetectionStrategy.Default,
// })
// export class BookingComponent {

//   showConfirmButton: boolean = true;
//   showPayButton: boolean = false;

//   constructor(
//     private svc: PaymentService,
//     private winRef: WindowRefService,
//     private route: ActivatedRoute,
//     private user: UserserviceService,
//     private prod: ProductService,
//     private router: Router,
//     private sendmail: EmailService,
//     private location: Location,
//     private dialogRef: MatDialogRef<BookingComponent>,
//     private cdr: ChangeDetectorRef,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.udat = this.data.udat;
//     this.pdat = this.data.pdat;
//     this.userid = localStorage.getItem('email');
//     this.coin = localStorage.getItem('coin');
//     this.emailobj = {
//       paymentId: '',
//       to: this.userid,
//       subject: '',
//       body: '',
//     };
//   }

//   coin:any;
//   id: any;
//   userid:any; 
//   paymentId: any;
//   emailobj: any;
//   udat: any = {
//     user_id: "",
//     firstName: "",
//     lastName: "",
//     mobile: "",
//     address: "",
//     email: "",
//     password: "",
//     gender: "",
//     state: "",
//     district: ""
// }
//   pdat: any = {
//     productId: "",
//     productName: "",
//     productPrice: 0,
//     categeory: "",
//     subCategeory: "",
//     company: "",
//     productDescription: "",
//     productimage:""
//   }

//   userData : any={userId: "", email:"", firstName:"", lastName:"", phone : ""};
//   productData : any={productId: "", ProductName:"", Price:0}
//   totalPrice : number = this.productData.Price;
//   orderData: any={amount: 0, orderId:"", userId:"", productId:"", payerName:"", payerEmail:"",
//   payerPhone:"", dateTimeofPurchase:Date(), razorpay_payment_id:"", razorpay_order_id:"",
//   razorpay_signature:""}

//   returnedData:any;
//   // ngOnInit(){
//   //   this.route.params.subscribe((params) => {
//   //     // console.log(params['id']);
//   //     this.id = params['id'];
//   //     this.userid = localStorage.getItem('email')
//   //   });

//   //   this.user.getuser(this.userid).subscribe((response : any) => {
//   //     this.udat=response;
//   //     console.log(this.udat);
//   //   },);
//   //   console.log(this.udat,"abc");
//   //   this.prod.viewprdt(this.id).subscribe((response : any) => {
//   //     this.pdat=response;
//   //     console.log(response);
//   //   },);
//   //   console.log(this.pdat);

//   //   // this.Paymentorder();
       
//   // }

//   ngOnInit() {
//     this.route.params.subscribe((params) => {
//       this.id = params['id'];
//       this.userid = localStorage.getItem('email');

//       console.log(this.pdat);
//       console.log(this.udat);
//     });
//   }

//   cancelOrder() {
//     this.dialogRef.close();
//   }
  

//   Paymentorder(){
//     this.userData = {userId:this.udat.user_id, email:this.udat.email, firstName:this.udat.firstName, lastName:this.udat.lastName, phone :this.udat.mobile
//     };
//     this.productData = {productId:this.pdat.productId, ProductName:this.pdat.productName, Price:this.pdat.productPrice};
//     this.totalPrice = this.pdat.productPrice;
//     this.orderData = {
//       amount: this.totalPrice * 100,
//       orderId: `${this.userData.email}_${this.productData.productId}`,
//       userId: this.userData.userId, 
//       productId: this.productData.productId.toString(),
//       payerName: this.userData.firstName + this.userData.lastName,
//       payerEmail: this.userData.email,
//       payerPhone: this.userData.phone,
//       dateTimeofPurchase: new Date(),
//       razorpay_payment_id: "0",
//       razorpay_order_id: "0",
//       razorpay_signature: "0"
//       };

//     localStorage.setItem('currentOrderid', this.orderData.orderId);

//     console.log(this.orderData);
//     localStorage.setItem('orderAmount', this.orderData.amount);
//     localStorage.setItem('productId', this.orderData.productId);
//     console.log(this.orderData.productId);

//       this.svc.createOrder(this.orderData).subscribe(
//         (response : any) => {
//           this.returnedData=response;
//           console.log(response);
//           alert('Your order has been confirmed, you can proceed to pay');
//         },
//         (error : Error) => {
//           console.error('Error has occured:', error);
//         }
//       );
      
//       this.showConfirmButton = false;
//       this.showPayButton = true;
//   }

//   Paynow(){
//     console.log(this.orderData.amount / 100);
//     console.log(this.coin);

//     alert(`You are paying by RazorPay`);
//     this.payWithRazor(this.returnedData.Attributes.id);
//     this.dialogRef.close();
//   }

//   payWithCoin() {
//     if (this.orderData.amount / 100 > this.coin) {
//       // orderValue:Number = (this.orderData.amount)/100;
//       alert(`Order amount is greater than your coin balance. Pay By RazorPay`);

//       // this.payWithRazor(this.returnedData.Attributes.id);
//     } else {
//       alert('You are paying by coin');

//       this.router.navigate(['coin']);
//       this.dialogRef.close();
//     }
//   }

//   payWithRazor(val: any) {
//     const options: any = {
//       key: 'rzp_test_ZYhg7PEw91YEjO',
//       amount: this.returnedData.Attributes.amount,
//       currency: 'INR',
//       name: 'RentIdea',
//       description: `Renting product with product id ${this.productData.productId}`,
//       //image: '../../../assets/images/logo.png', // company logo or product image
//       order_id: val, // order_id created by you in backend
//       modal: {
//         escape: false,
//       },
//       notes: {
//       },
//       theme: {
//         color: '#8B00FF'
//       }
//     };
//     options.handler = ((response: any, error: any) => {
//       options.response = response;
//       console.log(response);
//       console.log(options);


//       this.paymentId = response.razorpay_payment_id;
//       this.emailobj.paymentId = this.paymentId;
//       if (this.paymentId != null) {
//         this.emailobj.subject = 'Payment Successfull';
//         this.emailobj.body = `Payment of Amount ${
//           options.amount / 100
//         } is Sussessfull `;
//       } else {
//         this.emailobj.subject = 'Payment UnSuccessfull';
//         this.emailobj.body = `Payment of Amount ${
//           options.amount / 100
//         } is UnSuccessfull `;
//       }
//       console.log(this.emailobj);

//       this.sendmail.sendEmail(this.emailobj).subscribe(
//         (response: any) => {
//           console.log('Email sent successfully:', response);
//         },
//         (error: any) => {
//           console.error('Error sending email:', error);
//         }
//       );


//       this.svc.validatePayment(response).subscribe();
//       this.router.navigate(['Home']);
   
//       // call your backend api to verify payment signature & capture transaction
//     });
//     options.modal.ondismiss = (() => {
//       // handle the case when user closes the form while transaction is in progress
//       console.log('Transaction cancelled.');
//     });

//     const rzp = new this.winRef.nativeWindow.Razorpay(options); 
//     rzp.open();
//   }   
// }

import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
} from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { WindowRefService } from '../services/window-ref.service';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [WindowRefService],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BookingComponent {
  showConfirmButton: boolean = true;
  showPayButton: boolean = false;

  constructor(
    private svc: PaymentService,
    private winRef: WindowRefService,
    private route: ActivatedRoute,
    private user: UserserviceService,
    private prod: ProductService,
    private router: Router,
    private sendmail: EmailService,
    private location: Location,
    private dialogRef: MatDialogRef<BookingComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.udat = this.data.udat;
    this.pdat = this.data.pdat;
    this.userid = localStorage.getItem('email');
    this.coin = localStorage.getItem('coin');
    this.emailobj = {
      paymentId: '',
      to: this.userid,
      subject: '',
      body: '',
    };
  }

  coin: any;
  id: any;
  userid: any;
  paymentId: any;
  emailobj: any;
  udat: any = {
    user_id: '',
    firstName: '',
    lastName: '',
    mobile: '',
    address: '',
    email: '',
    password: '',
    gender: '',
    state: '',
    district: '',
  };
  pdat: any = {
    productId: '',
    productName: '',
    productPrice: 0,
    categeory: '',
    subCategeory: '',
    company: '',
    productDescription: '',
    productimage: '',
  };

  userData: any = {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  };
  productData: any = { productId: '', ProductName: '', Price: 0 };
  totalPrice: number = this.productData.Price;
  orderData: any = {
    amount: 0,
    orderId: '',
    userId: '',
    productId: '',
    payerName: '',
    payerEmail: '',
    payerPhone: '',
    dateTimeofPurchase: Date(),
    razorpay_payment_id: '',
    razorpay_order_id: '',
    razorpay_signature: '',
  };

  returnedData: any;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.userid = localStorage.getItem('email');

      this.user.getuser(this.userid).subscribe((response : any) => {
      this.udat=response;
      console.log(this.udat);
      },);
      console.log(this.udat,"abc");

      console.log(this.pdat);
      console.log(this.udat);
    });
  }

  cancelOrder() {
    this.dialogRef.close();
  }

  Paymentorder() {
    this.userData = {
      userId: this.udat.user_id,
      email: this.udat.email,
      firstName: this.udat.firstName,
      lastName: this.udat.lastName,
      phone: this.udat.mobile,
    };
    this.productData = {
      productId: this.pdat.productId,
      ProductName: this.pdat.productName,
      Price: this.pdat.productPrice,
    };
    this.totalPrice = this.pdat.productPrice;
    console.log(this.pdat);

    this.orderData = {
      amount: this.totalPrice * 100,
      orderId: `${this.userData.email}_${this.productData.productId}`,
      userId: this.userData.userId,
      productId: this.productData.productId.toString(),
      payerName: this.userData.firstName + this.userData.lastName,
      payerEmail: this.userData.email,
      payerPhone: this.userData.phone,
      dateTimeofPurchase: new Date(),
      razorpay_payment_id: '0',
      razorpay_order_id: '0',
      razorpay_signature: '0',
    };

    localStorage.setItem('currentOrderid', this.orderData.orderId);

    console.log(this.orderData);
    localStorage.setItem('orderAmount', this.orderData.amount);
    localStorage.setItem('productId', this.orderData.productId);
    console.log(this.orderData.productId);

    this.svc.createOrder(this.orderData).subscribe(
      (response: any) => {
        this.returnedData = response;
        console.log(response);
        alert('Your order has been confirmed, Now U can Pay');
      },
      (error: Error) => {
        console.error('Error has occured:', error);
      }
    );

    this.showConfirmButton = false;
    this.showPayButton = true;
  }

  Paynow() {
    console.log(this.orderData.amount / 100);
    console.log(this.coin);
    alert(`You are paying by RazorPay`);
    this.payWithRazor(this.returnedData.Attributes.id);

    this.dialogRef.close();
  }

  payWithCoin() {
    if (this.orderData.amount / 100 > this.coin) {
      // orderValue:Number = (this.orderData.amount)/100;
      alert(`Order amount is greater than your coin balance. Pay By RazorPay`);
    } else {
      alert('You are paying by coin');

      this.router.navigate(['coin']);
      this.dialogRef.close();
    }
  }

  payWithRazor(val: any) {
    const options: any = {
      key: 'rzp_test_ZYhg7PEw91YEjO',
      amount: this.returnedData.Attributes.amount,
      currency: 'INR',
      name: 'RentIdea',
      description: `Renting product with product id ${this.productData.productId}`,
      //image: '../../../assets/images/logo.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        escape: false,
      },
      notes: {},
      theme: {
        color: '#8B00FF',
      },
    };
    options.handler = (response: any, error: any) => {
      options.response = response;
      console.log(response);
      console.log(options);

      this.paymentId = response.razorpay_payment_id;
      this.emailobj.paymentId = this.paymentId;
      if (this.paymentId != null) {
        this.emailobj.subject = 'Payment Successfull';
        this.emailobj.body = `Payment of Amount ${
          options.amount / 100
        } is Sussessfull `;
      } else {
        this.emailobj.subject = 'Payment UnSuccessfull';
        this.emailobj.body = `Payment of Amount ${
          options.amount / 100
        } is UnSuccessfull `;
      }
      console.log(this.emailobj);

      this.sendmail.sendEmail(this.emailobj).subscribe(
        (response: any) => {
          console.log('Email sent successfully:', response);
        },
        (error: any) => {
          console.error('Error sending email:', error);
        }
      );

      this.svc.validatePayment(response).subscribe();
      this.router.navigate(['list-product']);

      // call your backend api to verify payment signature & capture transaction
    };
    options.modal.ondismiss = () => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    };

    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
