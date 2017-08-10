import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import firebase from 'firebase';
import $ from 'jquery';
import 'intl-tel-input';

/**
 * Generated class for the CreateUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-phone-number',
  templateUrl: 'phone-number.html',
})

export class PhoneNumberPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(): any {
    let telInput = $("#elemtId");
    let output = $("#output");

    telInput.intlTelInput();
    // listen to "keyup", but also "change" to update when the user selects a country
    telInput.on("keyup change", function() {
      var intlNumber = telInput.intlTelInput("getNumber");
      if (intlNumber) {
        output.text("International: " + intlNumber);
      } else {
        output.text("Please enter a number below");
      }
    });
  }

  /*****************************************************************************
  Function: presentAlert
  Description: Go to the login page
  Parameters: None
  Return: None
  *****************************************************************************/
  gotoLoginPage() {
    this.navCtrl.push(LoginPage);
  }

}
