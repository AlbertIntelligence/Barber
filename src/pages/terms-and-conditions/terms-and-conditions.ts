import {Component} from "@angular/core";
import firebase from 'firebase';


/*
 Generated class for the Terms and conditions page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'terms-and-conditions',
  templateUrl: 'terms-and-conditions.html'
})
export class TermsAndConditionsPage {

  private termsAndConditions:any;
  private barberId:any;

  constructor() {
    this.getbarberId();
    let controller = this;
    firebase.database().ref(this.barberId + '/TermsAndConditions/')
     .on('value', function(snapshot) {
       let termsConditions = snapshot.val().value;
       controller.termsAndConditions = termsConditions;
     });
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
    });
  }

}
