import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './list-product/list-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RentProfileComponent } from './rent-profile/rent-profile.component';
import { RentUpdateComponent } from './rent-update/rent-update.component';
import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from './Guard/authguard.guard';
import { BookingComponent } from './booking/booking.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { CoinComponent } from './coin/coin.component';
import { MyProductsComponent } from './my-products/my-products.component';

const routes: Routes = [
  { path: 'list-product', component: ListProductComponent,canActivate:[AuthguardGuard]},
  {
    path: `view-product/:id`,
    pathMatch: 'prefix',
    component: ViewProductComponent,
  },
  { path: 'add-product', component: AddProductComponent},
  { path: '', redirectTo: './list-product', pathMatch: 'full',},
  { path: 'coin', component: CoinComponent },

  {path : 'Login',component: LoginComponent},
  {path : 'Register',component:RegistrationComponent},
  {path:"profile", component:RentProfileComponent,canActivate:[AuthguardGuard]},
  {path:"update", component:RentUpdateComponent,canActivate:[AuthguardGuard]},
    // {path:"Home", component:HomeComponent,canActivate:[AuthguardGuard]},
    {path:"Home", component:HomeComponent},
    {path: 'my-products', component: MyProductsComponent},
    {path:"Booking/:id", component:BookingComponent},  
    {path:"forgetpass", component:ForgetpassComponent},
    {path:`BookingHistory/:email`,pathMatch: 'prefix', component:BookingHistoryComponent, canActivate:[AuthguardGuard]},
    // {path:"list-product", component:ListProductComponent,canActivate:[AuthguardGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
