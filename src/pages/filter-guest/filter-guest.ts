import {Component} from "@angular/core";
import {NavController} from "ionic-angular";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-filter-guest',
  templateUrl: 'filter-guest.html'
})
export class FilterGuestPage {
  // number of adults
  public adults = 2;

  // number of children
  public children = 1;

  constructor(public nav: NavController) {
  }

  // minus adult when click minus button
  minusAdult() {
    this.adults--;
  }

  // plus adult when click plus button
  plusAdult() {
    this.adults++;
  }

  // minus children when click minus button
  minusChildren() {
    this.children--;
  }

  // plus children when click plus button
  plusChildren() {
    this.children++;
  }

  // go to search hotel page
  goToSearch() {
    this.nav.pop();
  }
}
