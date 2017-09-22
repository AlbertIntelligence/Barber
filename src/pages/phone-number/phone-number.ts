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
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  private userAccounts:Array<any> = [];
  private email:string;
  private password:string;
  private passwordConfirmation:string;
  private firstName:String;
  private lastName:String;
  private customerId:any = null;
  private cardToken:any = null;
  private userExists:Boolean;
  private passwordToBeReset:Boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,
     private keyboard: Keyboard, public platform: Platform, public alertCtrl: AlertController,
     public stripe: Stripe, public http: Http) {
       this.updateUserAccounts();
  }

  ngOnInit(): any {
    this.setHeaderFooter();
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {'size' : 'invisible'});
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
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
  Function: enterYourEmail
  Description: Trigger the transition
  Parameters: event
  Return: void
  *****************************************************************************/
  enterYourEmail(action?: string) {
    //When focusing on input, load phone number view if not already loaded
    if (!this.loaded) {
        $("#backBtn").show();
        $("#email").blur();
        this.loaded = true;
        $("#main").css('background-color', 'white');
        $("#main").css('height', '100vh');
        if (this.platform.is('ios')) {
          this.translate($("#main"), "0px", "-67vh");
        } else {
          this.translate($("#main"), "0px", "-63vh");
        }
        $("#link").removeClass('visible').addClass('hidden');
        this.translate($("#title"), "0px", "10vh");
        this.translate($("#emailInput"), "0px", "14vh");
        $("#title").css('font-size', '5vw');
        $("#backBtn").css('margin-top', '2vh');

        if (action) {
          $("#title").text("Réinitialiser votre mot de passe");  //Password reset
          this.passwordToBeReset = true;
        } else {
          $("#title").text("Entrez votre adresse courriel");
        }

        $("#hr").removeClass('visible').addClass('hidden');
        $("#email").attr("placeholder", "exemple@mail.ca");

        //Animation slow
        setTimeout(() => {
          $("#backBtn").css('height', 'auto');
          $("#backBtn").removeClass('hidden').addClass('visible');
          $("#nextBtn").removeClass('hidden').addClass('visible');
          $("#emailInput").css('border-bottom', '2px solid black');
          //$("#email").focus();
          setTimeout(() => {
            $("#email").click().focus();
          }, 4000);
          $("#email").click().focus();

        }, 1000);

        this.currentView = "email";
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
    if (this.loaded && this.currentView == "email") {
        $("#email").blur();
        this.loaded = false;
        this.translate($("#title"), "0px", "0px");
        this.translate($("#emailInput"), "0px", "0px");
        this.translate($("#main"), "0px", "0px");
        $("#title").css('font-size', '5.75vw');
        $("#backBtn").css('margin-top', '0');
        $("#title").text("Coiffez vous avec Barber Me");
        $("#hr").removeClass('hidden').addClass('visible');
        $("#backBtn").addClass('hidden').removeClass('visible'); $("#backBtn").hide();
        $("#nextBtn").addClass('hidden').removeClass('visible');
        $("#emailInput").css('border', '0');
        $("#email").attr("placeholder", "Entrez votre adresse courriel");

        setTimeout(() => {
          $("#main").css('height', 'auto');
          $("#link").removeClass('hidden').addClass('visible');
        }, 1000);
        this.currentView = "home";
        this.passwordToBeReset = false;
    }

    //back to the email view
    else if (this.currentView == "password") {
      this.translate($("#passwordTitle"), "0px", "0px");
      this.translate($("#title"), "0px", "10vh");
      this.translate($("#passwordInput"), "0px", "0px");
      this.translate($("#emailInput"), "0px", "14vh");
      this.currentView = "email";
    }

    //back to the password view
    else if (this.currentView == "passwordConfirmation") {
      this.translate($("#passwordConfirmationTitle"), "0px", "0px");
      this.translate($("#passwordTitle"), "-100vw", "0px");
      this.translate($("#passwordConfirmationInput"), "0px", "0px");
      this.translate($("#passwordInput"), "-100vw", "0px");
      this.currentView = "password";
    }

    //back to the password confirmation view
    else if (this.currentView == "name") {
      this.translate($("#nameTitle"), "0px", "0px");
      this.translate($("#passwordConfirmationTitle"), "-100vw", "0px");
      this.translate($("#nameInput"), "0px", "0px");
      this.translate($("#passwordConfirmationInput"), "-100vw", "0px");
      this.currentView = "passwordConfirmation";
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
  Description: Show the next ui
  Parameters: None
  Return: None
  *****************************************************************************/
  goToNext() {
    switch (this.currentView) {
      //Go to enter your password view
      case "email":
        this.userExists = false;
        var email = $("#email").val();
        if (email.length > 3 && email.indexOf("@") != -1 && email.indexOf(".") != -1) {
          if (this.passwordToBeReset) {
            let controller = this;
            firebase.auth().sendPasswordResetEmail(this.email).then(function(){
              controller.showAlert('Courriel Envoyé!', 'Un courriel avec un lien de réinitialisation de mot de passe vous a été envoyé.');
            }).catch(function(){
              controller.showAlert('Erreur!', 'Adresse courriel invalide.');
            });

          } else {
            this.currentView = "password";
            $("#passwordInput").css('border-bottom', '2px solid black');
            this.translate($("#passwordTitle"), "-100vw", "0px");
            this.translate($("#title"), "-100vw", "10vh");
            this.translate($("#passwordInput"), "-100vw", "0px");
            this.translate($("#emailInput"), "-100vw", "14vh");

            //Check if user is already registered
            if (this.alreadyExists()) {
              this.userExists = true;
              var passTitle = (this.userExists) ? 'Ravi de vous revoir, entrez votre mot de passe' : 'Créez votre mot de passe';
              $("#passwordTitle").children().eq(0).text(passTitle);
            }
            setTimeout(() => { $("#passwordInput").children().eq(0).focus(); }, 1000);
          }
        } else {
          $("#emailInput").css('border-bottom', '2px solid red');
          $("#email").focus();
        }
        break;

      //Go to enter your password confirmation view
      case "password":
        var password = $("#passwordInput").children().eq(0).val();
        this.password = password;

        //If user is already registered, login user
        if (password.length >= 5 && this.userExists) {
          this.loginUser();
          break;
        }

        if (password.length >= 5) {
            this.currentView = "passwordConfirmation";
            $("#passwordConfirmationInput").css('border-bottom', '2px solid black');
            this.translate($("#passwordConfirmationTitle"), "-100vw", "0px");
            this.translate($("#passwordTitle"), "-200vw", "0px");
            this.translate($("#passwordConfirmationInput"), "-100vw", "0px");
            this.translate($("#passwordInput"), "-200vw", "0px");
            setTimeout(() => { $("#passwordConfirmationInput").children().eq(0).focus(); }, 1000);
          } else {
           $("#passwordInput").css('border-bottom', '2px solid red');
           $("#passwordInput").children().eq(0).focus();
         }
         break;

      //Go to enter your name view
      case "passwordConfirmation":
       var passwordConfirmation = $("#passwordConfirmationInput").children().eq(0).val();
       this.passwordConfirmation = passwordConfirmation;
       if (this.passwordConfirmation == this.password) {
           this.currentView = "name";
           $("#firstName").css('border-bottom', '2px solid black');
           $("#lastName").css('border-bottom', '2px solid #F2F2F2');
           this.translate($("#nameTitle"), "-100vw", "0px");
           this.translate($("#passwordConfirmationTitle"), "-200vw", "0px");
           this.translate($("#nameInput"), "-100vw", "0px");
           this.translate($("#passwordConfirmationInput"), "-200vw", "0px");
           setTimeout(() => { $("#firstName").children().eq(0).focus(); }, 1000);
         } else {
          $("#passwordConfirmationInput").css('border-bottom', '2px solid red');
          $("#passwordConfirmationInput").children().eq(0).focus();
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
          if (lastName.length == 0) {
            $("#lastName").css('border-bottom', '2px solid red');
            $("#lastName").children().eq(0).focus();
          }
          if (firstName.length == 0) {
            $("#firstName").css('border-bottom', '2px solid red');
            $("#firstName").children().eq(0).focus();
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
  Function: createNewUser
  Purpose: Create a new user account in db
  Parameters: date(String): date to be saved
              hour(String): hour to be saved
  Return: None
  *****************************************************************************/
  createNewUser() {
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
  }

  /*****************************************************************************
  Function: alreadyExists
  Purpose: Tells is the user already exists by using phone number
  Parameters: None
  Return: None
  *****************************************************************************/
  alreadyExists() {
    const email = this.email;
    return (this.userAccounts.find(item => item.email == email) != undefined);
  }

  /*****************************************************************************
  Function: createUser
  Description: Validate entries and create new user in firebase database.
  Also displays warning registration messages
  Parameters: None
  Return: None
  *****************************************************************************/
  createUser() {
    var users = firebase.database().ref('Users/');
    var firstName = this.firstName;
    var lastName = this.lastName;
    var customerId = this.customerId;
    var email = this.email;
    let loginController = this;

    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function (data) {
      loginController.loginUser();
      var userId = firebase.auth().currentUser.uid;

      //Create user instance in db
      users.child(userId).set({
        UserId: userId,
        Date: Date(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        customerStripeId: customerId
      });
    }).catch(function (error) {
      loginController.showAlert('Inscription Impossible !', 'Veuillez entrer une adresse courriel valide.');
    });
  }

  /*****************************************************************************
  Function: loginUser
  Purpose: Validate the entries and logs the user in.
  Parameters: None
  Return: None
  *****************************************************************************/
  loginUser() {
    this.logoutUser();
    let controller = this;
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function (data) {
      if (controller.isLoggedIn()) controller.gotohome();
    }).catch(function (error) {
      controller.showAlert('Authentification Impossible !', 'Adresse courriel ou mot de passe éronné.');
    });
  }

  /*****************************************************************************
  Function: logoutUser
  Purpose: Logs the user out
  Parameters: None
  Return: None
  *****************************************************************************/
  logoutUser(): firebase.Promise<void> {
    return firebase.auth().signOut();
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
  Function: setFooter
  Description: Set the footer dimensions for iOS
  Parameters: none
  Return: void
  *****************************************************************************/
  setHeaderFooter() {
    if (this.platform.is('ios')) {
      //$(".header-img").height("67vh");
      //$("#link").height("5.5vh");
    } else {
      //$(".header-img").height("63vh");
      //$("#link").height("7.5vh");
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
      this.getCustomerInfos(this.cardToken.id, this.email);
    }).catch((error) => {
        this.showAlert('Inscription Impossible !', 'Carte de crédit invalide.');
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
          if (key == "_body") {
            controller.customerId = valueObj;
            controller.createUser();
          }
        });
      } else {
        this.showAlert('Inscription Impossible !', 'Carte de crédit invalide.');
        console.log('Unable to save customer infos!!');
      }
    });
  }

  onFocus(parentId) {
    $("#" + parentId).css('border-bottom', '2px solid black');
  }

}
