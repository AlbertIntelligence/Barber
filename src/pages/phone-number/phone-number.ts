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
    this.navCtrl.push(LoginPage);
  }

  /*****************************************************************************
  Function: enterYourPhone
  Description: Trigger the transition
  Parameters: event
  Return: void
  *****************************************************************************/
  enterYourPhone() {
    //When focus on input, load phone number view if not already loaded
    if (!this.loaded) {
        this.loaded = true;
        $("#input").blur();
        $("#main").css('background-color', 'white');
        $("#main").css('height', '100vh');
        if (this.platform.is('ios')) {
          this.translate($("#main"), "0px", "-62vh");
        } else {
          this.translate($("#main"), "0px", "-64.5vh");
        }
        $("#link").removeClass('visible').addClass('hidden');
        this.translate($("#title"), "0px", "10vh");
        this.translate($("#inputBloc"), "0px", "14vh");
        $("#title").css('font-size', '5vw');
        $("#backBtn").css('margin-top', '2vh');
        $("#title").text("Entrez votre numéro de téléphone");
        $("#hr").removeClass('visible').addClass('hidden');
        $("#input").attr("placeholder", "(514) 555-1234");

        //Animation slow
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
  goBack() {
    //back to the home view
    if (this.loaded && this.currentView == "phoneNumber") {
        this.loaded = false;
        this.translate($("#title"), "0px", "0px");
        this.translate($("#inputBloc"), "0px", "0px");
        this.translate($("#main"), "0px", "0px");
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
    }

    //back to the phone number view
    else if (this.currentView == "4-digit") {
      this.translate($("#digitTitle"), "0px", "0px");
      this.translate($("#title"), "0px", "10vh");
      this.translate($("#digitBloc"), "0px", "0px");
      this.translate($("#inputBloc"), "0px", "14vh");
      this.currentView = "phoneNumber";
    }

    //back to the 4-digit PIN view
    else if (this.currentView == "email") {
      this.translate($("#emailTitle"), "0px", "0px");
      this.translate($("#digitTitle"), "-100vw", "0px");
      this.translate($("#emailInput"), "0px", "0px");
      this.translate($("#digitBloc"), "-100vw", "0px");
      this.currentView = "4-digit";
    }

    //back to the email view
    else if (this.currentView == "password") {
      this.translate($("#passwordTitle"), "0px", "0px");
      this.translate($("#emailTitle"), "-100vw", "0px");
      this.translate($("#passwordInput"), "0px", "0px");
      this.translate($("#emailInput"), "-100vw", "0px");
      this.currentView = "email";
    }

    //back to the password view
    else if (this.currentView == "name") {
      this.translate($("#nameTitle"), "0px", "0px");
      this.translate($("#passwordTitle"), "-100vw", "0px");
      this.translate($("#nameInput"), "0px", "0px");
      this.translate($("#passwordInput"), "-100vw", "0px");
      this.currentView = "password";
    }

    //back to the name view
    else if (this.currentView == "paymentMethod") {
      this.translate($("#paymentTitle"), "0px", "0px");
      this.translate($("#nameTitle"), "-100vw", "0px");
      this.translate($("#paymentList"), "0px", "0px");
      this.translate($("#nameInput"), "-100vw", "0px");
      this.currentView = "name";
    }
  }

  /*****************************************************************************
  Function: goToPin
  Description: Show the 4 digit PIN features
  Parameters: None
  Return: None
  *****************************************************************************/
  goToNext() {
    switch (this.currentView) {
      //Go to enter your view
      case "phoneNumber":
        this.currentView = "4-digit";
        this.translate($("#digitTitle"), "-100vw", "0px");
        this.translate($("#title"), "-100vw", "10vh");
        this.translate($("#digitBloc"), "-100vw", "0px");
        this.translate($("#inputBloc"), "-100vw", "14vh");

        $("#digit1").css('border-bottom', '2px solid black');
        $("#digit2").css('border-bottom', '2px solid #F2F2F2');
        $("#digit3").css('border-bottom', '2px solid #F2F2F2');
        $("#digit4").css('border-bottom', '2px solid #F2F2F2');
        break;

      //Go to enter your name email
      case "4-digit":
        this.currentView = "email";
        $("#emailInput").css('border-bottom', '2px solid black');
        this.translate($("#emailTitle"), "-100vw", "0px");
        this.translate($("#digitTitle"), "-200vw", "0px");
        this.translate($("#emailInput"), "-100vw", "0px");
        this.translate($("#digitBloc"), "-200vw", "0px");
        break;

      //Go to enter your name password
      case "email":
        this.currentView = "password";
        $("#passwordInput").css('border-bottom', '2px solid black');
        this.translate($("#passwordTitle"), "-100vw", "0px");
        this.translate($("#emailTitle"), "-200vw", "0px");
        this.translate($("#passwordInput"), "-100vw", "0px");
        this.translate($("#emailInput"), "-200vw", "0px");
        break;

      //Go to enter your name view
      case "password":
        this.currentView = "name";
        $("#firstName").css('border-bottom', '2px solid black');
        $("#lastName").css('border-bottom', '2px solid #F2F2F2');
        this.translate($("#nameTitle"), "-100vw", "0px");
        this.translate($("#passwordTitle"), "-200vw", "0px");
        this.translate($("#nameInput"), "-100vw", "0px");
        this.translate($("#passwordInput"), "-200vw", "0px");
        break;

        //Go to enter select payment method
        case "name":
          this.currentView = "paymentMethod";
          this.translate($("#paymentTitle"), "-100vw", "0px");
          this.translate($("#nameTitle"), "-200vw", "0px");
          this.translate($("#paymentList"), "-100vw", "0px");
          this.translate($("#nameInput"), "-200vw", "0px");
          break;

      default:
    }
  }

  /*****************************************************************************
  Function: translate
  Description: Move the obj in parameter by the others parameters
  Parameters: obj : div element, dx: final x position, dy: final y position
  Return: void
  *****************************************************************************/
  translate(obj, dx, dy) {
    $(obj).css('-webkit-transform', 'translate('+ dx +','+ dy +')');
    $(obj).css('transition-timing-function', 'cubic-bezier(.1,.1,.1,1)');
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
