import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {SearchLocationPage} from "../search-location/search-location";
import {FilterGuestPage} from "../filter-guest/filter-guest";
import {HotelPage} from "../hotel/hotel";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-search-hotel',
  templateUrl: 'search-hotel.html'
})
export class SearchHotelPage {
  // search condition
  public search = {
    name: "Hanoi Daewoo Hotel",
    persons: 3,
    from: new Date().toISOString(),
    to: new Date().toISOString()
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
    this.nav.push(HotelPage);
  }
}
