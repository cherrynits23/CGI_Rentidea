import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService} from 'src/app/services/product.service'
import { productmodel } from '../Models/productmodel';
import { DomSanitizer } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator'; 

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  pageSize = 6;
  currentPage = 0;
  pagedProducts: productmodel[] = [];
  constructor(private svc: ProductService, private router: Router, private sanitizer: DomSanitizer) { }

  list?: productmodel[];
  ngOnInit() {
    this.svc.listprdt().subscribe((data:any)=>
    {
      this.list=data.reverse();;
      console.log(this.list);
      this.updatePagedProducts();
    });
  }

  getImage(imageData: any){                                           
    const imageUrl = 'data:image/jpeg;base64,' + imageData;
    return this['sanitizer'].bypassSecurityTrustUrl(imageUrl);
 }

  viewItem(id: any) {
    // console.log(id);

    this.router.navigate([`/view-product`, id]);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.updatePagedProducts();
  }

  updatePagedProducts() {
    if (this.list) {
      const startIndex = this.currentPage * this.pageSize;
      this.pagedProducts = this.list.slice(startIndex, startIndex + this.pageSize);
    }
  }

  navigateToAddProduct(){
    this.router.navigate(['/add-product']); 
  }
}
