import {Component} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {HomePage} from "../home/home";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-checkout-trip',
  templateUrl: 'checkout-trip.html'
})
export class CheckoutTripPage {
  // trip data
  public trip: any;
  // number of adults
  public adults = 1;
  // date
  public date = new Date();

  constructor(public nav: NavController, public tripService: TripService, public toastCtrl: ToastController) {
    // set sample data
    this.trip = tripService.getItem(1);
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
