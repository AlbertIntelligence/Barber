import {NgModule} from "@angular/core";
import {IonicApp, IonicModule } from "ionic-angular";
import {MyApp} from "./app.component";
import {BrowserModule} from '@angular/platform-browser';
import {GalleryService} from "../services/gallery-service";
import {BarberService} from "../services/barber-service";
import {HomePage} from "../pages/home/home";
import {BarberLocation} from "../pages/barber-location/barber-location";
import {GetaTicketPage} from "../pages/get-a-ticket/get-a-ticket";
import {TicketConfirmationPage} from "../pages/ticket-confirmation/ticket-confirmation";
import {AppointmentConfirmationPage} from "../pages/appointment-confirmation/appointment-confirmation";
import {CheckInConfirmationPage} from "../pages/checkin-confirmation/checkin-confirmation";
import {TicketCancellationConfirmationPage} from "../pages/ticket-cancellation-confirmation/ticket-cancellation-confirmation";
import {PhoneNumberPage} from "../pages/phone-number/phone-number";
import {GalleryPage} from "../pages/gallery/gallery";
import {SettingsPage} from "../pages/settings/settings";
import {TermsAndConditionsPage} from "../pages/terms-and-conditions/terms-and-conditions";
import { GetAnAppointmentPage, DateSelectorDirective } from '../pages/getanappointment/getanappointment';
import { GetAnAppointmentModel } from '../pages/getanappointment/GetAnAppointmentModel';
import * as firebase from "firebase";
import { Keyboard } from '@ionic-native/keyboard';
import { HttpModule } from '@angular/http';
import { Stripe } from '@ionic-native/stripe';
import { Network } from '@ionic-native/network';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Push } from '@ionic-native/push';
import { AppUpdate } from '@ionic-native/app-update';

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
    HomePage,
    GetaTicketPage,
    TicketConfirmationPage,
    AppointmentConfirmationPage,
    CheckInConfirmationPage,
    TicketCancellationConfirmationPage,
    GalleryPage,
    SettingsPage,
    TermsAndConditionsPage,
    components,
    directives,
    BarberLocation,
    PhoneNumberPage,
    GetAnAppointmentModel,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxQRCodeModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: false,
      autoFocusAssist: false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GetaTicketPage,
    TicketConfirmationPage,
    AppointmentConfirmationPage,
    CheckInConfirmationPage,
    TicketCancellationConfirmationPage,
    GalleryPage,
    SettingsPage,
    TermsAndConditionsPage,
    BarberLocation,
    components,
    PhoneNumberPage,
  ],
  providers: [
    GalleryService,
    BarberService,
    GetaTicketPage,
    TicketConfirmationPage,
    AppointmentConfirmationPage,
    CheckInConfirmationPage,
    TicketCancellationConfirmationPage,
    GalleryPage,
    SettingsPage,
    TermsAndConditionsPage,
    PhoneNumberPage,
    Keyboard,
    Stripe,
    Network,
    SplashScreen,
    BarcodeScanner,
    Push,
    providers,
    AppUpdate
    /* import services */
  ]
})
export class AppModule {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyActqu9p_osGQHbZQoELX5XyQ9mOzaxJFY",
      authDomain: "barbermegeneric.firebaseapp.com",
      databaseURL: "https://barbermegeneric.firebaseio.com",
      projectId: "barbermegeneric",
      storageBucket: "barbermegeneric.appspot.com",
      messagingSenderId: "456698378380"
    });
  }
}
