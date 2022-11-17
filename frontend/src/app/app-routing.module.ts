import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookRideComponent } from './book-ride/book-ride.component';
import { LoginComponent } from './login/login.component';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
import { SignupComponent } from './signup/signup.component';
import { MyridesComponent } from './myrides/myrides.component';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'myrides', component: MyridesComponent},
  { path: 'book-ride', component: BookRideComponent },
  { path: 'offer-ride', component: OfferRideComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
