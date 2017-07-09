import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TicketConfirmationPage} from "../ticket-confirmation/ticket-confirmation";
import firebase from 'firebase';
import {Alert} from "../alert/alert";
import * as $ from 'jquery';


@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {


  private hiddenDiv:any;



  constructor(public nav?: NavController, private newAlert?: Alert) {
    this.showCurrentClient();
  }

  ionViewDidLoad() {
    this.hideTicketDiv();
  }


  public makeTransaction(){

    if( true ){
      // this.addClientToList()
      this.setHiddeDiv(false);
      this.TicketDiv();
    }

    if("sms acti"){}
    if("sms acti"){}
    if("sms acti"){}

  }


  //------------------------------------------THIS IS THE FIREBASE FUNCTION SECTION----------------------------------------------//


  public checkPayment(){
    const dbRefObject = firebase.database().ref().child('Tickets/paymentCompleted');
    dbRefObject.on('value' , snap =>  this.ticketObject.paymentCompleted =   snap.val()  );
    return this.ticketObject.paymentCompleted.toString();
  }

  //This function w
  public showCurrentClient(){
    const dbRefObject = firebase.database().ref().child('Tickets/currentPosition');
    dbRefObject.on('value' , snap =>  this.ticketObject.currentPosition =   snap.val()  );

  }

  //This function  will add 1 to the ticket queu and set new position for teh client
  private addClientToList(){
    const dbRefObject = firebase.database().ref().child('Tickets');
    dbRefObject.set({currentPosition:this.ticketObject.currentPosition + 1 });
  }

  //------------------------------------------THIS IS THE Algorithm  SECTION----------------------------------------------//


  //------------------------------------------THIS IS THE OBJECT  SECTION----------------------------------------------//
  private ticketObject = {
    'currentPosition': 0,
    'userPosition': 0,
    'paymentCompleted':''
  }

  //------------------------------------------THIS IS THE HELPER FUNCTION SECTION----------------------------------------------//
  setHiddeDiv(value: any) {
    this.hiddenDiv = value;
  }
  getHiddeDiv(): any {
    return this.hiddenDiv;
  }

  public confirmMessage() {
    this.newAlert.presentAlert();
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

