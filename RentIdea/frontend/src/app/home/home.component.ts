import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateService } from '../Updateservice/update.service';
import { registrationmodel } from '../Models/registrationmodel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email:any;
  userData?: registrationmodel;
  isLoggedIn: boolean;
  showUserMenu: boolean = false;
  constructor(private router:Router, private svc: UpdateService) {
    this.isLoggedIn = this.checkLoginStatus();
   }

  ngOnInit(): void {
    // window.location.reload();
    this.isLoggedIn = this.checkLoginStatus();
    this.email = localStorage.getItem('email');
    if (this.email != null) {
      this.svc.add_profile(this.email).subscribe((data: any) => {
        localStorage.setItem('coin', data.coin);
        this.userData = data;
      });
    } else {
      this.router.navigate(['login']);
    }
    console.log(this.email);
  }

  checkLoginStatus(): boolean {
    // Check if a token exists in the local storage
    const token = localStorage.getItem('token');
    return token !== null;
  }

  logout() {
    // Implement a logout method to remove the token from local storage
    // localStorage.removeItem('token');
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/Home']);
    window.location.reload();
  }

// LogOut(){
//   this.router.navigate(['Register']);
//   localStorage.clear();
// }

navigateToListProduct() {
  this.router.navigate(['/list-product']);
}

toggleUserMenu() {
  // Toggle the user menu
  this.showUserMenu = !this.showUserMenu;
}

}
