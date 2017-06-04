import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {HotelDetailPage} from "../hotel-detail/hotel-detail";
import {SearchHotelPage} from "../search-hotel/search-hotel";
import {SearchFlightPage} from "../search-flight/search-flight";
import {SearchCarsPage} from "../search-cars/search-cars";
import {SearchTripsPage} from "../search-trips/search-trips";
import {HotelPage} from "../hotel/hotel";
import {AccountPage} from "../account/account";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // list of hotels
  public hotels: any;

  constructor(public nav: NavController, public hotelService: HotelService) {
    // set sample data
    this.hotels = hotelService.getAll();
  }

  // view hotel detail
  viewHotel(hotelId) {
    this.nav.push(HotelDetailPage, {id: hotelId});
  }

  // view all hotels
  viewHotels() {
    this.nav.push(HotelPage);
  }

  // go to search hotel page
  searchHotel() {
    this.nav.push(SearchHotelPage);
  }

  // go to search flight page
  searchFlight() {
    this.nav.push(SearchFlightPage);
  }

  // go to search car page
  searchCar() {
    this.nav.push(SearchCarsPage);
  }

  // go to search trip page
  searchTrip() {
    this.nav.push(SearchTripsPage);
  }

  // to go account page
  goToAccount() {
    this.nav.push(AccountPage);
  }

}
