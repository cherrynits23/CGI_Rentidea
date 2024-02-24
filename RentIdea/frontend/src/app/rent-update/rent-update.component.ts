import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateService } from '../Updateservice/update.service';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rent-update',
  templateUrl: './rent-update.component.html',
  styleUrls: ['./rent-update.component.css']
})
export class RentUpdateComponent implements OnInit {
  email:any;
  constructor(private router:Router,private svc:UpdateService,private fb :FormBuilder) { }
UpdateForm !: FormGroup;
  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.UpdateForm=this.fb.group({
      firstname:[''],
      lastname :[''],
      mobile :[''],
      address:[''],
      email :[this.email],
     password :[''],
     gender :[' '],
     state:[''],
     district:['']
    })
  }
  update_profile( ){
    
    this.svc.update_profile(this.UpdateForm.value ).subscribe();
    localStorage.setItem("Name",this.UpdateForm.value.firstname);
    console.log(this.UpdateForm.value.firstname);
    this.router.navigate(['profile']);
  }

}
