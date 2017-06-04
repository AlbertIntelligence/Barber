import {Component} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
import {CarService} from "../../services/car-service";
import {HomePage} from "../home/home";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-checkout-car',
  templateUrl: 'checkout-car.html'
})
export class CheckoutCarPage {
  // car shop information
  public shop: any;
  // car info
  public car: any;
  // date from
  public dateFrom = new Date();
  // date to
  public dateTo = new Date();

  constructor(public nav: NavController, public carService: CarService, public toastCtrl: ToastController) {
    // set sample data
    this.shop = carService.getItem(1);
    this.car = this.shop.cars[0];
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
