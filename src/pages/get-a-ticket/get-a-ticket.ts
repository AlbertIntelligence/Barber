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
  public userInfoFirstName:any;
  public userInfoLastName:any;
  public userInfoEmailName:any;
  public userInfoPhoneNumber:any;
  public userInfoUserId:any;
  public userInfoRegistrationDate:any;
  public currentPosition:20;
  public userPosition:any
  public paymentCompleted:any

  constructor(public nav?: NavController, private newAlert?: Alert) {
    this.getCurrentClient();
    this.getUserInfo();
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
    dbRefObject.on('value' , snap =>  this.currentPosition =   snap.val()  );

  }

  /*****************************************************************************
   Function: checkPayment
   Auteur(s): Lenz Petion
   Date de creation: 2017-06-03
   Date de modification:
   Description: This function tells if a user is logged in
   *****************************************************************************/
  private addClientToList(){
    const dbRefObject = firebase.database().ref().child('TicketsList/Users/');
    dbRefObject.set({currentPosition:this.currentPosition + 1 });
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
