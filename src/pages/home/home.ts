import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {GalleryService} from "../../services/gallery-service";
import {GetAnAppointmentPage} from "../getanappointment/getanappointment";
import {CheckInConfirmationPage} from "../checkin-confirmation/checkin-confirmation";
import {GalleryPage} from "../gallery/gallery";
import {GetaTicketPage} from "../get-a-ticket/get-a-ticket";
import {BarberLocation} from "../barber-location/barber-location";
import {SettingsPage} from "../settings/settings";
import firebase from 'firebase';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

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
  private reservation:any = "Aucune réservation";
  private ticketId:any;
  private appointmentId:any;
  private barberId:any;
  private barberTypeIsTicket:Boolean = false;
  private barberTypeIsAppointment:Boolean = false;
  private barberTypeIsTicketAppointment:Boolean = false;

  constructor(public nav: NavController, public galleryService: GalleryService, public alertCtrl: AlertController,
              private barcodeScanner: BarcodeScanner, public push: Push) {

    this.getbarberIdAndType();
  }

  /*****************************************************************************
   Function: initController
   Auteur(s): Koueni Deumeni
   Date de creation: 2017-10-26
   Date de modification:
   Description: This function executes routine functions
   *****************************************************************************/
  initController() {
    this.updateIds();
    this.ClientWaiting();
    this.TotalReservation();
    this.DirectMessages();
    this.calculateWaitingTime();
    this.getReservation();
    this.pushNotificationSetup();
  }

  /*****************************************************************************
   Function: getbarberIdAndType
   Auteur(s): Koueni Deumeni
   Date de creation: 2017-10-26
   Date de modification:
   Description: This function retrieves the barderId of user
   *****************************************************************************/
  getbarberIdAndType() {
    var userId = firebase.auth().currentUser.uid;
    let controller = this;

    //get barber id
    firebase.database().ref("Users/" + userId + "/").once("value", function(snap) {
      controller.barberId = snap.val().barberId;

      //get barber type
      firebase.database().ref(controller.barberId + "/Infos").once("value", function(snap) {
        var type = snap.val().type;
        controller.barberTypeIsTicket = (type == "Ticket") ? true : false;
        controller.barberTypeIsAppointment = (type == "Appointment") ? true : false;
        controller.barberTypeIsTicketAppointment = (type == "Ticket Appointment") ? true : false;

        controller.initController();
      });
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
  Function: goToCheckInConfirmationPage
  Purpose: Pushes the check in confirmation page
  Parameters: None
  Return: None
  *****************************************************************************/
  goToCheckInConfirmationPage() {
    this.nav.push(CheckInConfirmationPage);
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
    var userId = firebase.auth().currentUser.uid;
    var userFounded = false;

    //stand by list
    const users = firebase.database().ref(this.barberId + '/StandByList/Users/');
    users.on('value', function(snapshot) {
      let standby = snapshot.val();
      var numberClientWaitingStandByList = 0;
      for (var property in standby) {
         if (standby.hasOwnProperty(property)) {
             if (standby[property].uid == userId) {
               userFounded = true; break;
             }
            if (!userFounded)  numberClientWaitingStandByList++;
         }
      }
      this.numberClientWaitingStandByList = numberClientWaitingStandByList;
      this.numberClientWaiting = this.numberClientWaitingTicketList + this.numberClientWaitingStandByList;
      var waitingLine = this.numberClientWaiting;

      if (!userFounded) {
        //ticket list
        const listOfUsers = firebase.database().ref(this.barberId + '/TicketList/Users/');
        listOfUsers.on('value', function(snapshot) {
          let tickets = snapshot.val();
          var numberClientWaitingTicketList = 0;
          for (var property in tickets) {
             if (tickets.hasOwnProperty(property)) {
                 if (tickets[property].uid == userId) {
                    break;
                 } else {
                   numberClientWaitingTicketList++;
                 }
             }
          }
          this.numberClientWaitingTicketList = numberClientWaitingTicketList
          this.numberClientWaiting = this.numberClientWaitingTicketList + this.numberClientWaitingStandByList;
          var waitingLine = this.numberClientWaiting;
          firebase.database().ref().child(this.barberId + '/Users/' + userId).update({
            waitingLine: waitingLine
          });
        }.bind(this));
      } else {
        firebase.database().ref().child(this.barberId + '/Users/' + userId).update({
          waitingLine: waitingLine
        });
      }

    }.bind(this));
  }

  TotalReservation() {
    const listOfUsers = firebase.database().ref(this.barberId + '/Appointments/Users/');
    listOfUsers.on('value', function(snapshot) {
      var numberClientWaitingReservation = 0;
      snapshot.forEach(function(childSnapshot) {
        numberClientWaitingReservation++;
      }.bind(this));
      this.numberClientWaitingReservation = numberClientWaitingReservation
    }.bind(this));
  }

  DirectMessages() {
    const liveMessages = firebase.database().ref(this.barberId + '/Messages/live/');
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
        this.goToCheckInConfirmationPage();
        this.checkInUser();
      } else {
        this.showAlert('Code erroné', 'Veuillez scanner un code valide.');
      }
    }).catch(function(error){
        this.showAlert('Erreur!', error);
    });;
  }

  /*****************************************************************************
  Function: checkInUser
  Purpose: check in the user in the db
  Parameters: None
  Return: None
  *****************************************************************************/
  checkInUser() {
    var timeStamp = new Date().getTime().toString();

    if (this.ticketId != undefined) {
      firebase.database().ref().child(this.barberId + '/TicketList/Users/' + this.ticketId).update({
        hasCheckedIn: true,
        checkInTime: timeStamp
      });
    }

    if (this.appointmentId != undefined) {
      firebase.database().ref().child(this.barberId + '/Appointments/Users/' + this.appointmentId).update({
        hasCheckedIn: true,
        checkInTime: timeStamp
      });
    }
  }

  /*****************************************************************************
  Function: getReservation
  Purpose: get the user reservation date and hour
  Parameters: None
  Return: None
  *****************************************************************************/
  getReservation() {
    let controller = this;
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref(this.barberId + '/Appointments/Users')
     .on('value', function(snapshot) {
       let appointments = snapshot.val();
       for (var property in appointments) {
          if (appointments.hasOwnProperty(property)) {
              if (appointments[property].UserId == userId) controller.reservation = appointments[property].Date + ", " + appointments[property].Hour;
          }
       }
     });
  }

  /*****************************************************************************
  Function: updateIds
  Purpose: update ticket and appointments ids
  Parameters: None
  Return: None
  *****************************************************************************/
  updateIds() {
    var userId = firebase.auth().currentUser.uid;
    let controller = this;
    firebase.database().ref(this.barberId + '/Appointments/Users')
     .on('value', function(snapshot) {
       let appointments = snapshot.val();
       for (var property in appointments) {
          if (appointments.hasOwnProperty(property)) {
              if (appointments[property].UserId == userId) controller.appointmentId = property;
          }
       }
     });

     firebase.database().ref(this.barberId + '/TicketList/Users')
      .on('value', function(snapshot) {
        let tickets = snapshot.val();
        for (var property in tickets) {
           if (tickets.hasOwnProperty(property)) {
               if (tickets[property].UserId == userId) controller.ticketId = property;
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

  /*****************************************************************************
  Function: pushNotificationSetup
  Description: Setup the push notification plugin
  Parameters: none
  Return: void
  *****************************************************************************/
  pushNotificationSetup() {
    var userId = firebase.auth().currentUser.uid;
    const options: PushOptions = {
       android: {

       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       },
       windows: {},
       browser: {
           pushServiceURL: 'http://push.api.phonegap.com/v1/push'
       }
     };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      this.showAlert('Mario Perfect Cut', notification.message);
    });

    pushObject.on('registration').subscribe((registration: any) => {
      firebase.database().ref().child(this.barberId + '/Users/' + userId).update({
        deviceToken : registration.registrationId
      });
    });

    pushObject.on('error').subscribe(error => console.log('Error with Push plugin ' + error));
  }

}
