import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../AuthServices/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  message?: any;
  Registerform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.Registerform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      coin: [500],
    });
  }
  Onsignup() {
    if (this.Registerform.valid) {
      console.log(this.Registerform.value);
      this.svc.OnSignup(this.Registerform.value).subscribe({
        next: (res: any) => {
          //alert(res.message);
          // Use MatSnackBar to show the success message
          this.snackBar.open(res.message, 'Close', {
            duration: 3000, // Adjust the duration as needed (in milliseconds)
            panelClass: ['success-snackbar'], // Define a custom CSS class for styling
          });

          //this.Registerform.reset();

          this.router.navigate(['Login']);
        },
        error: (err) => {
          //  alert('Email is already Exist');
          // Use MatSnackBar for error message
          this.snackBar.open('Email is already Exist', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });

          this.Registerform.reset();
        },
      });
    } else {
      this.Validateall(this.Registerform);
      //alert(' Registeration Form is invalid');
      // Use MatSnackBar for form validation message
      this.snackBar.open('Enter valid email-id', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    }
  }
  private Validateall(formgroup: FormGroup) {
    Object.keys(formgroup.controls).forEach((field) => {
      const control = formgroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.Validateall(control);
      }
    });
  }
}