import {Component} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {HomePage} from "../home/home";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-pricing',
  templateUrl: 'pricing.html'
})
export class PricingPage {
  // hotel info
  public hotel: any;
  // room info
  public room: any;
  // number of nights
  public nights = 1;
  // number of guests
  public guests = 2;
  // date from
  public dateFrom = new Date();
  // date to
  public dateTo = new Date();

  constructor(public nav: NavController, public hotelService: HotelService, public toastCtrl: ToastController) {
    // set sample data
    this.hotel = hotelService.getItem(1);
    this.room = this.hotel.rooms[0];
  }

  // process send button
  send() {
    // send booking info

    // show message
    let toast = this.toastCtrl.create({
      message: 'Booking sent',
      duration: 2000,
      position: 'middle'
    });
    toast.present();

    // back to home page
    this.nav.setRoot(HomePage);
  }
}
