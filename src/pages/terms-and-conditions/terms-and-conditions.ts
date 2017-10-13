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

  constructor() {
    let controller = this;
    firebase.database().ref('TermsAndConditions/')
     .on('value', function(snapshot) {
       let termsConditions = snapshot.val().value;
       controller.termsAndConditions = termsConditions;
     });
  }

}
