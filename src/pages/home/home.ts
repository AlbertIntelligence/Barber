import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {AppointmentPage} from "../appointment/appointment";
import {HotelPage} from "../hotel/hotel";
import {AccountPage} from "../account/account";
import {UserProfilePage} from "../user-profile/user-profile";

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
    this.nav.push(AppointmentPage, {id: hotelId});
  }

  // view all hotels
  viewHotels() {
    this.nav.push(HotelPage);
  }

  // go to search hotel page
  getTicket() {
    this.nav.push(UserProfilePage);
  }



  // to go account page
  goToAccount() {
    this.nav.push(AccountPage);
  }

}
