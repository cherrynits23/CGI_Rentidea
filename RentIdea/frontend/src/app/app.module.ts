import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { RegistrationComponent } from './registration/registration.component';
import { RentProfileComponent } from './rent-profile/rent-profile.component';
import { RentUpdateComponent } from './rent-update/rent-update.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { CoinComponent } from './coin/coin.component';
import { BookingComponent } from './booking/booking.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MyProductsComponent } from './my-products/my-products.component';


@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ViewProductComponent,
    ListProductComponent,
    BookingComponent,
    RentProfileComponent,RentUpdateComponent,HomeComponent,RegistrationComponent,LoginComponent, FooterComponent, NavbarComponent, ForgetpassComponent, BookingHistoryComponent, CoinComponent, MyProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    MatCardModule, MatButtonModule,
    MatSnackBarModule, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule,
    MatIconModule,MatToolbarModule, MatPaginatorModule,MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
