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
import {AboutPage} from "../pages/about/about";
import {AccountPage} from "../pages/account/account";
import {CarDetailPage} from "../pages/car-detail/car-detail";
import {CarsPage} from "../pages/cars/cars";
import {CheckoutCarPage} from "../pages/checkout-car/checkout-car";
import {CheckoutFlightPage} from "../pages/checkout-flight/checkout-flight";
import {CheckoutHotelPage} from "../pages/checkout-hotel/checkout-hotel";
import {CheckoutTripPage} from "../pages/checkout-trip/checkout-trip";
import {ContactPage} from "../pages/contact/contact";
import {FilterDatePage} from "../pages/filter-date/filter-date";
import {FilterGuestPage} from "../pages/filter-guest/filter-guest";
import {FlightsPage} from "../pages/flights/flights";
import {HomePage} from "../pages/home/home";
import {HotelPage} from "../pages/hotel/hotel";
import {HotelDetailPage} from "../pages/hotel-detail/hotel-detail";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {ReviewsPage} from "../pages/reviews/reviews";
import {SearchCarsPage} from "../pages/search-cars/search-cars";
import {SearchFlightPage} from "../pages/search-flight/search-flight";
import {SearchHotelPage} from "../pages/search-hotel/search-hotel";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {SearchTripsPage} from "../pages/search-trips/search-trips";
import {TabReviewsPage} from "../pages/tab-reviews/tab-reviews";
import {TabsPage} from "../pages/tabs/tabs";
import {TripDetailPage} from "../pages/trip-detail/trip-detail";
import {TripsPage} from "../pages/trips/trips";
import {UserProfilePage} from "../pages/user-profile/user-profile";

// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AccountPage,
    CarDetailPage,
    CarsPage,
    CheckoutCarPage,
    CheckoutFlightPage,
    CheckoutHotelPage,
    CheckoutTripPage,
    ContactPage,
    FilterDatePage,
    FilterGuestPage,
    FlightsPage,
    HomePage,
    HotelPage,
    HotelDetailPage,
    LoginPage,
    RegisterPage,
    ReviewsPage,
    SearchCarsPage,
    SearchFlightPage,
    SearchHotelPage,
    SearchLocationPage,
    SearchTripsPage,
    TabReviewsPage,
    TabsPage,
    TripDetailPage,
    TripsPage,
    UserProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AccountPage,
    CarDetailPage,
    CarsPage,
    CheckoutCarPage,
    CheckoutFlightPage,
    CheckoutHotelPage,
    CheckoutTripPage,
    ContactPage,
    FilterDatePage,
    FilterGuestPage,
    FlightsPage,
    HomePage,
    HotelPage,
    HotelDetailPage,
    LoginPage,
    RegisterPage,
    ReviewsPage,
    SearchCarsPage,
    SearchFlightPage,
    SearchHotelPage,
    SearchLocationPage,
    SearchTripsPage,
    TabReviewsPage,
    TabsPage,
    TripDetailPage,
    TripsPage,
    UserProfilePage
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
    UserProfilePage
    /* import services */
  ]
})
export class AppModule {
}
