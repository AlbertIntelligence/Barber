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
    this.setHeaderFooter();
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
    if (!this.loaded) {
        this.loaded = true;
        $("#input").blur();
        $("#main").addClass('translateUp');
        $("#link").addClass('hidden').removeClass('visible');
        $("#title").addClass('moveDownTitle');
        $("#inputBloc").addClass('moveDownInput');
        $("#title").css('font-size', '4.7vw');
        $("#backBtn").css('margin-top', '2vh');
        $("#title").text("Entrez votre numéro de téléphone");
        $("#hr").addClass('hidden').removeClass('visible');
        $("#input").attr("placeholder", "(514) 555-1234");

        setTimeout(() => {
          $("#backBtn").removeClass('hidden').addClass('visible');
          $("#nextBtn").removeClass('hidden').addClass('visible');
          $("#input").trigger('focus');
          $("#inputBloc").css('border-bottom', '2px solid black');
        }, 1000);
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
        $("#input").blur();
        setTimeout(() => {
          $("#link").show();
          $("#title").show();
          $("#hr").show();
          $("#backBtn").hide();
          $("#subtitle").hide();
          $("#nextBtn").hide();
          $("#input").attr("placeholder", "Numéro de téléphone");
          $("#inputBloc").css('border-bottom', '0');
          $("#headerImg").animate({height: 'toggle'}, 500);
        }, 10);

        this.loaded = false;
    }
  }

  /*****************************************************************************
  Function: setFooter
  Description: Set the footer dimensions for iOS
  Parameters: none
  Return: void
  *****************************************************************************/
  setHeaderFooter() {
    if (this.platform.is('ios')) {
      $(".header-img").height("61.7vh");
      $("#link").height("8.5vh");
    }
  }

}
