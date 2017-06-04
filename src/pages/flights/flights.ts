import {Component} from "@angular/core";
import {NavController, ActionSheetController} from "ionic-angular";
import {FlightService} from "../../services/flight-service";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-flights',
  templateUrl: 'flights.html'
})
export class FlightsPage {
  // list of lights
  public flights: any;

  constructor(public nav: NavController, public flightService: FlightService, public actionSheetController: ActionSheetController) {
    // set sample data
    this.flights = flightService.getAll();
  }

  // go to search page when click search button
  goToSearch() {
    this.nav.pop();
  }

  // show sort order
  sort() {
    let actionSheet = this.actionSheetController.create({
      title: 'Sort by',
      buttons: [
        {
          text: 'Price',
          handler: () => {
            // add your code here
          }
        },
        {
          text: 'Departure Time',
          handler: () => {
            // add your code here
          }
        },
        {
          text: 'Arrival Time',
          handler: () => {
            // add your code here
          }
        },
        {
          text: 'Duration',
          handler: () => {
            // add your code here
          }
        }
      ]
    });
    actionSheet.present();
  }

  // go to checkout page
  checkout() {
    //this.nav.push(CheckoutFlightPage);
  }
}
