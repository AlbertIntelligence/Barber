import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {DatePickerComponent} from "../datepicker/datepicker";
import {AccountPage} from "../account/account";
import {HotelPage} from "../hotel/hotel";
import {UserProfilePage} from "../user-profile/user-profile";
import {BarberLocation} from "../barber-location/barber-location";


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

  public hotels: any;

  constructor(public nav: NavController, public hotelService: HotelService) {
    // set sample data
    this.hotels = hotelService.getAll();
  }

  // view hotel detail
  getAnAppointment() {
    this.nav.push(DatePickerComponent);
  }

  // go to search hotel page
  getTicket() {
    this.nav.push(UserProfilePage);
  }

  // view all hotels
  viewGallery() {
    this.nav.push(HotelPage);
  }

  // to go account page
  goToAccount() {
    this.nav.push(AccountPage);
  }

  // to go account page
  goToBarberLocation() {
    this.nav.push(BarberLocation);
  }

}
