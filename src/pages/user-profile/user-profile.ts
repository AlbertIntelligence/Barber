import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TicketConfirmationPage} from "../ticket-confirmation/ticket-confirmation";
import firebase from 'firebase';
import {Alert} from "../alert/alert";
//import { AlertController } from 'ionic-angular';
/*
 Generated class for the UserProfile page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

  private hiddeDiv:any = true;
  private newAlert: Alert;


  constructor(public nav?: NavController) {
    //this.newAlert = new Alert();
    this.ticketListener();
  }

  public confirmMessage() {
    this.newAlert.presentAlert();
  }


  private ticketListener(){
    const dbRefObject = firebase.database().ref().child('Tickets/currentPosition');
     dbRefObject.on('value' , snap =>  this.ticketObject.position =   snap.val()  );
  }

  private addTicketListener(){
    const dbRefObject = firebase.database().ref().child('Tickets');
    dbRefObject.set({currentPosition:this.ticketObject.position +1 });
  }

  private checkPayment(){
    const dbRefObject = firebase.database().ref().child('Tickets/paymentCompleted');
    dbRefObject.on('value' , snap =>  this.ticketObject.paymentCompleted =   snap.val()  );
    if(this.ticketObject.paymentCompleted.toString() == 'yes' ){
      this.hiddeDiv = false;
      //setTimeout('', 5000);
      //this.hiddeDiv = true;
    }
  }

  private ticketObject = {
    'position': 0,
    'paymentCompleted':''
  }

  // Open ticket confirmation view page
  public getTicketConfirmation() {
    this.nav.push(TicketConfirmationPage);
  }

}
