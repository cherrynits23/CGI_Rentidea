import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService} from '../services/product.service'
import { productmodel } from '../Models/productmodel';
import { registrationmodel } from '../Models/registrationmodel';
import { DomSanitizer } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator'; 

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent {
  pageSize = 6;
  currentPage = 0;
  pagedProducts: productmodel[] = [];

  renterName: any;
  constructor(private svc: ProductService, private router: Router, private sanitizer: DomSanitizer) {
    // this.route.params.subscribe((params) => {
    //   // console.log(params['id']);

    //   this.id = params['id'];
    // });
   }

  list?: productmodel[];

  ngOnInit() {   
     this.renterName = localStorage.getItem("Name");
   
    this.svc.renterlist(this.renterName).subscribe((data:any)=>
    {
      this.list=data;
      
    })
  }
  
  
  
  deleteItem(id: any){
    console.log(id);

    this.svc.deleteprdt(id).subscribe();
    window.location.reload();
    this.router.navigate(['/list-product']);
    
     
  
  }

  getImage(imageData: any){                                           
    const imageUrl = 'data:image/jpeg;base64,' + imageData;
    return this['sanitizer'].bypassSecurityTrustUrl(imageUrl);
 }

  viewItem(id: any) {
    // console.log(id);

    this.router.navigate([`/view-product`, id]);
  }

  // onPageChange(event: any) {
  //   this.currentPage = event.pageIndex;
  //   this.updatePagedProducts();
  // }

  // updatePagedProducts() {
  //   if (this.list) {
  //     const startIndex = this.currentPage * this.pageSize;
  //     this.pagedProducts = this.list.slice(startIndex, startIndex + this.pageSize);
  //   }
  // }

  navigateToAddProduct(){
    this.router.navigate(['/add-product']); 
  }
}