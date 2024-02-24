import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { BookingHistoryService } from 'src/app/services/booking-history.service';
import {} from '../Models/BookingModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css'],
})
export class BookingHistoryComponent implements OnInit {
  Books: any = [];
  Books1: any[] = [];
  datePipe: DatePipe = new DatePipe('en-US');
  cardsPerPage: number = 4;
  public selectedPage = 1;
  email!: string;
  userid?: string | null;
  constructor(
    private svc: BookingHistoryService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,private route: ActivatedRoute,
  ) {}
  getBookings(email:string) {
    this.svc.getBook(email).subscribe((data) => (this.Books = data));
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // console.log(params['id']);
      this.email = params['email'];
      this.userid = localStorage.getItem('email')
    });
  this.getBookings(this.Books);
  console.log(this.getBookings(this.email));
    let pageIndex = (this.selectedPage - 1) * this.cardsPerPage;
    this.Books1 = this.Books.slice(pageIndex, this.cardsPerPage);
  }
  

  getImage(imageData: any) {
    const imageUrl = 'data:image/jpeg;base64,' + imageData;
    return this['sanitizer'].bypassSecurityTrustUrl(imageUrl);
  }
  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.cardsPerPage = Number(newSize);
    this.changePage(1);
  }
  changePage(page: any) {
    this.selectedPage = page;
    this.slicedProducts();
  }
  slicedProducts() {
    let pageIndex = (this.selectedPage - 1) * this.cardsPerPage;
    let endIndes =
      (this.selectedPage - 1) * this.cardsPerPage + this.cardsPerPage;
    this.Books1 = [];
    this.Books1 = this.Books.slice(pageIndex, endIndes);
  }
  get PageNumbers(): number[] {
    return Array(Math.ceil(this.Books.length / this.cardsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }
}
