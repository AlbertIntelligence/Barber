import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TicketConfirmationPage} from "../ticket-confirmation/ticket-confirmation";
import firebase from 'firebase';
import {Alert} from "../alert/alert";
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
  public currentPosition:any;
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

  constructor(public nav: NavController, private newAlert?: Alert,public ticketConfirmation?:TicketConfirmationPage) {
    this.getCurrentClient();
    this.getLastClient();
    this.getUserInfo();
    this.updateDataSnapshot();
  }

  ionViewDidLoad() {
    this.hideTicketDiv();
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
    const userInfo = firebase.database().ref("Users/"+userId+"/");
    userInfo.on('value' , snap =>  userData =   snap.val()  );
    this.userInfoFirstName = userData.firstName;
    this.userInfoLastName = userData.lastName;
    this.userInfoEmailName = userData.email;
    this.userInfoPhoneNumber = userData.phoneNumber;
    this.userInfoUserId = userId;
    this.userInfoRegistrationDate = userData.Date;
  }

  /*****************************************************************************
   Function: checkPayment
   Auteur(s): Lenz Petion
   Date de creation: 2017-06-03
   Date de modification:
   Description: This function tells if a user is logged in
   *****************************************************************************/
  public getCurrentClient(){
    const dbRefObject = firebase.database().ref('TicketList/Users/');
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
    const dbRefObject = firebase.database().ref('TicketList/Users/');
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
    const dbRefObject = firebase.database().ref().child('TicketList/Users/');
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

    firebase.database().ref('TicketList/Users/')
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

    firebase.database().ref('StandByList/Users/')
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
    /*firebase.database().ref('TicketList/Users/').once('value').then(function(snapshot) {
      var tickets = snapshot.val();
      var ticket;
      for (var property in tickets) {
         if (tickets.hasOwnProperty(property)) {
             if (tickets[property].uid == userId) {
               ticket = tickets[property];
               firebase.database().ref().child('TicketsArchive/Users/').update({
                 [id] : ticket
               });
             }
         }
      }
    });

    firebase.database().ref('StandByList/Users/').once('value').then(function(snapshot) {
      var tickets = snapshot.val();
      var ticket;
      for (var property in tickets) {
         if (tickets.hasOwnProperty(property)) {
             if (tickets[property].uid == userId) {
               ticket = tickets[property];
               firebase.database().ref().child('TicketsArchive/Users/').update({
                 [id] : ticket
               });
             }
         }
      }
    });*/

    if (this.ticketId != null) firebase.database().ref().child('TicketList/Users/' + this.ticketId).remove();
    if (this.standbyTicketId != null) firebase.database().ref().child('StandByList/Users/' + this.standbyTicketId).remove();

    this.goToTicketCancellationPage();
  }

  public confirmMessage() {
    if (this.buttonText == "PRENDRE UN NUMÉRO") {
      if(this.isAvailable()) {
        this.newAlert.presentAlert();
      }
      else
        this.newAlert.ticketExist();
    } else {
      if (this.canCancel()) {
        this.newAlert.showCancellationConfirmation();
      } else {
        this.newAlert.cannotCancel();
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

}
