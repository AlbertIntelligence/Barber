import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {FlightService} from "../../services/flight-service";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-checkout-flight',
  templateUrl: 'checkout-flight.html'
})
export class CheckoutFlightPage {

  constructor(public nav: NavController, public flightService: FlightService) {
  }
}
