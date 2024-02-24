import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { productmodel } from '../Models/productmodel';
import { DomSanitizer } from '@angular/platform-browser';
import {FormGroup, FormControl} from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  isDatePickerOpen = false;

  toggleDatePicker() {
    this.isDatePickerOpen = !this.isDatePickerOpen;
  }
  @Input() isOpen = false;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  showAdditionalContent = false;

  id: any;
  userid: any;
  showConfirmation: any;
  constructor(
    private svc: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dialogCrearef: MatDialog,
    private cdr: ChangeDetectorRef,
    private user: UserserviceService
  ) {
    this.showConfirmation = false;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  view?: productmodel = {};
  udat: any;

  ngOnInit(): void {
    console.log(this.id);

    this.svc.viewprdt(this.id).subscribe((data: any) => {
      this.view = data;
      console.log(this.view);
      this.user.getuser(this.userid).subscribe((response: any) => {
        this.udat = response;
        console.log(this.udat);
      });
    });
  }

  getImage(imageData: any){                                           
    const imageUrl = 'data:image/jpeg;base64,' + imageData;
    return this['sanitizer'].bypassSecurityTrustUrl(imageUrl);
 }

 mydata: any;
  navigateToListProduct() {
    this.mydata = { udat: this.udat, pdat: this.view };
    this.dialogCrearef.open(BookingComponent, { data: this.mydata });
    //this.router.navigate(['/Booking', this.id]);
    this.showConfirmation = true;
    this.cdr.detectChanges();
  }
}