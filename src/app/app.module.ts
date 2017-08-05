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
import {PricingPage} from "../pages/pricing/pricing";
import {TicketConfirmationPage} from "../pages/ticket-confirmation/ticket-confirmation";
import {HomePage} from "../pages/home/home";
import {BarberLocation} from "../pages/barber-location/barber-location";
import {HotelPage} from "../pages/hotel/hotel";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {UserProfilePage} from "../pages/user-profile/user-profile";
import {CreateUserPage} from "../pages/create-user/create-user";
//import { Facebook } from '@ionic-native/facebook';
import { GetAnAppointmentPage, DateSelectorDirective } from '../pages/getanappointment/getanappointment';
import {Alert} from '../pages/alert/alert';
import * as firebase from "firebase";

// import services
// end import services
// end import services

// import pages
// end import pages

const components = [ GetAnAppointmentPage ];
const directives = [ DateSelectorDirective ];
const providers = [ ];


@NgModule({
  declarations: [
    MyApp,
    PricingPage,
    HomePage,
    HotelPage,
    LoginPage,
    RegisterPage,
    UserProfilePage,
    TicketConfirmationPage,
    components,
    directives,
    BarberLocation,
    Alert,
    CreateUserPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PricingPage,
    HomePage,
    HotelPage,
    LoginPage,
    RegisterPage,
    UserProfilePage,
    TicketConfirmationPage,
    BarberLocation,
    components,
    Alert,
    CreateUserPage,
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
    Alert,
    //Facebook,
    providers,
    /* import services */
  ]
})
export class AppModule {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyBShXmN6TIS7xy2Tnr65NkCJbAEXM51g7Q",
      authDomain: "mpc-app-37f6f.firebaseapp.com",
      databaseURL: "https://mpc-app-37f6f.firebaseio.com",
      projectId: "mpc-app-37f6f",
      storageBucket: "mpc-app-37f6f.appspot.com",
      messagingSenderId: "351355658098"
    });
  }
}
