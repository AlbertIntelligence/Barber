import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import firebase from 'firebase';
import $ from 'jquery';
import { Keyboard } from '@ionic-native/keyboard';
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

  loaded:   boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private keyboard: Keyboard) {

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

  /*****************************************************************************
  Function: transition
  Description: Trigger the transition
  Parameters: none
  Return: void
  *****************************************************************************/
  enterYourPhone() {
    if (!this.loaded) {
      $("#headerImg").animate({height: 'toggle'},
        500);

        $("#link").hide();
        $("#title").hide();
        $("#hr").hide();
        $("#backBtn").show();
        $("#subtitle").show();
        $("#input").attr("placeholder", "(514) 555-1234");
        $("#input").trigger("focus");

        this.loaded = true;
    } else {
      this.keyboard.show();
    }
  }

  /*****************************************************************************
  Function: transition
  Description: Get back to the home page disposition
  Parameters: none
  Return: void
  *****************************************************************************/
  backToHome() {
    if (this.loaded) {
      $("#headerImg").animate({height: 'toggle'},
        500);

        $("#link").show();
        $("#title").show();
        $("#hr").show();
        $("#backBtn").hide();
        $("#subtitle").hide();
        $("#input").attr("placeholder", "Entrez votre numéro de téléphone");

        this.loaded = false;
    }
  }

}
