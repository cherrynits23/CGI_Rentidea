export class BookingModel {
    productId?: number;
    productName?: string;
    productCategory?: string;
    amount?: number;
    //company?: string;
    image?: File;
    //productDescription: string;
    orderId?: string;
    payerName?: string;
    sellerName?: string;
    dateOfTransaction?: Date;
    
dateTimeofPurchase?: Date;
    payerPhone:number;
    
PayerName?:string;
    userId?:string;
    ayerEmail?:string;
    
razorpay_payment_id?:string;
  
    constructor(data: any) {
      //this.productDescription="";
      //this.dateOfTransaction = new Date(data.dateOfTransaction);
      this.dateTimeofPurchase = new Date(data.dateTimeofPurchase);
      this.payerPhone=0;
    }
  }