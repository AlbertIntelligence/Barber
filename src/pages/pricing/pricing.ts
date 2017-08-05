import {Component} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
import {GalleryService} from "../../services/gallery-service";
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
  public picture: any;
  // number of nights
  public nights = 1;
  // number of guests
  public guests = 2;
  // date from
  public dateFrom = new Date();
  // date to
  public dateTo = new Date();

  constructor(public nav: NavController, public galleryService: GalleryService, public toastCtrl: ToastController) {
    // set sample data
    this.picture = galleryService.getItem(1);
  }

  /*****************************************************************************
  Function: send
  Purpose: Quit the current page and display a toast message
  Parameters: None
  Return: None
  *****************************************************************************/
  send() {
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
