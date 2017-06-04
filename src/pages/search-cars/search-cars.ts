import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {CarsPage} from "../cars/cars";
import {SearchLocationPage} from "../search-location/search-location";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-search-cars',
  templateUrl: 'search-cars.html'
})
export class SearchCarsPage {
  // search condition
  public search = {
    pickup: "Hanoi - Vietnam",
    dropOff: "Same as pickup",
    from: new Date().toISOString(),
    to: new Date().toISOString(),
  };

  constructor(public nav: NavController) {
  }

  // choose place
  choosePlace() {
    this.nav.push(SearchLocationPage);
  }

  // go to result page
  doSearch() {
    this.nav.push(CarsPage);
  }
}
