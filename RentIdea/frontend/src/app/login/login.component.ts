import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../AuthServices/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginform !: FormGroup;
  loginForm = {email: '', password: ''}
//token !: any
  constructor(private fb: FormBuilder,private router:Router,private svc:AuthService, private snackBar: MatSnackBar ) { }
  ngOnInit():void{
    this.loginform=this.fb.group({
      email :['',Validators.required],
     password :['',Validators.required]
    })
  }
  Onsubmit(){
    if(this.loginform.valid){
      
          console.log(this.loginform.value);
          this.loginForm = this.loginform.value;
          this.svc.OnLogin(this.loginform.value).subscribe(
               {
            next :(res:any)=>{
              
               const token=res.token;
               localStorage.setItem('token',token);
               localStorage.setItem('email',this.loginForm.email);
               // Use MatSnackBar to show the success message
          this.snackBar.open('Login successful', 'Close', {
            duration: 5000, // Adjust the duration as needed (in milliseconds)
            panelClass: ['success-snackbar'], // Define a custom CSS class for styling
          });
              // alert("login successfull");
               console.log(token);
              // this.router.navigate(['update']);
              this.router.navigate(['list-product']); //
              
            },
            error:(err=>{
              //alert('Email or Password is not Valid');
              // Use MatSnackBar for error message
          this.snackBar.open('Email or Password is not Valid', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
              this.loginform.reset();
            })
          }
          );        
 
    }else{
        this.Validateall(this.loginform);
        alert("Form is invalid");
    }
  }
  private Validateall(formgroup : FormGroup){
      Object.keys(formgroup.controls).forEach(field =>{
        const control=formgroup.get(field);
        if(control instanceof FormControl){
          control.markAsDirty({onlySelf : true});

        }else if(control instanceof FormGroup){
               this.Validateall(control);

        }

      })
  }
  hide = true;

  forgetPassword() {
    this.router.navigate(['forgetpass']);
  }

}