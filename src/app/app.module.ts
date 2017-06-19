import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {BrowserModule} from '@angular/platform-browser';
import {HotelService} from "../services/hotel-service";
import {PlaceService} from "../services/place-service";
import {ActivityService} from "../services/activity-service";
import {FlightService} from "../services/flight-service";
import {CarService} from "../services/car-service";
import {TripService} from "../services/trip-service";
import {AccountPage} from "../pages/account/account";
import {CheckoutHotelPage} from "../pages/checkout-hotel/checkout-hotel";
import {TicketConfirmationPage} from "../pages/ticket-confirmation/ticket-confirmation";
import {HomePage} from "../pages/home/home";
import {HotelPage} from "../pages/hotel/hotel";
import {AppointmentPage} from "../pages/appointment/appointment";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {UserProfilePage} from "../pages/user-profile/user-profile";
import { Facebook } from '@ionic-native/facebook';

// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    CheckoutHotelPage,
    HomePage,
    HotelPage,
    AppointmentPage,
    LoginPage,
    RegisterPage,
    UserProfilePage,
    TicketConfirmationPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    CheckoutHotelPage,
    HomePage,
    HotelPage,
    AppointmentPage,
    LoginPage,
    RegisterPage,
    UserProfilePage,
    TicketConfirmationPage,
  ],
  providers: [
    HotelService,
    PlaceService,
    ActivityService,
    FlightService,
    CarService,
    TripService,
    CarService,
    TripService,
    UserProfilePage,
    TicketConfirmationPage,
    Facebook
    /* import services */
  ]
})
export class AppModule {
}
