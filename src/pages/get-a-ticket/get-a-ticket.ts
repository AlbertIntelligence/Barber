import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {TicketConfirmationPage} from "../ticket-confirmation/ticket-confirmation";
import firebase from 'firebase';
import * as $ from 'jquery';
import {TicketCancellationConfirmationPage} from "../ticket-cancellation-confirmation/ticket-cancellation-confirmation";


@Component({
  selector: 'get-a-ticket',
  templateUrl: 'get-a-ticket.html'
})
export class GetaTicketPage {


  private hiddenDiv:any;
  public startTransaction:any;
  public userInfoFirstName:any;
  public userInfoLastName:any;
  public userInfoEmailName:any;
  public userInfoPhoneNumber:any;
  public userInfoUserId:any;
  public userInfoRegistrationDate:any;
  public currentPosition:any = "Aucun";
  public lastPosition:any;
  public userPosition:any;
  private dataSnapshot:Array<any> = [];
  private dataSnapshotStandBy:Array<any> = [];
  private buttonText:String = "PRENDRE UN NUMÉRO";
  private hasTicket:any;
  private ticketId:any = null;
  private standbyTicketId:any = null;
  private buttonColor:String = "primary";
  private buttonType:String = "add-circle";
  private ticketTimeStamp:any;
  public numberClientWaiting = 0;
  public numberClientWaitingStandByList = 0;
  public numberClientWaitingTicketList = 0;
  private barberId:any;

  constructor(public nav: NavController, public alertCtrl: AlertController, public ticketConfirmation?:TicketConfirmationPage) {
    this.getbarberId();
  }

  /*****************************************************************************
   Function: initController
   Auteur(s): Koueni Deumeni
   Date de creation: 2017-10-26
   Date de modification:
   Description: This function executes routine functions
   *****************************************************************************/
  initController() {
    this.ClientWaiting();
    this.getCurrentClient();
    this.getLastClient();
    this.getUserInfo();
    this.updateDataSnapshot();
  }

  ionViewDidLoad() {
    this.hideTicketDiv();
  }

  /*****************************************************************************
   Function: getbarberId
   Auteur(s): Koueni Deumeni
   Date de creation: 2017-10-26
   Date de modification:
   Description: This function retrieves the barderId of user
   *****************************************************************************/
  getbarberId() {
    var userId = firebase.auth().currentUser.uid;
    let controller = this;
    firebase.database().ref("Users/" + userId + "/").once("value", function(snap) {
      controller.barberId = snap.val().barberId;

      controller.initController();
    });
  }

  public makeTransaction(){
    if( this.startTransaction ) {
        this.addClientToList();
        this.nav.push(TicketConfirmationPage);
        this.setHiddeDiv(false);
        this.TicketDiv();
    }

  }

  // Open ticket cancellation confirmation view page
  public goToTicketCancellationPage() {
    this.nav.push(TicketCancellationConfirmationPage);
  }


  //------------------------------------------THIS IS THE FIREBASE FUNCTION SECTION----------------------------------------------//

  public getUserInfo(){
    //initilize those empty string to make compiler happy
    var firstName ="";
    var lastName ="";
    var email ="";
    var phoneNumber ="";
    var Date ="";
    var userData;
    var userId = firebase.auth().currentUser.uid;
    let controller = this;
    firebase.database().ref(this.barberId + "/Users/" + userId + "/").once("value", function(snap) {
      let userData = snap.val();
      controller.userInfoFirstName = userData.firstName;
      controller.userInfoLastName = userData.lastName;
      controller.userInfoEmailName = userData.email;
      controller.userInfoPhoneNumber = userData.phoneNumber;
      controller.userInfoUserId = userId;
      controller.userInfoRegistrationDate = userData.Date;
    });
  }

  /*****************************************************************************
   Function: checkPayment
   Auteur(s): Lenz Petion
   Date de creation: 2017-06-03
   Date de modification:
   Description: This function tells if a user is logged in
   *****************************************************************************/
  public getCurrentClient(){
    this.currentPosition = "Aucun";
    const dbRefObject = firebase.database().ref(this.barberId + '/TicketList/Users/');
    dbRefObject.limitToFirst(1).on('value', function(snapshot) {
      const ids = [];
      snapshot.forEach(function(childSnapshot) {
        const id = childSnapshot.key
        ids.push(id);
      }.bind(this));
      this.currentPosition = ids;
    }.bind(this));
  }

