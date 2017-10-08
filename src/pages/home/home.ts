import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
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
  public numberClientWaiting = 0;
  public numberClientWaitingStandByList = 0;
  public numberClientWaitingTicketList = 0;
  public numberClientWaitingReservation= 0;
  public directMessages:any;
  private nbOfBarbers:any=4;
  private estimatedWaitingTime:any;
  private checkInMessage:any = "Mario Perfect Cut";

  constructor(public nav: NavController, public galleryService: GalleryService, public alertCtrl: AlertController,
              private barcodeScanner: BarcodeScanner, public progress:ProgressBarComponent) {

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
    //ticket list
    const listOfUsers = firebase.database().ref('TicketList/Users/');
    listOfUsers.on('value', function(snapshot) {
      var numberClientWaitingTicketList = 0;
      snapshot.forEach(function(childSnapshot) {
        numberClientWaitingTicketList++;
      }.bind(this));
      this.numberClientWaitingTicketList = numberClientWaitingTicketList
      this.numberClientWaiting = this.numberClientWaitingTicketList + this.numberClientWaitingStandByList;
    }.bind(this));

    //stand by list
    const users = firebase.database().ref('StandByList/Users/');
    users.on('value', function(snapshot) {
      var numberClientWaitingStandByList = 0;
      snapshot.forEach(function(childSnapshot) {
        numberClientWaitingStandByList++;
      }.bind(this));
      this.numberClientWaitingStandByList = numberClientWaitingStandByList;
      this.numberClientWaiting = this.numberClientWaitingTicketList + this.numberClientWaitingStandByList;
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
      if (barcodeData.text == this.checkInMessage) {
        this.showAlert('Confirmation', 'Votre présence est confirmée.');
        this.checkInUser();
      } else {
        this.showAlert('Code erroné', 'Veuillez scanner un code valide.');
      }
    });
  }

  checkInUser() {
    var userId = firebase.auth().currentUser.uid;
    var timeStamp = new Date().getTime().toString();
    let controller = this;

    firebase.database().ref('TicketList/Users/')
     .on('value', function(snapshot) {
       let tickets = snapshot.val();
       for (var property in tickets) {
          if (tickets.hasOwnProperty(property)) {
              if (tickets[property].UserId == userId) {
                firebase.database().ref().child('TicketList/Users/' + property).update({
                  hasCheckedIn: true,
                  checkInTime: timeStamp
                });
              }
          }
       }
     });

     firebase.database().ref('Appointments/Users/')
      .on('value', function(snapshot) {
        let appointments = snapshot.val();
        for (var property in appointments) {
           if (appointments.hasOwnProperty(property)) {
               if (appointments[property].UserId == userId) {
                 firebase.database().ref().child('Appointments/Users/' + property).update({
                   hasCheckedIn: true,
                   checkInTime: timeStamp
                 });
               }
           }
        }
      });
  }

  /*****************************************************************************
  Function: showAlert
  Purpose: Display a pop-up alert to notify user on reservation conflict
  Parameters: None
  Return: None
  *****************************************************************************/
  showAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
