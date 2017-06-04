import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {SearchLocationPage} from "../search-location/search-location";
import {FilterGuestPage} from "../filter-guest/filter-guest";
import {FlightsPage} from "../flights/flights";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-search-flight',
  templateUrl: 'search-flight.html'
})
export class SearchFlightPage {
  // search condition
  public search = {
    from: "HAN - Hanoi",
    arrival: new Date().toISOString(),
    to: "DAD - Danang",
    depart: new Date().toISOString(),
    persons: 3
  }

  constructor(public nav: NavController) {
  }

  // choose place
  choosePlace() {
    this.nav.push(SearchLocationPage);
  }

  // choose number of guest
  chooseGuest() {
    this.nav.push(FilterGuestPage);
  }

  // go to result page
  doSearch() {
    this.nav.push(FlightsPage);
  }
}
