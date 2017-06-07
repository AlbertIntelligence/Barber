import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TicketConfirmationPage} from "../ticket-confirmation/ticket-confirmation";

/*
 Generated class for the UserProfile page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {
  constructor(public nav: NavController) {
  }

  // Open ticket confirmation view page
  getTicketConfirmation() {
    this.nav.push(TicketConfirmationPage);
  }
}