  /*****************************************************************************
   Function: checkPayment
   Auteur(s): Lenz Petion
   Date de creation: 2017-06-03
   Date de modification:
   Description: This function tells if a user is logged in
   *****************************************************************************/
  public getLastClient(){
    const dbRefObject = firebase.database().ref(this.barberId + '/TicketList/Users/');
    dbRefObject.on('value', function(snapshot) {
      const ids = [];
      snapshot.forEach(function(childSnapshot) {
        const id = childSnapshot.key
        ids.pop();
        ids.push(id);
      }.bind(this));
      this.lastPosition = ids;
    }.bind(this));
  }

  /*****************************************************************************
   Function: checkPayment
   Auteur(s): Lenz Petion
   Date de creation: 2017-06-03
   Date de modification:
   Description: This function tells if a user is logged in
   *****************************************************************************/
  private addClientToList() {
    var timeStamp = new Date().getTime().toString();
    const dbRefObject = firebase.database().ref().child(this.barberId + '/TicketList/Users/');
    this.userPosition = Number(this.lastPosition) +1;
    var uPosition = this.userPosition;
    this.ticketConfirmation = uPosition;
    dbRefObject.child(uPosition).set(
        {
          "firstName" : this.userInfoFirstName,
          "lastName": this.userInfoLastName,
          "email":this.userInfoEmailName,
          "phoneNumber":this.userInfoPhoneNumber,
          "uid":this.userInfoUserId,
          "timeStamp":timeStamp
         }
       );
  }

  updateDataSnapshot() {
    var userId = firebase.auth().currentUser.uid;
    let model = this;

    firebase.database().ref(this.barberId + '/TicketList/Users/')
      .on('value', function(snapshot) {
        model.hasTicket = false;
        let tickets = snapshot.val();
        model.dataSnapshot = [];
        for (var property in tickets) {
          if (tickets.hasOwnProperty(property)) {
            model.dataSnapshot.push(tickets[property]);
            if (tickets[property].uid == userId) {
               model.hasTicket = true;
               model.buttonText = "ANNULER MON NUMÉRO";
               model.ticketId = property;
               model.standbyTicketId = null;
               model.buttonColor = "danger";
               model.buttonType = "remove-circle";
               model.ticketTimeStamp = tickets[property].timeStamp;
            }
          }
        }
        if (!model.hasTicket) {
          model.buttonType = 'add-circle';
          model.buttonColor = 'primary';
          model.buttonText = "PRENDRE UN NUMÉRO";
        }
      });

    firebase.database().ref(this.barberId + '/StandByList/Users/')
      .on('value', function(snapshot) {
        let tickets = snapshot.val();
        model.dataSnapshot = [];
        for (var property in tickets) {
          if (tickets.hasOwnProperty(property)) {
            model.dataSnapshotStandBy.push(tickets[property]);
            if (tickets[property].uid == userId) {
               model.hasTicket = true;
               model.buttonText = "ANNULER MON NUMÉRO";
               model.standbyTicketId = property;
               model.ticketId = null;
               model.buttonColor = "danger";
               model.buttonType = "remove-circle";
               model.ticketTimeStamp = tickets[property].timeStamp;
            }
          }
        }
        if (!model.hasTicket) {
          model.buttonType = 'add-circle';
          model.buttonColor = 'primary';
          model.buttonText = "PRENDRE UN NUMÉRO";
        }
      });
  }

  isAvailable(): Boolean {
    var userId = firebase.auth().currentUser.uid;
    return (this.dataSnapshot.find(item => item.uid == userId) == undefined &&
            this.dataSnapshotStandBy.find(item => item.uid == userId) == undefined);
  }







  //------------------------------------------THIS IS THE HELPER FUNCTION SECTION----------------------------------------------//



  setHiddeDiv(value: any) {
    this.hiddenDiv = value;
  }
  getHiddeDiv(): any {
    return this.hiddenDiv;
  }

  /*****************************************************************************
  Function: canCancel
  Purpose: Tells if user can cancel ticket
  Parameters: None
  Return: None
  *****************************************************************************/
  canCancel(): Boolean {
    var timeStamp = new Date().getTime();
    var delta = (timeStamp - parseInt(this.ticketTimeStamp)) / (1000 * 60); //minutes
    if (delta < 30) return true;
    return false;
  }

