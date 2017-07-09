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

//------------------------------------------THIS IS THE Algorithm  SECTION----------------------------------------------//

class LinkedListItem {
  value: any;
  next: LinkedListItem;

  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class LinkedList {
  private head: LinkedListItem;
  constructor(item: LinkedListItem) {
    this.head = item;
  }

  // Adds the element at a specific position inside the linked list
  insert(val, previousItem: LinkedListItem) {
    let newItem: LinkedListItem = new LinkedListItem(val);
    let currentItem: LinkedListItem = this.head;

    if (!currentItem) {
      this.head = newItem;
    } else {
      while (true) {
        if (currentItem === previousItem) {
          let tempNextItem = previousItem.next;
          currentItem.next = newItem;
          newItem.next = tempNextItem;
          break;
        } else {
          currentItem = currentItem.next;
        }
      }
    }
  }

  // Adds the element at the end of the linked list
  append(val) {
    let currentItem: LinkedListItem = this.head;
    let newItem = new LinkedListItem(val);

    if (!currentItem) {
      this.head = newItem;
    } else {
      while (true) {
        if (currentItem.next) {
          currentItem = currentItem.next;
        } else {
          currentItem.next = newItem;
          break;
        }
      }
    }
  }

  // Add the element at the beginning of the linked list
  prepend(val) {
    let newItem = new LinkedListItem(val);
    let oldHead = this.head;

    this.head = newItem;
    newItem.next = oldHead;
  }

  delete(val) {
    var currentItem = this.head;

    if (!currentItem) {
      return;
    }

    if (currentItem.value === val) {
      this.head = currentItem.next;
    } else {
      var previous = null;

      while (true) {
        if (currentItem.value === val) {
          if (currentItem.next) { // special case for last element
            previous.next = currentItem.next;
          } else {
            previous.next = null;
          }
          currentItem = null; // avoid memory leaks
          break;
        } else {
          previous = currentItem;
          currentItem = currentItem.next;
        }
      }
    }
  }

  showInArray() {
    let arr = [];
    let currentItem = this.head;

    while (true) {
      arr.push(currentItem.value);

      if (currentItem.next) {
        currentItem = currentItem.next;
      } else {
        break;
      }
    }

    return arr;
  }
}

