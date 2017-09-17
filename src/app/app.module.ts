import {NgModule} from "@angular/core";
import {IonicApp, IonicModule } from "ionic-angular";
import {MyApp} from "./app.component";
import {BrowserModule} from '@angular/platform-browser';
import {GalleryService} from "../services/gallery-service";
import {BarberService} from "../services/barber-service";
import {PricingPage} from "../pages/pricing/pricing";
import {HomePage} from "../pages/home/home";
import {BarberLocation} from "../pages/barber-location/barber-location";
import {LoginPage} from "../pages/login/login";
import {GetaTicketPage} from "../pages/get-a-ticket/get-a-ticket";
import {TicketConfirmationPage} from "../pages/ticket-confirmation/ticket-confirmation";
import {CreateUserPage} from "../pages/create-user/create-user";
import {PhoneNumberPage} from "../pages/phone-number/phone-number";
import {GalleryPage} from "../pages/gallery/gallery";
import {SettingsPage} from "../pages/settings/settings";
import {ProgressBarComponent} from "../pages/progress-bar/progress-bar";
//import { Facebook } from '@ionic-native/facebook';
import { GetAnAppointmentPage, DateSelectorDirective } from '../pages/getanappointment/getanappointment';
import {Alert} from '../pages/alert/alert';
import * as firebase from "firebase";
import { Keyboard } from '@ionic-native/keyboard';
import { SMS } from '@ionic-native/sms';

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
    LoginPage,
    GetaTicketPage,
    TicketConfirmationPage,
    GalleryPage,
    SettingsPage,
    components,
    directives,
    BarberLocation,
    Alert,
    CreateUserPage,
    PhoneNumberPage,
    ProgressBarComponent,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: false,
      autoFocusAssist: false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PricingPage,
    HomePage,
    LoginPage,
    GetaTicketPage,
    TicketConfirmationPage,
    GalleryPage,
    SettingsPage,
    BarberLocation,
    components,
    Alert,
    CreateUserPage,
    PhoneNumberPage,
  ],
  providers: [
    GalleryService,
    BarberService,
    GetaTicketPage,
    TicketConfirmationPage,
    GalleryPage,
    SettingsPage,
    Alert,
    CreateUserPage,
    PhoneNumberPage,
    Keyboard,
    SMS,
    //Facebook,
    providers,
    ProgressBarComponent
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
