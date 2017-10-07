import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {GalleryService} from "../../services/gallery-service";
import {GetAnAppointmentPage} from "../getanappointment/getanappointment";
import {GalleryPage} from "../gallery/gallery";
import {GetaTicketPage} from "../get-a-ticket/get-a-ticket";
import {BarberLocation} from "../barber-location/barber-location";
import {SettingsPage} from "../settings/settings";
import firebase from 'firebase';
import {ProgressBarComponent} from "../progress-bar/progress-bar";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

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
  public numberClientWaitingTicketList = 0;
  public numberClientWaitingReservation= 0;
  public directMessages:any;
  private nbOfBarbers:any=4;
  private estimatedWaitingTime:any;

  constructor(public nav: NavController, public galleryService: GalleryService,
              private barcodeScanner: BarcodeScanner, public progress:ProgressBarComponent) {
    // set sample data
    this.pictures = galleryService.getAll();
    this.ClientWaiting();
    this.TotalReservation();
    this.DirectMessages();
    this.calculateWaitingTime();
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

  ClientWaiting() {
    const listOfUsers = firebase.database().ref('TicketList/Users/');
    listOfUsers.on('value', function(snapshot) {
      var numberClientWaitingTicketList = 0;
      snapshot.forEach(function(childSnapshot) {
        numberClientWaitingTicketList++;
      }.bind(this));
      this.numberClientWaitingTicketList = numberClientWaitingTicketList
      this.calculateWaitingTime();
    }.bind(this));
  }

  TotalReservation() {
    const listOfUsers = firebase.database().ref('Appointments/Users/');
    listOfUsers.on('value', function(snapshot) {
      var numberClientWaitingReservation = 0;
      snapshot.forEach(function(childSnapshot) {
        numberClientWaitingReservation++;
      }.bind(this));
      this.numberClientWaitingReservation = numberClientWaitingReservation
    }.bind(this));
  }

  DirectMessages() {
    const liveMessages = firebase.database().ref('Messages/live/');
    liveMessages.on('value' , snap =>  this.directMessages =   snap.val()  ).bind(this);
  }

  /*****************************************************************************
  Function: calculateWaitingTime
  Purpose: Calculates the estimated user waiting time
  Parameters: None
  Return: None
  *****************************************************************************/
  calculateWaitingTime() {
    if (this.nbOfBarbers == 0) {
      this.estimatedWaitingTime = "";
    } else if (this.numberClientWaitingTicketList == 0) {
      this.estimatedWaitingTime = "Moins de 30 minutes";
    } else {
      this.estimatedWaitingTime = Math.ceil(this.numberClientWaitingTicketList/this.nbOfBarbers) * 30;
    }
  }

  /*****************************************************************************
  Function: scanQrCode
  Purpose: Scans the qr code to check in the user
  Parameters: None
  Return: None
  *****************************************************************************/
  scanQrCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      alert(barcodeData.text);
    });
  }

}
