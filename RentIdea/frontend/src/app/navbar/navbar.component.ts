import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { registrationmodel } from '../Models/registrationmodel';
import { UpdateService } from '../Updateservice/update.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  email:any;
  userData?: registrationmodel;

  isLoggedIn: boolean;
  showUserMenu: boolean = false;

  constructor(private router:Router, private svc: UpdateService) {
    this.isLoggedIn = this.checkLoginStatus();
   }

   ngOnInit() {
    // Check the login status when the component initializes
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
    localStorage.removeItem('token');
    // localStorage.removeItem('email');
    this.isLoggedIn = false;
    window.location.reload();
    // this.router.navigate(['/Home']);
  }

  navigateToHomeProduct(){
    this.router.navigate(['/Home']); 
  }

  navigateToListProduct() {
    this.router.navigate(['/list-product']);
  }

  toggleUserMenu() {
    // Toggle the user menu
    this.showUserMenu = !this.showUserMenu;
}

}
