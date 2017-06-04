import {Component} from "@angular/core";
import {NavController} from "ionic-angular";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html'
})
export class SearchLocationPage {
  // places
  public places = {
    nearby: [
      {
        id: 1,
        name: "Current Location"
      },
      {
        id: 2,
        name: "Hanoi, Vietnam"
      },
      {
        id: 3,
        name: "Halong Bay, Vietnam"
      }
    ],
    recent: [
      {
        id: 1,
        name: "Hanoi"
      }
    ]
  };

  constructor(public nav: NavController) {
  }

  // search by item
  searchBy(id) {
    // go back search hotel page
    this.nav.pop();
  }
}
