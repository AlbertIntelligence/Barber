import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TicketConfirmationPage} from "../ticket-confirmation/ticket-confirmation";
import firebase from 'firebase';
import {Alert} from "../alert/alert";
import * as $ from 'jquery';


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

  constructor(public nav?: NavController, private newAlert?: Alert,public ticketConfirmation?:TicketConfirmationPage) {
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
        this.setHiddeDiv(false);
        this.TicketDiv();
    }

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
  private addClientToList(){
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
        "uid":this.userInfoUserId
       }
       );
  }

  updateDataSnapshot() {
    let model = this;
    firebase.database().ref('TicketList/Users/')
      .on('value', function(snapshot) {
        let tickets = snapshot.val();
        model.dataSnapshot = [];
        for (var property in tickets) {
          if (tickets.hasOwnProperty(property)) {
            model.dataSnapshot.push(tickets[property]);
          }
        }
      });
  }

  isAvailable(): Boolean {
    var userId = firebase.auth().currentUser.uid;
    return (this.dataSnapshot.find(item => item.uid == userId) == undefined);
  }







  //------------------------------------------THIS IS THE HELPER FUNCTION SECTION----------------------------------------------//



  setHiddeDiv(value: any) {
    this.hiddenDiv = value;
  }
  getHiddeDiv(): any {
    return this.hiddenDiv;
  }

  public confirmMessage() {
    if(this.isAvailable()) {
      this.newAlert.presentAlert();
    }
    else
      this.newAlert.ticketExist();
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


