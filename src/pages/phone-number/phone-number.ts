import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import * as $ from 'jquery';
import { Keyboard } from '@ionic-native/keyboard';
import 'intl-tel-input';
import { Platform } from 'ionic-angular';

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

  loaded: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private keyboard: Keyboard, public platform: Platform) {

  }

  ngOnInit(): any {
    this.setFooter();
  }

  /*****************************************************************************
  Function: gotoLoginPage
  Description: Go to the login page
  Parameters: None
  Return: None
  *****************************************************************************/
  gotoLoginPage() {
    this.navCtrl.push(LoginPage);
  }



  /*****************************************************************************
  Function: enterYourPhone
  Description: Trigger the transition
  Parameters: event
  Return: void
  *****************************************************************************/
  enterYourPhone() {
    this.keyboard.disableScroll(true);
    if (!this.loaded) {
      $("#headerImg").animate({height: 'toggle'}, 500);

        $("#link").hide();
        $("#title").hide();
        $("#hr").hide();
        $("#backBtn").show();
        $("#subtitle").show();
        $("#input").attr("placeholder", "(514) 555-1234");
        $("#input").trigger("focus");
        $("#inputBloc").css('border-bottom', '2px solid black');
        $("#titleBlock").css('margin-top', '32vh');
        this.loaded = true;
    } else {
      this.keyboard.show();
    }
  }

  /*****************************************************************************
  Function: backToHome
  Description: Get back to the home page disposition
  Parameters: none
  Return: void
  *****************************************************************************/
  backToHome() {
    if (this.loaded) {
      this.keyboard.close();
      $("#headerImg").animate({height: 'toggle'}, 500);

        $("#link").show();
        $("#title").show();
        $("#hr").show();
        $("#backBtn").hide();
        $("#subtitle").hide();
        $("#input").attr("placeholder", "Numéro de téléphone");
        $("#inputBloc").css('border-bottom', '0');
        $("#titleBlock").css('margin-top', '0');

        this.loaded = false;
    }
  }

  /*****************************************************************************
  Function: setFooter
  Description: Set the footer dimensions for iOS
  Parameters: none
  Return: void
  *****************************************************************************/
  setFooter() {
    if (this.platform.is('ios')) {
      $("#link").height("7.5vh");
    }
  }

}