  /*****************************************************************************
  Function: cancelTicket
  Purpose: Cancel the user ticket
  Parameters: None
  Return: None
  *****************************************************************************/
  cancelTicket() {
    var id = this.ticketTimeStamp;
    var userId = firebase.auth().currentUser.uid;

    if (this.ticketId != null) firebase.database().ref().child(this.barberId + '/TicketList/Users/' + this.ticketId).remove();
    if (this.standbyTicketId != null) firebase.database().ref().child(this.barberId + '/StandByList/Users/' + this.standbyTicketId).remove();

    this.goToTicketCancellationPage();
  }

  public confirmMessage() {
    if (this.buttonText == "PRENDRE UN NUMÉRO") {
      if(this.isAvailable()) {
        this.presentAlert();
      }
      else
        this.ticketExist();
    } else {
      if (this.canCancel()) {
        this.showCancellationConfirmation();
      } else {
        this.cannotCancel();
      }
    }
  }

  // Open ticket confirmation view page
  public getTicketConfirmation() {
    this.nav.push(TicketConfirmationPage);
  }

  TicketDiv(){
    if(this.hiddenDiv == true){
      this.hideTicketDiv();
    }
    else
      this.showTicketDiv();
  }

  showTicketDiv(){
    $('#ticketPosition').show();
    $("#ticketPosition").delay(5000).hide(0);
  }

  hideTicketDiv(){
    $('#ticketPosition').hide();
  }

  ClientWaiting() {
    var userId = firebase.auth().currentUser.uid;
    var userFounded = false;
    this.numberClientWaiting = 0;

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
             numberClientWaitingStandByList++;
         }
      }
      /*
      snapshot.forEach(function(childSnapshot) {
        numberClientWaitingStandByList++;
      }.bind(this));*/
      this.numberClientWaitingStandByList = numberClientWaitingStandByList;
      this.numberClientWaiting = this.numberClientWaitingTicketList + this.numberClientWaitingStandByList;

      if (!userFounded) {
        //ticket list
        const listOfUsers = firebase.database().ref(this.barberId + '/TicketList/Users/');
        listOfUsers.on('value', function(snapshot) {
          let tickets = snapshot.val();
          var numberClientWaitingTicketList = 0;
          for (var property in tickets) {
             if (tickets.hasOwnProperty(property)) {
                 if (tickets[property].uid == userId) break;
                 numberClientWaitingTicketList++;
             }
          }
          this.numberClientWaitingTicketList = numberClientWaitingTicketList
          this.numberClientWaiting = this.numberClientWaitingTicketList + this.numberClientWaitingStandByList;
        }.bind(this));
      }

    }.bind(this));
  }

/********************************************************************************************************
  ALERT SECTION
********************************************************************************************************/

  /*****************************************************************************
  Function: presentAlert
  Description: This function display a warning on pop-up
  Parameters: None
  Return: None
  *****************************************************************************/
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Confirmez votre Ticket',
      message: "En cliquant sur Confirmer, je confirme avoir lu et accepté les Termes et Conditions et la Politique de Confidentialité de BarberMe. Vous disposez d'un délai de 30 minutes pour annuler votre ticket.",
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            this.startTransaction=false;
          }
        },
        {
          text: 'Confirmer',
            handler: data => {
              //this.nav.push(TicketConfirmationPage);
              this.startTransaction=true;
              this.makeTransaction();

          }
        }
      ]
    });
    alert.present();
  }

  /*****************************************************************************
   Function: presentAlert
   Description: This function display a warning on pop-up
   Parameters: None
   Return: None
   *****************************************************************************/
  ticketExist() {
    let alert = this.alertCtrl.create({
      title: 'Erreur.',
      message: "Vous avez déjà un ticket.",
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  /*****************************************************************************
   Function: cannotCancel
   Description: This function display a warning on pop-up
   Parameters: None
   Return: None
   *****************************************************************************/
  cannotCancel() {
    let alert = this.alertCtrl.create({
      title: 'Annulation Impossible !',
      message: "Vous ne pouvez plus annuler votre ticket.",
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  /*****************************************************************************
  Function: showCancellationConfirmation
  Description: This function display a warning on pop-up
  Parameters: None
  Return: None
  *****************************************************************************/
  showCancellationConfirmation() {
    let alert = this.alertCtrl.create({
      title: 'Confirmez votre annulation',
      message: "En cliquant sur Confirmer, je confirme avoir lu et accepté les Termes et Conditions et la Politique de Confidentialité de BarberMe.",
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmer',
            handler: data => {
              this.cancelTicket();

          }
        }
      ]
    });
    alert.present();
  }

}
