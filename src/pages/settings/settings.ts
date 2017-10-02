import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {PhoneNumberPage} from "../phone-number/phone-number";
import firebase from 'firebase';


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

  private userFirstName: String;
  private userLastName: String;
  private userEmail: String;

  constructor(public nav: NavController) {
    this.updateUserAccounts();
  }

  /*****************************************************************************
  Function: logout
  Purpose: Pushes the login page
  Parameters: None
  Return: None
  *****************************************************************************/
  logout() {
    this.nav.setRoot(PhoneNumberPage);
  }

  /*****************************************************************************
  Function: updateUserAccounts
  Purpose: Fetch user accounts from db
  Parameters: None
  Return: None
  *****************************************************************************/
  updateUserAccounts() {
    let controller = this;
    firebase.database().ref('Users/')
     .on('value', function(snapshot) {
       let users = snapshot.val();
       for (var property in users) {
          if (users.hasOwnProperty(property)) {
              var userId = firebase.auth().currentUser.uid;
              if (users[property].UserId == userId) {
                controller.userFirstName = users[property].firstName;
                controller.userLastName = users[property].lastName;
                controller.userEmail = users[property].email;
              }
          }
       }
     });
  }


}
