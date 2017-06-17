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
import {BarberLocation} from "../pages/barber-location/barber-location";
import {HotelPage} from "../pages/hotel/hotel";
import {AppointmentPage} from "../pages/appointment/appointment";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {UserProfilePage} from "../pages/user-profile/user-profile";
import { DatePickerComponent, DateSelectorDirective } from '../pages/datepicker/datepicker';
import { DatePickerService } from '../pages/datepicker/datepicker.service';
import { GoogleMaps } from '../pages/maps/maps';
import { Geolocation } from '@ionic-native/geolocation';

//import { SplashScreen } from '@ionic-native/splash-screen';


// import services
// end import services
// end import services

// import pages
// end import pages

const components = [ DatePickerComponent ];
const directives = [ DateSelectorDirective ];
const providers = [ DatePickerService ];


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
    components,
    directives,
    BarberLocation,
    GoogleMaps,

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
    BarberLocation,
    components,
    GoogleMaps

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
    providers,
    Geolocation,
    /* import services */
  ]
})
export class AppModule {
}
