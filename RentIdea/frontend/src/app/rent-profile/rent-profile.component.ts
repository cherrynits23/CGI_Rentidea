import { Component, OnInit } from '@angular/core';
import {UpdateService} from '../Updateservice/update.service';
@Component({
  selector: 'app-rent-profile',
  templateUrl: './rent-profile.component.html',
  styleUrls: ['./rent-profile.component.css']
})
export class RentProfileComponent implements OnInit {
  email: any;

  constructor(private svc:UpdateService) { }
profiles : any;
 // email:any;
  ngOnInit(): void {
   // this.svc.add_profile(profiles.email).subscribe(data=>this.profiles=data);
   this.email = localStorage.getItem('email');
   this.svc.add_profile(this.email).subscribe((data: any) => {
    this.profiles= data;
    console.log(this.profiles);
  });
  }

}
  
