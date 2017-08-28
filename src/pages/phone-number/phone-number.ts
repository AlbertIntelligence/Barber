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
  currentView: String = "home";

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
    this.keyboard.disableScroll(true);
    //this.navCtrl.push(LoginPage);
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
        $("#main").css('height', '100vh');
        $("#main").removeClass('translateDown').addClass('translateUp');
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
          $("#inputBloc").css('border-bottom', '2px solid black');
        }, 1000);
        this.currentView = "phoneNumber";
    }
  }

  /*****************************************************************************
  Function: backToHome
  Description: Get back to the home page disposition
  Parameters: none
  Return: void
  *****************************************************************************/
  backToHome() {
    if (this.loaded && this.currentView == "phoneNumber") {
        this.loaded = false;
        $("#main").removeClass('translateUp').addClass('translateDown');
        $("#title").removeClass('moveDownTitle');
        $("#inputBloc").removeClass('moveDownInput');
        $("#title").css('font-size', '5.5vw');
        $("#backBtn").css('margin-top', '0');
        $("#title").text("Coiffez vous avec Barber Me");
        $("#hr").removeClass('hidden').addClass('visible');
        $("#backBtn").addClass('hidden').removeClass('visible');
        $("#nextBtn").addClass('hidden').removeClass('visible');
        $("#inputBloc").css('border', '0');
        $("#input").attr("placeholder", "Numéro de téléphone");
        setTimeout(() => {
          $("#main").css('height', 'auto');
          $("#link").removeClass('hidden').addClass('visible');
        }, 1000);
        this.currentView = "home";
    } else if (this.currentView == "4-digit") {
      $("#digitTitle").removeClass('translateLeft').addClass('translateRight');
      $("#title").removeClass('translateTitleLeft').addClass('translateTitleRight');
      $("#digitBloc").removeClass('translateLeft').addClass('translateRight');
      $("#inputBloc").removeClass('translatePhoneLeft').addClass('translatePhoneRight');
      this.currentView = "phoneNumber";
    }
  }

  /*****************************************************************************
  Function: goToPin
  Description: Show the 4 digit PIN features
  Parameters: None
  Return: None
  *****************************************************************************/
  goToPin() {
    this.currentView = "4-digit";
    $("#digitTitle").removeClass('translateRight').addClass('translateLeft');
    $("#title").removeClass('translateRight').addClass('translateTitleLeft');
    $("#digitBloc").removeClass('translateRight').addClass('translateLeft');
    $("#inputBloc").removeClass('translateRight').addClass('translatePhoneLeft');

    $("#digit1").css('border-bottom', '2px solid black');
    $("#digit2").css('border-bottom', '2px solid #F2F2F2');
    $("#digit3").css('border-bottom', '2px solid #F2F2F2');
    $("#digit4").css('border-bottom', '2px solid #F2F2F2');
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
