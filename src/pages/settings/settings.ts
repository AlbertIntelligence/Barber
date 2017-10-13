import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {PhoneNumberPage} from "../phone-number/phone-number";
import firebase from 'firebase';
import * as $ from 'jquery';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';
import {TermsAndConditionsPage} from "../terms-and-conditions/terms-and-conditions";


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
  private pushNotification: Boolean;
  private emailNotification: Boolean;
  private smsNotification: Boolean;

  constructor(public nav: NavController, private network: Network, private alertCtrl: AlertController) {
    this.updateUserAccounts();

    // watch network for a disconnect
    this.network.onDisconnect().subscribe(() => {
     this.showAlert('Pas de connexion internet', 'Vérifiez votre connexion internet.');
     this.logout();
    });

    this.network.onConnect().subscribe(() => {
     this.updateUserAccounts();
    });
  }

  /*****************************************************************************
  Function: logout
  Purpose: Pushes the login page
  Parameters: None
  Return: None
  *****************************************************************************/
  logout() {
    firebase.auth().signOut();
    this.nav.setRoot(PhoneNumberPage);
  }

  /*****************************************************************************
  Function: changeNotification
  Purpose: Save the notification status on change
  Parameters: type: Notification type
  Return: None
  *****************************************************************************/
  changeNotification(type: String) {
    var id = type + "Notification";
    var userId = firebase.auth().currentUser.uid;
    let controller = this;

    //Update notification status in db
    if (type == "push") {
      firebase.database().ref().child('/Users/' + userId).update({
        pushNotification: controller.pushNotification
      });
    }
    else if (type == "email") {
      firebase.database().ref().child('/Users/' + userId).update({
        emailNotification: controller.emailNotification
      });
    }
    else if (type == "sms") {
      firebase.database().ref().child('/Users/' + userId).update({
        smsNotification: controller.smsNotification
      });
    }
  }

  /*****************************************************************************
  Function: updateUserAccounts
  Purpose: Fetch user accounts from db
  Parameters: None
  Return: None
  *****************************************************************************/
  updateUserAccounts() {
    var userId = firebase.auth().currentUser.uid;
    let controller = this;
    firebase.database().ref('Users/')
     .on('value', function(snapshot) {
       let users = snapshot.val();
       for (var property in users) {
          if (users.hasOwnProperty(property)) {
              if (users[property].UserId == userId) {
                controller.userFirstName = users[property].firstName;
                controller.userLastName = users[property].lastName;
                controller.userEmail = users[property].email;
                controller.pushNotification = users[property].pushNotification;
                controller.emailNotification = users[property].emailNotification;
                controller.smsNotification = users[property].smsNotification;
              }
          }
       }
     });
  }

  /*****************************************************************************
  Function: showAlert
  Purpose: Display a pop-up alert to error messages
  Parameters: None
  Return: None
  *****************************************************************************/
  showAlert(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  /*****************************************************************************
  Function: goToTermsAndConditions
  Purpose: Open terms and conditions page
  Parameters: None
  Return: None
  *****************************************************************************/
  goToTermsAndConditions() {
    this.nav.push(TermsAndConditionsPage);
  }

}
