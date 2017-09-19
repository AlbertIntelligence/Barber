import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {GalleryService} from "../../services/gallery-service";
import {GetAnAppointmentPage} from "../getanappointment/getanappointment";
import {GalleryPage} from "../gallery/gallery";
import {GetaTicketPage} from "../get-a-ticket/get-a-ticket";
import {BarberLocation} from "../barber-location/barber-location";
import {SettingsPage} from "../settings/settings";
import firebase from 'firebase';
import { Stripe } from '@ionic-native/stripe';
import { Http, Headers } from '@angular/http';


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public pictures: any;
  private userAccounts:Array<any> = [];

  constructor(public nav: NavController, public galleryService: GalleryService, public stripe: Stripe, public http: Http) {
    // set sample data
    this.pictures = galleryService.getAll();
    this.updateUserAccounts();
  }

  updateUserAccounts() {
    let controller = this;
    firebase.database().ref('Users/')
     .on('value', function(snapshot) {
       let users = snapshot.val();
       controller.userAccounts = [];
       for (var property in users) {
          if (users.hasOwnProperty(property)) {
              controller.userAccounts.push(users[property]);
          }
       }
     });
  }

  checkout () {
    var userId = firebase.auth().currentUser.uid;
    var user = this.userAccounts.find(item => item.UserId == userId);
    var token = user.cardToken.id;
    var email = user.email;
    this.pay(token, 500, email);
  }

  pay(token, amount, email) {
    var data = 'stripetoken=' + token + '&amount=' + amount + '&email=' + email;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    this.http.post('http://192.168.27.1:3333/processpay', data, { headers: headers }).subscribe((res) => {
      if (res.json().success) {
        console.log('transaction Successfull!!');
      } else {
        console.log('transaction failed!!');
      }
    });
  }

  /*****************************************************************************
  Function: getAnAppointment
  Purpose: Pushes Get an appointment page
  Parameters: None
  Return: None
  *****************************************************************************/
  getAnAppointment() {
    this.nav.push(GetAnAppointmentPage);
  }

  /*****************************************************************************
  Function: getTicket
  Purpose: Pushes Get a ticket page
  Parameters: None
  Return: None
  *****************************************************************************/
  getTicket() {
    this.nav.push(GetaTicketPage);
  }

  /*****************************************************************************
  Function: viewGallery
  Purpose: Pushes gallery page
  Parameters: None
  Return: None
  *****************************************************************************/
  viewGallery() {
    this.nav.push(GalleryPage);
  }

  /*****************************************************************************
  Function: goToSettings
  Purpose: Pushes settings page
  Parameters: None
  Return: None
  *****************************************************************************/
  goToSettings() {
    this.nav.push(SettingsPage);
  }

  /*****************************************************************************
  Function: goToBarberLocation
  Purpose: Pushes barber-location page
  Parameters: None
  Return: None
  *****************************************************************************/
  goToBarberLocation() {
    this.nav.push(BarberLocation);
  }

}
