import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductService} from 'src/app/services/product.service'
import { productmodel } from '../Models/productmodel';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent{

  addForm : any = {productName:'',
  productPrice:0, categeory:'', subCategeory:'',
   company:'',productDescription:'', renterName:''
  };
  constructor(private svc: ProductService ,private router: Router,private sanitizer: DomSanitizer, private sb:MatSnackBar) { }

  selectedFile: any;
  addprdtobj? : any;
  
  onFileUpload(event: any){
    this.selectedFile = event.target.files[0]; 
  }

  onAdd() {
    const formData: FormData = new FormData();
   const Name=localStorage.getItem("Name");
   if(Name != this.addForm.renterName){
    this.openSnackBar("Match the Updated ProfileName");
    return;
   }
    //formData.append('productId',this.addForm.productId );
    formData.append('renterName',this.addForm.renterName );
    // formData.append('productId',this.addForm.productId );
    formData.append('productName',this.addForm.productName );
    formData.append('productPrice',this.addForm.productPrice );
    formData.append('categeory', this.addForm.categeory);
    formData.append('subCategeory', this.addForm.subCategeory);
    formData.append('company', this.addForm.company);
    formData.append('productdescription', this.addForm.productDescription);
    formData.append('productimage', this.selectedFile);
    this.svc.addprdt(formData).subscribe();
    console.log(this.addForm);
    this.openSnackBar("Product Added");
    this.router.navigate(['/list-product']);
  }  

  openSnackBar(msg:string) {
    this.sb.open(msg, "Close",
     {
      duration: 3000,
     verticalPosition:"bottom",
     horizontalPosition:"center"
    });
  }

}
