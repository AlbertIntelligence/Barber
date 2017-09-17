import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {GetaTicketPage} from "../get-a-ticket/get-a-ticket";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public firstName:any;
  public lastName:any;
  public email:any;

  constructor(public nav: NavController,public getTicket?:GetaTicketPage) {
    this.firstName = getTicket.userInfoFirstName;
    this.lastName = getTicket.userInfoLastName;
    this.email = this.getTicket.userInfoEmailName;
  }

  /*****************************************************************************
  Function: logout
  Purpose: Pushes the login page
  Parameters: None
  Return: None
  *****************************************************************************/
  logout() {
    this.nav.setRoot(LoginPage);
  }


}
