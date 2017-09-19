import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import * as $ from 'jquery';
import { Keyboard } from '@ionic-native/keyboard';
import { Platform } from 'ionic-angular';
import { HostListener } from '@angular/core';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import { Stripe } from '@ionic-native/stripe';
import { Http, Headers } from '@angular/http';

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

  private loaded: boolean = false;
  private currentView: String = "home";
  private pinIsFull: boolean = false;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  private smsConfirmation: any;
  private userAccounts:Array<any> = [];
  private phoneNumber:String;
  private email:string;
  private password:string;
  private firstName:String;
  private lastName:String;
  private customerId:any;
  private cardToken:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
     private keyboard: Keyboard, public platform: Platform, public alertCtrl: AlertController,
     public stripe: Stripe, public http: Http) {
       this.updateUserAccounts();
  }

  ngOnInit(): any {
    this.setHeaderFooter();
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('nextBtn', {'size' : 'invisible'});
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key != "Backspace" && $(event.target).parent().attr('id').indexOf("digit") == 0) {
      var index = parseInt($(event.target).parent().attr('id')[5]);
      index++;
      if (index == 7) this.pinIsFull = true;
      if (index < 7) {
        $("#digit" + index).css('border-bottom', '2px solid black');
        $("#digit" + index).children().eq(0).focus();
      }

      if ($("#digit1").children().eq(0).val().length > 0) $("#digit1").css('border-bottom', '2px solid black');
      if ($("#digit2").children().eq(0).val().length > 0) $("#digit2").css('border-bottom', '2px solid black');
      if ($("#digit3").children().eq(0).val().length > 0) $("#digit3").css('border-bottom', '2px solid black');
      if ($("#digit4").children().eq(0).val().length > 0) $("#digit4").css('border-bottom', '2px solid black');
      if ($("#digit5").children().eq(0).val().length > 0) $("#digit6").css('border-bottom', '2px solid black');
      if ($("#digit5").children().eq(0).val().length > 0) $("#digit6").css('border-bottom', '2px solid black');
    }
    else if (event.key == "Backspace" && $(event.target).parent().attr('id').indexOf("digit") == 0) {
      var index = parseInt($(event.target).parent().attr('id')[5]);
      if (index < 7 && index > 1 && $("#digit" + index).val().length == 0) {
        $("#digit" + index).css('border-bottom', '2px solid #F2F2F2');
        index--;
        if (index > 0 && !this.pinIsFull) {
          $("#digit" + index).children().eq(0).val("");
          $("#digit" + index).children().eq(0).focus();
        }
        if (index == 5) this.pinIsFull = false;
      }
    }

    if ($(event.target).val().length == 0) {
      $(event.target).parent().css('border-bottom', '2px solid #F2F2F2');
    } else {
      $(event.target).parent().css('border-bottom', '2px solid black');
    }

    if ($(event.target).parent().attr('id') == "cardNumber" && $(event.target).val().length == 16) {
      $("#expirationDate").children().eq(0).focus();
    }

    if ($(event.target).parent().attr('id') == "expirationDate" && $(event.target).val().length == 5) {
      $("#cvv").children().eq(0).focus();
    }

    if ($(event.target).parent().attr('id') == "cvv" && $(event.target).val().length == 3) {
      $("#postalCode").children().eq(0).focus();
    }

    if ($(event.target).parent().attr('id') == "expirationDate") {
      var value = $(event.target).val();
      var length = value.length;
      switch (length) {
        case 1:
          if (value > 1) {
            if (event.key != "Backspace") $(event.target).val("0" + value + "/");
          }
          break;

          case 2:
            if (value > 12) {
              $(event.target).val("0" + value[0] + "/" + value[1]);
            } else {
              if (event.key != "Backspace") $(event.target).val(value + "/");
            }
            break;
        default:

      }
    }


    if ($(event.target).parent().attr('id') == "postalCode") {
      var value = $(event.target).val();
      var length = value.length;
      $(event.target).val(value.toUpperCase());
    }

    if ($(event.target).attr('id') == "input") {
      var value = $(event.target).val();
      var length = value.length;
      switch (length) {
        case 3:
          if (event.key != "Backspace") {
            if (value[0] != "(") {
              $(event.target).val("(" + value + ") ");
            }
          }
          break;

          case 4:
            if (event.key != "Backspace") {
              if (value[0] == "(") {
                $(event.target).val(value + ") ");
              }
            }
            break;

            case 5:
              if (event.key != "Backspace") {
                if (value[0] == "(" && value[4] != ")") {
                  $(event.target).val(value.substring(0, 4) + ") " + value[4]);
                }
              }
              break;

              case 6:
                if (event.key != "Backspace") {
                  if (value[5] != " ") {
                    $(event.target).val(value.substring(0, 5) + " " + value[5]);
                  }
                }
                break;

          case 9:
            if (event.key != "Backspace") $(event.target).val(value + "-");
            break;

            case 10:
              if (event.key != "Backspace") $(event.target).val(value.substring(0, 9) + "-" + value[9]);
              break;

        default:

      }
    }
  }

  /*****************************************************************************
  Function: gotohome
  Purpose: Pushes Home page
  Parameters: None
  Return: None
  *****************************************************************************/
  gotohome() {
    this.navCtrl.setRoot(HomePage);
  }
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
    //When focusing on input, load phone number view if not already loaded
    if (!this.loaded) {
        this.loaded = true;
        $("#main").css('background-color', 'white');
        $("#main").css('height', '100vh');
        if (this.platform.is('ios')) {
          this.translate($("#main"), "0px", "-63.5vh");
        } else {
          this.translate($("#main"), "0px", "-63vh");
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
          $("#input").focus();
          setTimeout(() => {
            $("#input").focus();
          }, 1000);

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
        $("#input").blur();
        this.loaded = false;
        this.translate($("#title"), "0px", "0px");
        this.translate($("#inputBloc"), "0px", "0px");
        this.translate($("#main"), "0px", "0px");
        $("#title").css('font-size', '5.75vw');
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
    else if (this.currentView == "6-digit") {
      this.translate($("#digitTitle"), "0px", "0px");
      this.translate($("#title"), "0px", "10vh");
      this.translate($("#digitBloc"), "0px", "0px");
      this.translate($("#inputBloc"), "0px", "14vh");
      this.currentView = "phoneNumber";
    }

    //back to the 6-digit PIN view
    else if (this.currentView == "email") {
      this.translate($("#emailTitle"), "0px", "0px");
      this.translate($("#digitTitle"), "-100vw", "0px");
      this.translate($("#emailInput"), "0px", "0px");
      this.translate($("#digitBloc"), "-100vw", "0px");
      $("#digit1").children().eq(0).val("");
      $("#digit2").children().eq(0).val("");
      $("#digit3").children().eq(0).val("");
      $("#digit4").children().eq(0).val("");
      $("#digit5").children().eq(0).val("");
      $("#digit6").children().eq(0).val("");
      this.currentView = "6-digit";
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
      $("#nextBtn").show();
      $("#nextBtn").removeClass('hidden').addClass('visible');
      this.translate($("#paymentTitle"), "0px", "0px");
      this.translate($("#nameTitle"), "-100vw", "0px");
      this.translate($("#paymentList"), "0px", "0px");
      this.translate($("#nameInput"), "-100vw", "0px");
      this.currentView = "name";
    }

    //back to the payment methods view
    else if (this.currentView == "creditCardForm") {
      this.translate($("#creditCardTitle"), "0px", "0px");
      this.translate($("#paymentTitle"), "-100vw", "0px");
      this.translate($("#creditCartInputs"), "0px", "0px");
      this.translate($("#paymentList"), "-100vw", "0px");
      this.currentView = "paymentMethod";
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
        if ($("#input").val().length == 14) {
          this.currentView = "6-digit";
          this.translate($("#digitTitle"), "-100vw", "0px");
          this.translate($("#title"), "-100vw", "10vh");
          this.translate($("#digitBloc"), "-100vw", "0px");
          this.translate($("#inputBloc"), "-100vw", "14vh");
          setTimeout(() => { $("#digit1").children().eq(0).focus(); }, 1000);

          $("#digit1").children().eq(0).val("");
          $("#digit2").children().eq(0).val("");
          $("#digit3").children().eq(0).val("");
          $("#digit4").children().eq(0).val("");
          $("#digit5").children().eq(0).val("");
          $("#digit6").children().eq(0).val("");

          $("#digit1").css('border-bottom', '2px solid black');
          $("#digit2").css('border-bottom', '2px solid #F2F2F2');
          $("#digit3").css('border-bottom', '2px solid #F2F2F2');
          $("#digit4").css('border-bottom', '2px solid #F2F2F2');
          $("#digit5").css('border-bottom', '2px solid #F2F2F2');
          $("#digit6").css('border-bottom', '2px solid #F2F2F2');

          this.signInWithPhoneNumber();
        } else {
          $("#input").parent().css('border-bottom', '2px solid red');
          $("#input").focus();
        }
        break;

      //Go to enter your name email
      case "6-digit":
        if ($("#digit1").children().eq(0).val().length == 1 &&
            $("#digit2").children().eq(0).val().length == 1 &&
            $("#digit3").children().eq(0).val().length == 1 &&
            $("#digit4").children().eq(0).val().length == 1 &&
            $("#digit5").children().eq(0).val().length == 1 &&
            $("#digit6").children().eq(0).val().length == 1)
        {
          this.confirmSmsCode();
        } else {
          $("#digit1").css('border-bottom', '2px solid red');
          $("#digit2").css('border-bottom', '2px solid red');
          $("#digit3").css('border-bottom', '2px solid red');
          $("#digit4").css('border-bottom', '2px solid red');
          $("#digit5").css('border-bottom', '2px solid red');
          $("#digit6").css('border-bottom', '2px solid red');

          $("#digit1").children().eq(0).val().length == 0 ? $("#digit1").children().eq(0).focus() :
          ($("#digit2").children().eq(0).val().length == 0 ? $("#digit2").children().eq(0).focus() :
          ($("#digit3").children().eq(0).val().length == 0 ? $("#digit3").children().eq(0).focus() :
          ($("#digit4").children().eq(0).val().length == 0 ? $("#digit4").children().eq(0).focus() :
          ($("#digit5").children().eq(0).val().length == 0 ? $("#digit5").children().eq(0).focus() :
          ($("#digit6").children().eq(0).val().length == 0 ? $("#digit6").children().eq(0).focus() : null)))));
        }
        break;

      //Go to enter your name password
      case "email":
        var email = $("#emailInput").children().eq(0).val();
        this.email = email;
        if (email.length > 0 && email.indexOf("@") != -1 && email.indexOf(".") != -1) {
            this.currentView = "password";
            $("#passwordInput").css('border-bottom', '2px solid black');
            this.translate($("#passwordTitle"), "-100vw", "0px");
            this.translate($("#emailTitle"), "-200vw", "0px");
            this.translate($("#passwordInput"), "-100vw", "0px");
            this.translate($("#emailInput"), "-200vw", "0px");
            setTimeout(() => { $("#passwordInput").children().eq(0).focus(); }, 1000);
        } else {
          $("#emailInput").css('border-bottom', '2px solid red');
          $("#emailInput").children().eq(0).focus();
        }
        break;

      //Go to enter your name view
      case "password":
        var password = $("#passwordInput").children().eq(0).val();
        this.password = password;
        if (password.length >= 5) {
            this.currentView = "name";
            $("#firstName").css('border-bottom', '2px solid black');
            $("#lastName").css('border-bottom', '2px solid #F2F2F2');
            this.translate($("#nameTitle"), "-100vw", "0px");
            this.translate($("#passwordTitle"), "-200vw", "0px");
            this.translate($("#nameInput"), "-100vw", "0px");
            this.translate($("#passwordInput"), "-200vw", "0px");
            setTimeout(() => { $("#firstName").children().eq(0).focus(); }, 1000);
          } else {
           $("#passwordInput").css('border-bottom', '2px solid red');
           $("#passwordInput").children().eq(0).focus();
         }
         break;

      //Go to enter select payment method
      case "name":
        var firstName = $("#firstName").children().eq(0).val();
        var lastName = $("#lastName").children().eq(0).val();
        this.firstName = firstName; this.lastName = lastName;
        if (firstName.length > 0 && lastName.length > 0) {
          this.currentView = "paymentMethod";
          $("#nextBtn").hide();
          this.translate($("#paymentTitle"), "-100vw", "0px");
          this.translate($("#nameTitle"), "-200vw", "0px");
          this.translate($("#paymentList"), "-100vw", "0px");
          this.translate($("#nameInput"), "-200vw", "0px");
        } else {
          if (firstName.length == 0) {
            $("#firstName").css('border-bottom', '2px solid red');
            $("#firstName").children().eq(0).focus();
          }
          if (lastName.length == 0) {
            $("#lastName").css('border-bottom', '2px solid red');
            $("#lastName").children().eq(0).focus();
          }
        }
        break;

      //Go to credit card form
      case "paymentMethod":
        this.currentView = "creditCardForm";
        $("#cardName").css('border-bottom', '2px solid black');
        $("#cardNumber").css('border-bottom', '2px solid #F2F2F2');
        $("#expirationDate").css('border-bottom', '2px solid #F2F2F2');
        $("#cvv").css('border-bottom', '2px solid #F2F2F2');
        $("#country").css('border-bottom', '2px solid #F2F2F2');
        $("#postalCode").css('border-bottom', '2px solid #F2F2F2');

        this.translate($("#creditCardTitle"), "-100vw", "0px");
        this.translate($("#paymentTitle"), "-200vw", "0px");
        this.translate($("#creditCartInputs"), "-100vw", "0px");
        this.translate($("#paymentList"), "-200vw", "0px");
        setTimeout(() => { $("#cardName").children().eq(0).focus(); }, 1000);
        break;

      default:
    }
  }

  /*****************************************************************************
  Function: selectCreditCard
  Description: Go to the credit card form
  Parameters: none
  Return: void
  *****************************************************************************/
  selectCreditCard () {
    this.goToNext();
  }

  /*****************************************************************************
  Function: signInWithPhoneNumber
  Description: Sign in user with his phone number
  Parameters: none
  Return: void
  *****************************************************************************/
  signInWithPhoneNumber() {
    const appVerifier = this.recaptchaVerifier;
    var value = $("#input").val();
    const phoneNumberString = "+1" + value.substring(1, 4) + value.substring(6, 9) + value.substring(10, 14);
    this.phoneNumber = phoneNumberString;

    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.smsConfirmation = confirmationResult;
      })
      .catch(function (error) {
        alert(error);
        console.error("SMS not sent", error);
      });
  }

  /*****************************************************************************
  Function: confirmSmsPin
  Description: sms 6-digit code confirmation
  Parameters: none
  Return: void
  *****************************************************************************/
  confirmSmsCode() {
    var confirmationCode = "";
    for (var i = 1; i < 7; i++) {
      confirmationCode += $("#digit" + i).children().eq(0).val();
    }
    let controller = this;

    this.smsConfirmation.confirm(confirmationCode)
    .then(function (result) {
      // User signed in successfully.
      if (result.user && controller.alreadyExists()) {
        controller.gotohome();
      } else {
        controller.currentView = "email";
        $("#emailInput").css('border-bottom', '2px solid black');
        controller.translate($("#emailTitle"), "-100vw", "0px");
        controller.translate($("#digitTitle"), "-200vw", "0px");
        controller.translate($("#emailInput"), "-100vw", "0px");
        controller.translate($("#digitBloc"), "-200vw", "0px");
        setTimeout(() => { $("#emailInput").children().eq(0).focus(); }, 1000);
      }

    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      $("#digit1").css('border-bottom', '2px solid red');
      $("#digit2").css('border-bottom', '2px solid red');
      $("#digit3").css('border-bottom', '2px solid red');
      $("#digit4").css('border-bottom', '2px solid red');
      $("#digit5").css('border-bottom', '2px solid red');
      $("#digit6").css('border-bottom', '2px solid red');

      $("#digit6").children().eq(0).focus();
      if (error.message.indexOf("The SMS code has expired") != -1) {
        controller.goBack();
        controller.showAlert("Confirmation Impossible !", "Le code SMS a expiré. Re-envoyez le code de vérification pour réessayer.");
      }
    });
  }

  /*****************************************************************************
  Function: createNewUser
  Purpose: Create a new user account in db
  Parameters: date(String): date to be saved
              hour(String): hour to be saved
  Return: None
  *****************************************************************************/
  createNewUser() {
    this.linkWithEmailAuth();

    var cardNumber = $("#cardNumber").children().eq(1).val().toString();
    var month = parseInt($("#expirationDate").children().eq(0).val().substring(0, 2));
    var year = parseInt('20' + $("#expirationDate").children().eq(0).val().substring(3, 5));
    var cvc = $("#cvv").children().eq(0).val().toString();

    var cardinfo = {
      number: cardNumber,
      expMonth: month,
      expYear: year,
      cvc: cvc
    }
    this.getCreditCardToken(cardinfo);

    setTimeout(() => {
      var token = this.cardToken;
      var email = this.email;
      this.getCustomerInfos(token.id, email);
    }, 2000);

    setTimeout(() => {
      var users = firebase.database().ref('Users/');
      var userId = firebase.auth().currentUser.uid;
      var firstName = this.firstName;
      var lastName = this.lastName;
      var phoneNumberString = this.phoneNumber;
      var customerId = this.customerId; console.log(customerId);
      var email = this.email;
      users.child(userId).set({
        UserId: userId,
        Date: Date(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumberString,
        customerStripeId: customerId
      });
    }, 4000);

    //this.gotohome();
  }

  /*****************************************************************************
  Function: alreadyExists
  Purpose: Tells is the user already exists by using phone number
  Parameters: None
  Return: None
  *****************************************************************************/
  alreadyExists() {
    const phoneNumberString = this.phoneNumber;
    return (this.userAccounts.find(item => item.phoneNumber == phoneNumberString) != undefined);
  }

  /*****************************************************************************
  Function: isLoggedIn
  Purpose: Tells if there is a user logged in
  Parameters: None
  Return: True or False
  *****************************************************************************/
  isLoggedIn(): Boolean {
    var user = firebase.auth().currentUser;
    return (user != null && user != undefined) ? true : false;
  }

  /*****************************************************************************
  Function: updateUserAccounts
  Purpose: Fetch user accounts from db
  Parameters: None
  Return: None
  *****************************************************************************/
  updateUserAccounts() {
    let controller = this;
    firebase.database().ref('Users/')
     .on('value', function(snapshot) {
       let users = snapshot.val();
       controller.userAccounts = [];
       for (var property in users) {
          if (users.hasOwnProperty(property)) {
              controller.userAccounts.push(users[property]);
          }
       }
     });
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
  Function: showAlert
  Purpose: Display a pop-up alert to error messages
  Parameters: None
  Return: None
  *****************************************************************************/
  showAlert(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  /*****************************************************************************
  Function:   Function: presentAlert
  Description: Link user phone auth with email auth
  Also displays warning registration messages
  Parameters: None
  Return: None
  *****************************************************************************/
  linkWithEmailAuth() {
    if (!(this.email.length == 0 || this.password.length == 0)) {
      var credential = firebase.auth.EmailAuthProvider.credential(this.email, this.password);
      firebase.auth().currentUser.linkWithCredential(credential).then(function(user) {
        console.log("Account linking success: ", user);
      }, function(error) {
        this.showAlert('Enregistrement Impossible', 'Vous avez déjà un compte avec cette adresse courriel')
        console.log("Account linking error: ", error);
      });
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
      $(".header-img").height("65vh");
      $("#link").height("7.5vh");
    } else {
      $(".header-img").height("63vh");
      $("#link").height("7.5vh");
    }
  }

  /*****************************************************************************
  Function: getCreditCardToken
  Description: Retrieve user credit card token from stripe api
  Parameters: cardinfo (obj of card infos)
  Return: void
  *****************************************************************************/
  getCreditCardToken(cardinfo) {
    this.stripe.setPublishableKey('pk_test_0Ghlv6GvobZIFI0SyNuDglPL');
    this.stripe.createCardToken(cardinfo).then((token) => {
      this.cardToken = token;
    }).catch((error) => {
        console.log(error);
    });
  }

  /*****************************************************************************
  Function: getCustomerInfos
  Description: Retrieve user infos from stripe api
  Parameters: none
  Return: void
  *****************************************************************************/
  getCustomerInfos(token, email) {
    var data = 'stripetoken=' + token + '&email=' + email;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let controller = this;
    this.http.post('http://192.168.27.1:3333/createUser', data, { headers: headers }).subscribe((res) => {
      if (typeof(res) != "undefined") {
        $.each(res, function(key,valueObj){
          if (key == "_body") controller.customerId = valueObj;
        });
      } else {
        console.log('Unable to save customer infos!!');
      }
    });
  }

  onFocus(parentId) {
    $("#" + parentId).css('border-bottom', '2px solid black');
  }
}
