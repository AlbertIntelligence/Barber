import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-search-trips',
  templateUrl: 'search-trips.html'
})
export class SearchTripsPage {
  // search condition
  public search = {
    name: "Location",
    date: new Date().toISOString()
  }

  constructor(public nav: NavController) {
  }

  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }

  // choose place
  choosePlace() {
    this.nav.push(SearchLocationPage);
  }
}
