webpackJsonp([0],{

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GetaTicketPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ticket_confirmation_ticket_confirmation__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert_alert__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let GetaTicketPage = class GetaTicketPage {
    constructor(nav, newAlert, ticketConfirmation) {
        this.nav = nav;
        this.newAlert = newAlert;
        this.ticketConfirmation = ticketConfirmation;
        this.dataSnapshot = [];
        this.getCurrentClient();
        this.getLastClient();
        this.getUserInfo();
        this.updateDataSnapshot();
    }
    ionViewDidLoad() {
        this.hideTicketDiv();
    }
    makeTransaction() {
        if (this.startTransaction) {
            this.addClientToList();
            this.nav.push(__WEBPACK_IMPORTED_MODULE_2__ticket_confirmation_ticket_confirmation__["a" /* TicketConfirmationPage */]);
            this.setHiddeDiv(false);
            this.TicketDiv();
        }
    }
    //------------------------------------------THIS IS THE FIREBASE FUNCTION SECTION----------------------------------------------//
    getUserInfo() {
        //initilize those empty string to make compiler happy
        var firstName = "";
        var lastName = "";
        var email = "";
        var phoneNumber = "";
        var Date = "";
        var userData;
        var userId = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid;
        const userInfo = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("Users/" + userId + "/");
        userInfo.on('value', snap => userData = snap.val());
        this.userInfoFirstName = userData.firstName;
        this.userInfoLastName = userData.lastName;
        this.userInfoEmailName = userData.email;
        this.userInfoPhoneNumber = userData.phoneNumber;
        this.userInfoUserId = userId;
        this.userInfoRegistrationDate = userData.Date;
    }
    /*****************************************************************************
     Function: checkPayment
     Auteur(s): Lenz Petion
     Date de creation: 2017-06-03
     Date de modification:
     Description: This function tells if a user is logged in
     *****************************************************************************/
    getCurrentClient() {
        const dbRefObject = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('TicketList/Users/');
        dbRefObject.limitToFirst(1).on('value', function (snapshot) {
            const ids = [];
            snapshot.forEach(function (childSnapshot) {
                const id = childSnapshot.key;
                ids.push(id);
            }.bind(this));
            this.currentPosition = ids;
        }.bind(this));
    }
    /*****************************************************************************
     Function: checkPayment
     Auteur(s): Lenz Petion
     Date de creation: 2017-06-03
     Date de modification:
     Description: This function tells if a user is logged in
     *****************************************************************************/
    getLastClient() {
        const dbRefObject = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('TicketList/Users/');
        dbRefObject.on('value', function (snapshot) {
            const ids = [];
            snapshot.forEach(function (childSnapshot) {
                const id = childSnapshot.key;
                ids.pop();
                ids.push(id);
            }.bind(this));
            this.lastPosition = ids;
        }.bind(this));
    }
    /*****************************************************************************
     Function: checkPayment
     Auteur(s): Lenz Petion
     Date de creation: 2017-06-03
     Date de modification:
     Description: This function tells if a user is logged in
     *****************************************************************************/
    addClientToList() {
        const dbRefObject = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref().child('TicketList/Users/');
        this.userPosition = Number(this.lastPosition) + 1;
        var uPosition = this.userPosition;
        this.ticketConfirmation = uPosition;
        dbRefObject.child(uPosition).set({
            "firstName": this.userInfoFirstName,
            "lastName": this.userInfoLastName,
            "email": this.userInfoEmailName,
            "phoneNumber": this.userInfoPhoneNumber,
            "uid": this.userInfoUserId
        });
    }
    updateDataSnapshot() {
        let model = this;
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('TicketList/Users/')
            .on('value', function (snapshot) {
            let tickets = snapshot.val();
            model.dataSnapshot = [];
            for (var property in tickets) {
                if (tickets.hasOwnProperty(property)) {
                    model.dataSnapshot.push(tickets[property]);
                }
            }
        });
    }
    isAvailable() {
        var userId = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid;
        return (this.dataSnapshot.find(item => item.uid == userId) == undefined);
    }
    //------------------------------------------THIS IS THE HELPER FUNCTION SECTION----------------------------------------------//
    setHiddeDiv(value) {
        this.hiddenDiv = value;
    }
    getHiddeDiv() {
        return this.hiddenDiv;
    }
    confirmMessage() {
        if (this.isAvailable()) {
            this.newAlert.presentAlert();
        }
        else
            this.newAlert.ticketExist();
    }
    // Open ticket confirmation view page
    getTicketConfirmation() {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__ticket_confirmation_ticket_confirmation__["a" /* TicketConfirmationPage */]);
    }
    TicketDiv() {
        if (this.hiddenDiv == true) {
            this.hideTicketDiv();
        }
        else
            this.showTicketDiv();
    }
    showTicketDiv() {
        __WEBPACK_IMPORTED_MODULE_5_jquery__('#ticketPosition').show();
        __WEBPACK_IMPORTED_MODULE_5_jquery__("#ticketPosition").delay(5000).hide(0);
    }
    hideTicketDiv() {
        __WEBPACK_IMPORTED_MODULE_5_jquery__('#ticketPosition').hide();
    }
};
GetaTicketPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'get-a-ticket',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\get-a-ticket\get-a-ticket.html"*/'\n\n<script>\n\n  this.hideTicketDiv();\n\n</script>\n\n<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Prendre un ticket\n\n    </ion-title>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding="false" class="common-bg">\n\n  <div style="">\n\n    <div style="">\n\n      <div style="display: block; border: 1px solid #C5C5C5; border-radius: 100%; padding: 0">\n\n        <img color="primary" src="../../assets/img/bg.jpg" style="display: block; margin: auto; border: 3vw solid #009687; width: 70vw; height: 70vw; border-radius: 100%" />\n\n      </div>\n\n      <div style="font-size: 20px; margin-top: 10px" text-center>{{userInfoFirstName + " " + userInfoLastName }}</div>\n\n      <div style="font-size: 10px" text-center>\n\n        <ion-icon color="primary" style="" name="pin"></ion-icon>\n\n        Montreal, Canada</div>\n\n    </div>\n\n\n\n\n\n    <div>\n\n\n\n      <div id="ticketPosition"  class="animated infinite bounce" >\n\n        <ion-grid style="margin-top: 15%">\n\n          <ion-row>\n\n            <ion-col col-6>\n\n              <ion-row>\n\n                <p style="margin:auto; font-size: 20px"><b>{{currentPosition}}</b></p>\n\n              </ion-row>\n\n              <ion-row>\n\n                <p style="margin:auto; font-size: 10px">CLIENT ACTUELE</p>\n\n              </ion-row>\n\n            </ion-col>\n\n            <ion-col col-6>\n\n              <ion-row>\n\n                <p style="margin:auto; font-size: 20px"><b>{{userPosition}}</b></p>\n\n              </ion-row>\n\n              <ion-row>\n\n                <p style="margin:auto; font-size: 10px">VOTRE POSITION</p>\n\n              </ion-row>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-grid>\n\n      </div>\n\n\n\n      <ion-grid style="margin-top: 1%">\n\n        <ion-row>\n\n          <ion-icon (click)="confirmMessage()" color="primary" style="margin:auto; font-size: 50px;" name="add-circle"></ion-icon>\n\n        </ion-row>\n\n\n\n        <ion-row>\n\n          <p style="margin:auto; font-size: 10px">PRENDRE UN NUMERO</p>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </div>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\get-a-ticket\get-a-ticket.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__alert_alert__["a" /* Alert */], __WEBPACK_IMPORTED_MODULE_2__ticket_confirmation_ticket_confirmation__["a" /* TicketConfirmationPage */]])
], GetaTicketPage);

//# sourceMappingURL=get-a-ticket.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketConfirmationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
   Generated class for the TicketConfirmation page.
 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
let TicketConfirmationPage = class TicketConfirmationPage {
};
TicketConfirmationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'ticket-confirmation',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\ticket-confirmation\ticket-confirmation.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Confirmation\n\n    </ion-title>\n\n    <ion-buttons left>\n\n     <button ion-button icon-only>\n\n    </button>\n\n  </ion-buttons>\n\n</ion-navbar>\n\n</ion-header>\n\n<ion-content padding="false" class="primary-bg" color="white">\n\n  <ion-row>\n\n    <ion-icon color="primary" style="margin:auto; margin-top: 15vh; font-size: 70vw; color: white" name="ios-checkmark-circle-outline"></ion-icon>\n\n  </ion-row>\n\n  <ion-row>\n\n    <div style="font-size: 20px; margin: auto; margin-top: 10px; color: white" text-center>Reservation completed !</div>\n\n  </ion-row>\n\n  <ion-row>\n\n    <div style="font-size: 20px; margin: auto; margin-top: 10px; color: white" text-center>You have {{userPosition}} in front you.</div>\n\n  </ion-row>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\ticket-confirmation\ticket-confirmation.html"*/
    })
], TicketConfirmationPage);

//# sourceMappingURL=ticket-confirmation.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__create_user_create_user__ = __webpack_require__(536);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let LoginPage = class LoginPage {
    constructor(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.email = "";
        this.password = "";
        // Send a text message using default options
    }
    /*****************************************************************************
    Function: gotohome
    Purpose: Pushes Home page
    Parameters: None
    Return: None
    *****************************************************************************/
    gotohome() {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    }
    /*****************************************************************************
    Function: gotoCreateUser
    Purpose: Pushes create-user page
    Parameters: None
    Return: None
    *****************************************************************************/
    gotoCreateUser() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__create_user_create_user__["a" /* CreateUserPage */]);
    }
    /*****************************************************************************
    Function: loginUser
    Purpose: Validate the entries and logs the user in.
    Parameters: None
    Return: None
    *****************************************************************************/
    loginUser() {
        if (this.email.length == 0 || this.password.length == 0) {
            this.showAlert('Authentification Impossible !', 'Veuillez remplir tous les champs.');
        }
        else {
            this.logoutUser();
            let loginController = this;
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().signInWithEmailAndPassword(this.email, this.password).then(function (data) {
                if (loginController.isLoggedIn())
                    loginController.gotohome();
            }).catch(function (error) {
                loginController.showAlert('Authentification Impossible !', error.toString().substring(7, error.toString().length));
            });
        }
    }
    /*****************************************************************************
    Function: logoutUser
    Purpose: Logs the user out
    Parameters: None
    Return: None
    *****************************************************************************/
    logoutUser() {
        return __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().signOut();
    }
    /*****************************************************************************
    Function: resetPassword
    Purpose: Allows the user to change his password
    Parameters: None
    Return: None
    *****************************************************************************/
    resetPassword(email) {
        return __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().sendPasswordResetEmail(email);
    }
    /*****************************************************************************
    Function: facebookLogin
    Auteur(s): Koueni Deumeni
    Date de creation: 2017-06-03
    Date de modification:
    Description: This function logs in the user via his facebook account
    *****************************************************************************/
    /*facebookLogin() {
      /*this.facebook.login(['', '', 'fataldika@hotmail.com'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log('Error logging into Facebook', e));
 
      //this.facebook.logEvent(this.facebook.EVENTS.EVENT_NAME_ADDED_TO_CART);
 
     this.facebook.login(['']).then( (response) => {
         const facebookCredential = firebase.auth.FacebookAuthProvider
             .credential(response.authResponse.accessToken);
 
         firebase.auth().signInWithCredential(facebookCredential)
         .then((success) => {
             alert("Firebase success: " + JSON.stringify(success));
             this.userProfile = success;
         })
         .catch((error) => {
             alert("Firebase failure: " + JSON.stringify(error));
         });
 
     }).catch((error) => { alert("Error : " + error); });
   }*/
    /*****************************************************************************
    Function: isLoggedIn
    Purpose: Tells if there is a user logged in
    Parameters: None
    Return: True or False
    *****************************************************************************/
    isLoggedIn() {
        var user = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser;
        return (user != null && user != undefined) ? true : false;
    }
    /*****************************************************************************
    Function: showAlert
    Purpose: Display warning message on a pop-up
    Parameters: title: The pop-up title
                subTitle: The pop-up message
    Return: None
    *****************************************************************************/
    showAlert(title, subtitle) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    }
};
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\login\login.html"*/'<!--\n\n  Generated template for the ProfilePage page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-content padding class="login common-bg auth-page">\n\n  <div class="login-content">\n\n\n\n    <!-- Logo -->\n\n    <div padding text-center>\n\n      <h2 ion-text color="light">\n\n        Mario Perfect Cut\n\n      </h2>\n\n    </div>\n\n\n\n    <!-- Login form -->\n\n    <div class="list-form" padding>\n\n\n\n      <ion-item>\n\n        <ion-label stacked>Email</ion-label>\n\n        <ion-input [(ngModel)]="email" type="text" color="white"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label stacked>Password</ion-label>\n\n        <ion-input [(ngModel)]="password" type="password"></ion-input>\n\n      </ion-item>\n\n\n\n    </div>\n\n\n\n    <p text-right ion-text color="light">Mot de passe oublié?</p>\n\n\n\n    <div>\n\n      <button ion-button block color="primary" (click)="loginUser()">\n\n        SE CONNECTER\n\n      </button>\n\n\n\n      <p text-center ion-text color="light">Ou</p>\n\n\n\n      <button ion-button block color="fb-color" (click)="gotoCreateUser()">\n\n        S\'INSCRIRE\n\n      </button>\n\n    </div>\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 163;

/***/ }),

/***/ 206:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 206;

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneNumberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_stripe__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__ = __webpack_require__(541);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













/**
 * Generated class for the CreateUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let PhoneNumberPage = class PhoneNumberPage {
    constructor(navCtrl, navParams, keyboard, platform, alertCtrl, stripe, http, network) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.keyboard = keyboard;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.stripe = stripe;
        this.http = http;
        this.network = network;
        this.loaded = false;
        this.currentView = "home";
        this.userAccounts = [];
        this.customerId = null;
        this.cardToken = null;
        this.passwordToBeReset = false;
        this.disconnected = false;
        this.updateUserAccounts();
        // watch network for a disconnect
        this.network.onDisconnect().subscribe(() => {
            this.showAlert('Pas de connexion internet', 'Vérifiez votre connexion internet.');
            this.disconnected = true;
        });
        this.network.onConnect().subscribe(() => {
            this.updateUserAccounts();
            this.disconnected = false;
        });
    }
    ngOnInit() {
        this.setHeaderFooter();
    }
    handleKeyboardEvent(event) {
        if (__WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val().length == 0) {
            __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).parent().css('border-bottom', '2px solid #F2F2F2');
        }
        else {
            __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).parent().css('border-bottom', '2px solid black');
        }
        if (__WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).parent().attr('id') == "cardNumber" && __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val().length == 16) {
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#expirationDate").children().eq(0).focus();
        }
        if (__WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).parent().attr('id') == "expirationDate" && __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val().length == 5) {
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#cvv").children().eq(0).focus();
        }
        if (__WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).parent().attr('id') == "cvv" && __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val().length == 3) {
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#phoneNumber").children().eq(0).focus();
        }
        if (__WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).parent().attr('id') == "expirationDate") {
            var value = __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val();
            var length = value.length;
            switch (length) {
                case 1:
                    if (value > 1) {
                        if (event.key != "Backspace")
                            __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val("0" + value + "/");
                    }
                    break;
                case 2:
                    if (value > 12) {
                        __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val("0" + value[0] + "/" + value[1]);
                    }
                    else {
                        if (event.key != "Backspace")
                            __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val(value + "/");
                    }
                    break;
                default:
            }
        }
        if (__WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).parent().attr('id') == "postalCode") {
            var value = __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val();
            var length = value.length;
            __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val(value.toUpperCase());
        }
        if (__WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).attr('id') == "input") {
            var value = __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val();
            var length = value.length;
            switch (length) {
                case 3:
                    if (event.key != "Backspace") {
                        if (value[0] != "(") {
                            __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val("(" + value + ") ");
                        }
                    }
                    break;
                case 4:
                    if (event.key != "Backspace") {
                        if (value[0] == "(") {
                            __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val(value + ") ");
                        }
                    }
                    break;
                case 5:
                    if (event.key != "Backspace") {
                        if (value[0] == "(" && value[4] != ")") {
                            __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val(value.substring(0, 4) + ") " + value[4]);
                        }
                    }
                    break;
                case 6:
                    if (event.key != "Backspace") {
                        if (value[5] != " ") {
                            __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val(value.substring(0, 5) + " " + value[5]);
                        }
                    }
                    break;
                case 9:
                    if (event.key != "Backspace")
                        __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val(value + "-");
                    break;
                case 10:
                    if (event.key != "Backspace")
                        __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).val(value.substring(0, 9) + "-" + value[9]);
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
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    }
    gotoLoginPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
    }
    /*****************************************************************************
    Function: enterYourEmail
    Description: Trigger the transition
    Parameters: event
    Return: void
    *****************************************************************************/
    enterYourEmail(action) {
        //When focusing on input, load phone number view if not already loaded
        this.keyboard.disableScroll(true);
        if (!this.loaded) {
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#input").blur();
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#backBtn").show();
            this.loaded = true;
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#main").css('background-color', 'white');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#main").css('height', '100vh');
            if (this.platform.is('ios')) {
                this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#main"), "0px", "-67vh");
            }
            else {
                this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#main"), "0px", "-63vh");
            }
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#link").removeClass('visible').addClass('hidden');
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#title"), "0px", "10vh");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput"), "0px", "14vh");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#title").css('font-size', '5vw');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#backBtn").css('margin-top', '2vh');
            if (action) {
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#title").text("Réinitialiser votre mot de passe"); //Password reset
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#backBtn").css('margin-top', '10vh');
                this.passwordToBeReset = true;
            }
            else {
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#title").text("Entrez votre adresse courriel");
            }
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#hr").removeClass('visible').addClass('hidden');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#email").attr("placeholder", "exemple@mail.ca");
            //Animation slow
            setTimeout(() => {
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#backBtn").css('height', 'auto');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#backBtn").removeClass('hidden').addClass('visible');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#nextBtn").removeClass('hidden').addClass('visible');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput").css('border-bottom', '2px solid black');
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
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#input").blur();
            this.loaded = false;
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#title"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#main"), "0px", "0px");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#title").css('font-size', '5.75vw');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#backBtn").css('margin-top', '0');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#title").text("Coiffez vous avec Barber Me");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#hr").removeClass('hidden').addClass('visible');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#backBtn").addClass('hidden').removeClass('visible');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#backBtn").hide();
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#nextBtn").addClass('hidden').removeClass('visible');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput").css('border', '0');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#email").attr("placeholder", "Entrez votre adresse courriel");
            setTimeout(() => {
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#main").css('height', 'auto');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#link").removeClass('hidden').addClass('visible');
            }, 1000);
            this.currentView = "home";
            this.passwordToBeReset = false;
        }
        else if (this.currentView == "password") {
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordTitle"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#title"), "0px", "10vh");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput"), "0px", "14vh");
            this.currentView = "email";
        }
        else if (this.currentView == "passwordConfirmation") {
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordConfirmationTitle"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordTitle"), "-100vw", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordConfirmationInput"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput"), "-100vw", "0px");
            this.currentView = "password";
        }
        else if (this.currentView == "name") {
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameTitle"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordConfirmationTitle"), "-100vw", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameInput"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordConfirmationInput"), "-100vw", "0px");
            this.currentView = "passwordConfirmation";
        }
        else if (this.currentView == "paymentMethod") {
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#nextBtn").show();
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#nextBtn").removeClass('hidden').addClass('visible');
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#paymentTitle"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameTitle"), "-100vw", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#paymentList"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameInput"), "-100vw", "0px");
            this.currentView = "name";
        }
        else if (this.currentView == "creditCardForm") {
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#creditCardTitle"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#paymentTitle"), "-100vw", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#creditCartInputs"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#paymentList"), "-100vw", "0px");
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
        if (this.userAccounts.length == 0)
            this.disconnected = true;
        switch (this.currentView) {
            //Go to enter your password view
            case "email":
                if (this.disconnected) {
                    this.showAlert('Pas de connexion internet', 'Vérifiez votre connexion internet.');
                    break;
                }
                this.userExists = false;
                var email = __WEBPACK_IMPORTED_MODULE_3_jquery__("#email").val();
                this.email = email;
                if (email.length > 3 && email.indexOf("@") != -1 && email.indexOf(".") != -1) {
                    if (this.passwordToBeReset) {
                        let controller = this;
                        __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().sendPasswordResetEmail(this.email).then(function () {
                            controller.showAlert('Courriel Envoyé!', 'Un courriel avec un lien de réinitialisation de mot de passe vous a été envoyé.');
                        }).catch(function () {
                            controller.showAlert('Erreur!', 'Adresse courriel invalide.');
                        });
                    }
                    else {
                        this.currentView = "password";
                        __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput").css('border-bottom', '2px solid black');
                        this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordTitle"), "-100vw", "0px");
                        this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#title"), "-100vw", "10vh");
                        this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput"), "-100vw", "0px");
                        this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput"), "-100vw", "14vh");
                        //Check if user is already registered
                        if (this.alreadyExists()) {
                            this.userExists = true;
                            var passTitle = (this.userExists) ? 'Ravi de vous revoir, entrez votre mot de passe' : 'Créez votre mot de passe';
                            __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordTitle").children().eq(0).text(passTitle);
                        }
                    }
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput").css('border-bottom', '2px solid red');
                }
                break;
            //Go to enter your password confirmation view
            case "password":
                if (this.disconnected) {
                    this.showAlert('Pas de connexion internet', 'Vérifiez votre connexion internet.');
                    break;
                }
                var password = __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput").children().eq(0).val();
                this.password = password;
                //If user is already registered, login user
                if (password.length >= 6 && this.userExists) {
                    this.loginUser();
                    break;
                }
                if (password.length >= 6) {
                    this.currentView = "passwordConfirmation";
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordConfirmationInput").css('border-bottom', '2px solid black');
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordConfirmationTitle"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordTitle"), "-200vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordConfirmationInput"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput"), "-200vw", "0px");
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput").css('border-bottom', '2px solid red');
                }
                break;
            //Go to enter your name view
            case "passwordConfirmation":
                if (this.disconnected) {
                    this.showAlert('Pas de connexion internet', 'Vérifiez votre connexion internet.');
                    break;
                }
                var passwordConfirmation = __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordConfirmationInput").children().eq(0).val();
                this.passwordConfirmation = passwordConfirmation;
                if (this.passwordConfirmation == this.password) {
                    this.currentView = "name";
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#firstName").css('border-bottom', '2px solid black');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#lastName").css('border-bottom', '2px solid #F2F2F2');
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameTitle"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordConfirmationTitle"), "-200vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameInput"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordConfirmationInput"), "-200vw", "0px");
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordConfirmationInput").css('border-bottom', '2px solid red');
                }
                break;
            //Go to enter select payment method
            case "name":
                if (this.disconnected) {
                    this.showAlert('Pas de connexion internet', 'Vérifiez votre connexion internet.');
                    break;
                }
                var firstName = __WEBPACK_IMPORTED_MODULE_3_jquery__("#firstName").children().eq(0).val();
                var lastName = __WEBPACK_IMPORTED_MODULE_3_jquery__("#lastName").children().eq(0).val();
                this.firstName = firstName;
                this.lastName = lastName;
                if (firstName.length > 0 && lastName.length > 0) {
                    this.currentView = "paymentMethod";
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#nextBtn").hide();
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#firstName").children().eq(0).blur();
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#lastName").children().eq(0).blur();
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#paymentTitle"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameTitle"), "-200vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#paymentList"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameInput"), "-200vw", "0px");
                }
                else {
                    if (lastName.length == 0) {
                        __WEBPACK_IMPORTED_MODULE_3_jquery__("#lastName").css('border-bottom', '2px solid red');
                    }
                    if (firstName.length == 0) {
                        __WEBPACK_IMPORTED_MODULE_3_jquery__("#firstName").css('border-bottom', '2px solid red');
                    }
                }
                break;
            //Go to credit card form
            case "paymentMethod":
                if (this.disconnected) {
                    this.showAlert('Pas de connexion internet', 'Vérifiez votre connexion internet.');
                    break;
                }
                this.currentView = "creditCardForm";
                this.keyboard.disableScroll(false);
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#cardName").css('border-bottom', '2px solid black');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#cardNumber").css('border-bottom', '2px solid #F2F2F2');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#expirationDate").css('border-bottom', '2px solid #F2F2F2');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#cvv").css('border-bottom', '2px solid #F2F2F2');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#country").css('border-bottom', '2px solid #F2F2F2');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#phoneNumber").css('border-bottom', '2px solid #F2F2F2');
                this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#creditCardTitle"), "-100vw", "0px");
                this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#paymentTitle"), "-200vw", "0px");
                this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#creditCartInputs"), "-100vw", "0px");
                this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#paymentList"), "-200vw", "0px");
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
    selectCreditCard() {
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
        var cardName = __WEBPACK_IMPORTED_MODULE_3_jquery__("#cardName").children().eq(1).val().toString();
        var cardNumber = __WEBPACK_IMPORTED_MODULE_3_jquery__("#cardNumber").children().eq(1).val().toString();
        var month = parseInt(__WEBPACK_IMPORTED_MODULE_3_jquery__("#expirationDate").children().eq(0).val().substring(0, 2));
        var year = parseInt('20' + __WEBPACK_IMPORTED_MODULE_3_jquery__("#expirationDate").children().eq(0).val().substring(3, 5));
        var cvc = __WEBPACK_IMPORTED_MODULE_3_jquery__("#cvv").children().eq(0).val().toString();
        if (cardName.length == 0 || __WEBPACK_IMPORTED_MODULE_3_jquery__("#input").val().length != 14 || cardNumber.length != 16 || month.toString().length != 2 || year.toString().length != 2 || cvc.length != 3) {
        }
        var cardinfo = {
            number: cardNumber,
            expMonth: month,
            expYear: year,
            cvc: cvc
        };
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
        var users = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('Users/');
        var firstName = this.firstName;
        var lastName = this.lastName;
        var customerId = this.customerId;
        var email = this.email;
        var value = __WEBPACK_IMPORTED_MODULE_3_jquery__("#input").val();
        var phoneNumberString = "+1" + value.substring(1, 4) + value.substring(6, 9) + value.substring(10, 14);
        let loginController = this;
        __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().createUserWithEmailAndPassword(this.email, this.password).then(function (data) {
            loginController.loginUser();
            var userId = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser.uid;
            //Create user instance in db
            users.child(userId).set({
                UserId: userId,
                Date: Date(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumberString,
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
        __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().signInWithEmailAndPassword(this.email, this.password).then(function (data) {
            if (controller.isLoggedIn())
                controller.gotohome();
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
    logoutUser() {
        return __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().signOut();
    }
    /*****************************************************************************
    Function: isLoggedIn
    Purpose: Tells if there is a user logged in
    Parameters: None
    Return: True or False
    *****************************************************************************/
    isLoggedIn() {
        var user = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser;
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
        __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('Users/')
            .on('value', function (snapshot) {
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
        __WEBPACK_IMPORTED_MODULE_3_jquery__(obj).css('-webkit-transform', 'translate(' + dx + ',' + dy + ')');
        __WEBPACK_IMPORTED_MODULE_3_jquery__(obj).css('transition-timing-function', 'cubic-bezier(.1,.1,.1,1)');
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
        }
        else {
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
            alert(error);
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
        var headers = new __WEBPACK_IMPORTED_MODULE_8__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let controller = this;
        this.http.post('http://192.168.27.1:3333/createUser', data, { headers: headers }).subscribe((res) => {
            if (typeof (res) != "undefined") {
                __WEBPACK_IMPORTED_MODULE_3_jquery__["each"](res, function (key, valueObj) {
                    if (key == "_body") {
                        controller.customerId = valueObj;
                        controller.createUser();
                    }
                });
            }
            else {
                this.showAlert('Inscription Impossible !', 'Carte de crédit invalide.');
                console.log('Unable to save customer infos!!');
            }
        });
    }
    onFocus(parentId) {
        __WEBPACK_IMPORTED_MODULE_3_jquery__("#" + parentId).css('border-bottom', '2px solid black');
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('document:keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], PhoneNumberPage.prototype, "handleKeyboardEvent", null);
PhoneNumberPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-phone-number',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\phone-number\phone-number.html"*/'<!--\n\n  Generated template for the Phone Number auth page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<div no-bounce ion-fixed class="content" style="margin:0; padding:0">\n\n  <!-- Header image -->\n\n  <ion-row id="headerImg" class="header-img">\n\n\n\n    <img src="assets/img/bg23.jpg" class="img"/>\n\n\n\n  </ion-row>\n\n\n\n  <!--body of page !-->\n\n  <ion-row id="main" class="main">\n\n    <!-- Title -->\n\n    <ion-row style="display: none" class="backbtn hidden" id="backBtn">\n\n      <ion-icon (click)="goBack()" style="font-size: 12vw; color: black;padding:0;margin:0" name="ios-arrow-round-back"></ion-icon>\n\n    </ion-row>\n\n\n\n    <!-- Title -->\n\n    <ion-row class="title" id="title">\n\n      <div>Coiffez vous avec Barber Me</div>\n\n    </ion-row>\n\n\n\n    <!-- Input for phone number -->\n\n    <ion-row id="emailInput" class="email">\n\n       <ion-icon ios="ios-mail" style="font-size: 7vw; color: gray; margin: auto; padding: auto; margin-left: 0; padding-left: 0; margin-right: 0; padding-right: 0;" md="md-mail"></ion-icon>\n\n      <input id="email" (focus)="enterYourEmail()" class="input" [(ngModel)]="email" type="email" placeholder="Entrez votre adresse courriel">\n\n    </ion-row>\n\n\n\n    <!-- Enter your password -->\n\n    <ion-row class="digitTitle" id="passwordTitle">\n\n      <div>Créez votre mot de passe</div>\n\n    </ion-row>\n\n\n\n    <!-- Input for password -->\n\n    <ion-row id="passwordInput" class="inputBloc">\n\n      <input class="input" type="password" placeholder="6 caractères minimum">\n\n    </ion-row>\n\n\n\n    <!-- Enter your password confirmation -->\n\n    <ion-row class="digitTitle" id="passwordConfirmationTitle">\n\n      <div>Confirmez votre mot de passe</div>\n\n    </ion-row>\n\n\n\n    <!-- Input for password confirmation -->\n\n    <ion-row id="passwordConfirmationInput" class="inputBloc">\n\n      <input class="input" type="password" placeholder="6 caractères minimum">\n\n    </ion-row>\n\n\n\n    <!-- Enter your name -->\n\n    <ion-row class="digitTitle" id="nameTitle">\n\n      <div>Comment vous appelez-vous ?</div>\n\n    </ion-row>\n\n\n\n    <!-- Input for name -->\n\n    <ion-row id="nameInput" class="inputBloc">\n\n      <ion-grid style="margin:0; padding:0">\n\n        <ion-row style="margin:0; padding:0">\n\n          <ion-col id="firstName" col-5 style="margin-left:0px">\n\n            <input class="nameInput" type="text" placeholder="Prénom">\n\n          </ion-col>\n\n\n\n          <ion-col id="lastName" col-5 style="margin-left:10px">\n\n            <input (focus)="onFocus(\'lastName\')" class="nameInput" type="text" placeholder="Nom">\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-row>\n\n\n\n    <!-- Select your payment method -->\n\n    <ion-row class="digitTitle" id="paymentTitle">\n\n      <div>Sélectionnez votre moyen de paiement préféré</div>\n\n    </ion-row>\n\n\n\n    <!-- List of payment methods -->\n\n    <ion-list (click)="selectCreditCard()" id="paymentList" class="digitBloc" style="padding:0; margin-top: 50px">\n\n      <ion-item (click)="selectCreditCard()" style="padding:0">\n\n        <ion-icon name="card" style="margin-left:7vw; margin-right:5vw"></ion-icon>\n\n          Carte de crédit\n\n        <ion-icon name="arrow-forward" style="position:absolute; right:5vw"></ion-icon>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <!-- Enter your credit card -->\n\n    <ion-row class="digitTitle" id="creditCardTitle" style="top: 10%">\n\n      <div>Ajouter la carte</div>\n\n    </ion-row>\n\n\n\n    <!-- Inputs for credit card -->\n\n    <ion-row id="creditCartInputs" class="digitBloc" style="top: 4%; padding-right: 3vw">\n\n      <!-- Credit card name -->\n\n      <!--ion-row><ion-label color="#F2F2F2" stacked></ion-label></ion-row!-->\n\n      <ion-row id="cardName" style="padding:auto; margin:auto; margin-left:0; width:95%; margin-top:50px">\n\n        <ion-icon style="font-size:7vw; margin-right: 10px" name="contact"></ion-icon>\n\n        <input class="input" type="text" style="width:85%" placeholder="Nom sur la carte">\n\n      </ion-row>\n\n\n\n      <!-- Credit card number -->\n\n      <ion-row id="cardNumber" style="padding:auto; margin:auto; margin-left:0; width:95%; margin-top: 50px">\n\n        <ion-icon name="card" style="font-size:7vw; margin-right: 10px"></ion-icon>\n\n        <input maxlength="16" class="input" type="tel" style="width:85%" placeholder="Numéro de carte">\n\n      </ion-row>\n\n\n\n      <!-- Exp date / CVV -->\n\n      <ion-grid style="margin:0; margin-top:50px; padding:0">\n\n        <ion-row style="margin:0; padding:0">\n\n          <ion-col id="expirationDate" col-6 style="margin-left:0px; padding-left:0">\n\n            <input maxlength="5" class="nameInput" style="width:100%" type="text" placeholder="Date d\'exp.">\n\n          </ion-col>\n\n\n\n          <ion-col id="cvv" col-5 style="margin-left:10px">\n\n            <input maxlength="3" class="nameInput" style="width:100%" type="text" placeholder="CVV">\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n\n\n      <!-- country -->\n\n      <ion-label color="#F2F2F2" style="width: 100vw; margin-top: 40px" stacked>Pays</ion-label>\n\n      <ion-row id="country" style="padding:0; margin:0; margin-right: 5vw; width: 100vw">\n\n        <span class="flag-icon flag-icon-ca" style="font-size: 5vw; margin-right:2vw;"></span>\n\n        <div style="font-size: 5vw; font-family: Verdana, Geneva, sans-serif; margin: auto; padding: auto; width: 55vw">Canada</div>\n\n        <ion-icon name="md-arrow-dropdown" style="font-size:8vw; color: gray; margin: auto; padding: auto"></ion-icon>\n\n      </ion-row>\n\n\n\n      <!-- Postal Code -->\n\n      <ion-row id="phoneNumber" style="padding:auto; margin:auto; margin-left:0; margin-top:50px;">\n\n        <input id="input" maxlength="14" class="input" style="width:80vw; padding-left:0; margin-left:0; padding-bottom: 5px" type="tel" placeholder="Numéro de téléphone">\n\n      </ion-row>\n\n\n\n      <!--sign out button-->\n\n      <ion-row id="continueBtn" style="width: 100vw; padding:auto; margin:auto; margin-left:0; margin-top:10px;">\n\n        <button ion-button class="round" color="black" full (click)="createNewUser()" style="margin-top: 5vh; background-color: black">CONTINUER</button>\n\n      </ion-row>\n\n\n\n    </ion-row>\n\n\n\n  </ion-row>\n\n\n\n  <!-- Link to login page -->\n\n  <ion-row class="footer" id="link">\n\n    <span (click)="enterYourEmail(\'reset password\')" ion-text color="black" style="margin-top: auto; margin-bottom: auto;">Mot de passe oublié?</span>\n\n  </ion-row>\n\n\n\n  <button id="nextBtn" (click)="goToNext()" ion-button class="btn-circle btn-xl hidden"><ion-icon name="ios-arrow-round-forward" class="nextIcon"></ion-icon></button>\n\n\n\n</div>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\phone-number\phone-number.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_stripe__["a" /* Stripe */], __WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__["a" /* Network */]])
], PhoneNumberPage);

//# sourceMappingURL=phone-number.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateSelectorDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GetAnAppointmentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GetAnAppointmentModel__ = __webpack_require__(857);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





const NUM_OF_DAYS = 7;
const NUM_OF_MONTHS = 1;
const FORMAT = 'DD-MMM-YYYY';
// Low level primitives to manipulate the css classes of the date elements displayed in the calendar view
let DateSelectorDirective = class DateSelectorDirective {
    constructor(elemRef, renderer) {
        this.elemRef = elemRef;
        this.renderer = renderer;
    }
    getId() {
        return this.id;
    }
    setInRange(rangeType) {
        let rangeClass = 'in-range-' + rangeType;
        this.renderer.setElementClass(this.elemRef.nativeElement.parentElement, rangeClass, true);
    }
    setToday() {
        this.renderer.setElementClass(this.elemRef.nativeElement, 'today', true);
    }
    setSelected() {
        this.renderer.setElementClass(this.elemRef.nativeElement, 'selected', true);
    }
    unsetSelected() {
        this.renderer.setElementClass(this.elemRef.nativeElement, 'selected', false);
    }
    setDisabled() {
        this.renderer.setElementClass(this.elemRef.nativeElement.parentElement, 'in-range-full', false);
        this.renderer.setElementClass(this.elemRef.nativeElement.parentElement, 'in-range-left', false);
        this.renderer.setElementClass(this.elemRef.nativeElement.parentElement, 'in-range-right', false);
        this.renderer.setElementProperty(this.elemRef.nativeElement, 'disabled', true);
    }
    setEnabled() {
        this.renderer.setElementClass(this.elemRef.nativeElement.parentElement, 'in-range-full', false);
        this.renderer.setElementClass(this.elemRef.nativeElement.parentElement, 'in-range-left', false);
        this.renderer.setElementClass(this.elemRef.nativeElement.parentElement, 'in-range-right', false);
        this.renderer.setElementProperty(this.elemRef.nativeElement, 'disabled', false);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('datespan'),
    __metadata("design:type", String)
], DateSelectorDirective.prototype, "id", void 0);
DateSelectorDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({ selector: '[datespan]' }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Renderer */]])
], DateSelectorDirective);

/***************************************************************************************************
THE SECTION ABOVE IS AN IMPORTED LIBRARY
***************************************************************************************************/
let GetAnAppointmentPage = class GetAnAppointmentPage {
    constructor(alertCtrl) {
        this.alertCtrl = alertCtrl;
        this.months = [];
        this.currentHour = "10";
        this.currentMinutes = "00";
        this.conflictMessageClasses = { 'conflictMessageOn': false, 'conflictMessageOff': true };
        // A Map where key = 'DD-MMM-YYYY' and Value as the ViewChild Reference of the date element displayed in the
        // calendar view
        this.dateDirectivesMap = new Map();
        this.appointments = new __WEBPACK_IMPORTED_MODULE_2__GetAnAppointmentModel__["a" /* GetAnAppointmentModel */]();
        this.weekNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
        this.today = __WEBPACK_IMPORTED_MODULE_1_moment___default()();
        this.currentDate = this.today.clone();
        this.setDefaultHour();
        this.updateDataSnapshot();
        this.openingHour = this.appointments.getBusinessHours(this.currentDate).Opening + "h";
        this.closingHour = this.appointments.getBusinessHours(this.currentDate).Closure + "h";
    }
    /*****************************************************************************
    Function: increaseHour
    Purpose: Increment within the restriction the hour value
    Parameters: None
    Return: None
    *****************************************************************************/
    increaseHour() {
        var closingHour = parseFloat(this.appointments.getBusinessHours(this.currentDate).Closure);
        if (closingHour > (parseFloat(this.currentHour) + 1)) {
            this.currentHour = parseInt(this.currentHour) + 1;
            this.verifyAvailibility(); //check if hour is available
        }
        else {
            //To be completed : Display Heure de fermeture
            this.displayConflictMessage("Heures d'ouverture : " + this.openingHour + " - " + this.closingHour);
        }
    }
    /*****************************************************************************
    Function: decreaseHour
    Purpose: Decrement within the restriction the hour value
    Parameters: None
    Return: None
    *****************************************************************************/
    decreaseHour() {
        var openingHour = parseFloat(this.appointments.getBusinessHours(this.currentDate).Opening);
        if (openingHour <= (parseFloat(this.currentHour) - 1)) {
            this.currentHour = parseInt(this.currentHour) - 1;
            this.verifyAvailibility(); //check if hour is available
        }
        else {
            //To be completed : Display Heure de fermeture
            this.displayConflictMessage("Heures d'ouverture : " + this.openingHour + " - " + this.closingHour);
        }
    }
    /*****************************************************************************
    Function: changeMinutes
    Purpose: Change the minutes value by interval of 30 minutes
    Parameters: None
    Return: None
    *****************************************************************************/
    changeMinutes() {
        this.currentMinutes = (this.currentMinutes == '00') ? '30' : '00';
        this.verifyAvailibility();
    }
    /*****************************************************************************
    Function: displayConflictMessage
    Purpose: Display conflict message to user when the day and hour selected
             are not available
    Parameters: errorMessage: The message to be displayed
    Return: None
    *****************************************************************************/
    displayConflictMessage(errorMessage) {
        this.errorMessage = errorMessage;
        this.conflictMessageClasses = { 'conflictMessageOn': true, 'conflictMessageOff': false };
    }
    /*****************************************************************************
    Function: verifyAvailibility
    Purpose: Check if the day and hour selected is available. If No, trigger
             error message
    Parameters: None
    Return: None
    *****************************************************************************/
    verifyAvailibility() {
        this.conflictMessageClasses = { 'conflictMessageOn': false, 'conflictMessageOff': true };
        var hour = this.currentHour + " : " + this.currentMinutes;
        if (!this.appointments.isAvailable(this.currentDate.format(FORMAT), hour))
            this.displayConflictMessage("Cette plage horaire n'est plus disponible.");
    }
    /*****************************************************************************
    Function: setDefaultHour
    Purpose: Set the hour to the Opening hour of the actual day
    Parameters: None
    Return: None
    *****************************************************************************/
    setDefaultHour() {
        var hour = this.appointments.getBusinessHours(this.currentDate).Opening;
        this.currentHour = hour.toString().substring(0, 2);
        this.currentMinutes = (this.currentHour.toString().length > 2) ? "30" : "00";
    }
    /*****************************************************************************
    Function: updateDataSnapshot
    Purpose: Listen to the firebase db and triggers controller methods when data
             changed in firebase db
    Parameters: None
    Return: None
    *****************************************************************************/
    updateDataSnapshot() {
        let controller = this;
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('Appointments/')
            .on('value', function (snapshot) {
            controller.verifyAvailibility();
            controller.appointments.getDaysBooked();
        });
    }
    /*****************************************************************************
    Function: getAppointment
    Purpose: Save the current aay and hour in database. If conflict, display error
             message
    Parameters: None
    Return: None
    *****************************************************************************/
    getAppointment() {
        var date = this.currentDate.format(FORMAT);
        var hour = this.currentHour + " : " + this.currentMinutes;
        (this.appointments.isAvailable(date, hour)) ? this.displayAppointmentConfirmation(date, hour) : this.showAlert('Réservation impossible !', 'Veuillez choisir une autre plage horaire.');
        this.disableBookedDays();
    }
    /*****************************************************************************
    Function: displayAppointmentConfirmation
    Purpose: Prompt alert to confirm user reservation
    Parameters: None
    Return: None
    *****************************************************************************/
    displayAppointmentConfirmation(date, hour) {
        let alert = this.alertCtrl.create({
            title: 'Confirmez votre réservation',
            subTitle: 'En cliquant sur Confirmer, je confirme avoir lu et accepté les Termes et Conditions et la Politique de Confidentialité de Barber Me.',
            buttons: [{
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirmer',
                    handler: () => {
                        this.appointments.createNew(date, hour);
                        this.showAlert('Confirmation', 'Votre réservation est confirmée pour le ' + date + ' à ' + hour);
                    }
                }]
        });
        alert.present();
    }
    /*****************************************************************************
    Function: showAlert
    Purpose: Display a pop-up alert to notify user on reservation conflict
    Parameters: None
    Return: None
    *****************************************************************************/
    showAlert(title, subTitle) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    }
    // Disable date in parameter
    disableDate(date) {
        //Date format = "DD-MMM-YYYY"
        let dayBooked = this.dateSelectors.find(item => item.id === date);
        if (typeof dayBooked != "undefined")
            dayBooked.setDisabled();
    }
    // Enable date in parameter
    enableDate(date) {
        //Date format = "DD-MMM-YYYY"
        let dayBooked = this.dateSelectors.find(item => item.id === date);
        if (typeof dayBooked != "undefined")
            dayBooked.setEnabled();
    }
    //Change date format to MMM, DD, YYYY
    changeDateFormat(date) {
        var day = date.substring(0, 2);
        var month = date.substring(3, 6);
        var year = date.substring(7, 11);
        return month + ", " + day + ", " + year;
    }
    //Disable all dates that are full booked
    disableBookedDays() {
        var daysBooked = this.appointments.getDaysBooked();
        for (var i = 0; i < daysBooked.length; i++) {
            this.disableDate(daysBooked[i]);
        }
    }
    //Disable days when the barber shop is closed
    /*disableClosingDays() {
      //Get days that barber shop is closed
      var daysClosed = [];
      for (var i = 0; i < this.appointments.businessHours.length; i++) {
        if (this.appointments.businessHours[i].Opening == null && this.appointments.businessHours[i].Closure == null)
        {
          var j = i + 1;
          if (j == 7) j = 0;
          daysClosed.push(j);
        }
      }
  
      //Disable those days
      for (var i = 0; i < this.appointments.dataSnapshot.length; i++) {
        var day = new Date(this.changeDateFormat(this.appointments.dataSnapshot[i].Date)).getDay();
        if (daysClosed.indexOf(day) != -1) this.disableDate(this.appointments.dataSnapshot[i].Date);
      }
    }*/
    // Programmatically set the CSS Classes on the dates displayed in the Calendar View
    getSelectorKey(day) {
        return day.format(FORMAT);
    }
    // Programmatically set the CSS Classes on the dates displayed in the Calendar View
    selectDate(selectedDate) {
        let selectorKey = this.getSelectorKey(selectedDate);
        this.dateDirectivesMap.get(selectorKey).setSelected();
    }
    // Programmatically set the CSS Classes on the dates displayed in the Calendar View
    selectToday(selectedDate) {
        let selectorKey = this.getSelectorKey(selectedDate);
        this.dateDirectivesMap.get(selectorKey).setToday();
    }
    // Programmatically set the CSS Classes on the dates displayed in the Calendar View
    clearSelectedDate(selectedDate) {
        if (selectedDate) {
            let selectorKey = this.getSelectorKey(selectedDate);
            this.dateDirectivesMap.get(selectorKey).unsetSelected();
        }
    }
    select(monthObj, selectedDate, rowIndex) {
        let day = __WEBPACK_IMPORTED_MODULE_1_moment___default()(selectedDate.id, FORMAT);
        this.clearSelectedDate(this.currentDate);
        this.currentDate = day;
        this.selectDate(day);
        this.openingHour = this.appointments.getBusinessHours(this.currentDate).Opening + "h";
        this.closingHour = this.appointments.getBusinessHours(this.currentDate).Closure + "h";
        this.verifyAvailibility();
    }
    setTimeToZero(dateLocal) {
        return dateLocal.day(0).hour(0).minute(0).second(0).millisecond(0);
    }
    createWeek(forDateObj, buildMonth) {
        let weekDays = [], count = 0;
        while (count < NUM_OF_DAYS) {
            if (forDateObj.month() === buildMonth) {
                let dateObj = {
                    displayText: forDateObj.date(),
                    id: forDateObj.format(FORMAT)
                };
                weekDays.push(dateObj);
            }
            else {
                weekDays.push('');
            }
            forDateObj = forDateObj.clone();
            forDateObj.add(1, 'd');
            count++;
        }
        return weekDays;
    }
    createMonth(monthObj, forMonthObj) {
        monthObj.weeks = [];
        let month = forMonthObj.clone(), done = true;
        while (done) {
            monthObj.weeks.push({ days: this.createWeek(month.clone(), monthObj.selectedMonth.month()) });
            month.add(1, 'w');
            if (month.month() !== monthObj.selectedMonth.month()) {
                done = false;
            }
        }
    }
    initMonth(monthObj) {
        let startMonth = monthObj.selectedMonth.clone();
        startMonth.date(1);
        this.setTimeToZero(startMonth.day(0));
        this.createMonth(monthObj, startMonth);
    }
    init(month) {
        let monthObj = {};
        monthObj['selectedMonth'] = month;
        this.initMonth(monthObj);
        this.months.push(monthObj);
    }
    // Populate the DateDirectivesMap with the ViewChildren of each date
    // displayed in the Calendar View
    populateSelectorMap(dateSelector) {
        let selectorId = dateSelector.getId();
        this.dateDirectivesMap.set(selectorId, dateSelector);
    }
    // Iterate through each date displayed in the View
    // and populate the ViewChildren in the dateDirectivesMap
    initSelectorMap() {
        this.dateSelectors.forEach((dateSelector) => {
            let selectorId = dateSelector.getId();
            let directiveDate = __WEBPACK_IMPORTED_MODULE_1_moment___default()(selectorId, FORMAT);
            //Programmatically set the CSS Class to disable and enable the dates
            //Mario perfect cut is not opened on mondays =  || directiveDate.weekday() == 1
            if (directiveDate.isBefore(this.today, 'day') || directiveDate.weekday() == 1) {
                dateSelector.setDisabled();
            }
            else {
                dateSelector.setEnabled();
            }
            this.populateSelectorMap(dateSelector);
        });
    }
    // Hook up into the life cycle method when the component is initialized.
    ngOnInit() {
        let nextMonth = __WEBPACK_IMPORTED_MODULE_1_moment___default()();
        for (let index = 0; index <= NUM_OF_MONTHS; index++) {
            this.init(nextMonth);
            nextMonth = nextMonth.clone().month(nextMonth.month() + 1);
        }
        this.selectedDate = __WEBPACK_IMPORTED_MODULE_1_moment___default()();
    }
    //Hook up into the life cycle method after View is Initialized
    //Programmatically Set the CSS classes to optimize the performance
    ngAfterViewInit() {
        this.initSelectorMap();
        //this.selectDate(this.currentDate);
        //this.selectToday(this.today);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChildren */])(DateSelectorDirective),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* QueryList */])
], GetAnAppointmentPage.prototype, "dateSelectors", void 0);
GetAnAppointmentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'getanappointment',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\getanappointment\getanappointment.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>Prendre rendez-vous</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content class="light-bg">\n\n  <div class="getanappointment">\n\n    <div style="height:auto" class="cal-bg header-row">\n\n      <ion-row class="text-center input-row">\n\n        <ion-col width-100>\n\n          <div class="check-text">Choisissez le jour</div>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row class="text-center week-row">\n\n        <ion-col *ngFor="let weekName of weekNames" style="margin:0;padding:0">\n\n          <span>{{weekName}}</span>\n\n        </ion-col>\n\n      </ion-row>\n\n    </div>\n\n\n\n    <!-- ion-content contains the calendar months displayed in the view -->\n\n    <div style="height:100%; overflow-y: scroll; margin-left:0" class="month-list">\n\n      <ion-item *ngFor="let monthObj of months">\n\n        <ion-row class="month-row" >\n\n          <ion-col width-60 class="text-center">\n\n            {{monthObj.selectedMonth.format("MMM YYYY")}}\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n        <div class="day-grid">\n\n          <ion-row class="text-center day-row" *ngFor="let week of monthObj.weeks; let rowIndex = index" >\n\n            <ion-col class="day-col" *ngFor="let day of week.days; let colIndex = index">\n\n\n\n                <button ion-button  *ngIf="day"  clear [datespan]="day.id" (click)="select(monthObj,day,rowIndex)">\n\n                  {{day.displayText}}\n\n                </button>\n\n\n\n            </ion-col>\n\n          </ion-row>\n\n        </div>\n\n      </ion-item>\n\n    </div>\n\n  </div>\n\n\n\n  <ion-row style="position: relative; margin-top:27.5%">\n\n    <ion-col col-3></ion-col>\n\n    <ion-col col-2>\n\n      <ion-row style="padding: 5px; cursor: pointer" (click)="increaseHour()">\n\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-up"></ion-icon>\n\n      </ion-row>\n\n      <ion-row>\n\n        <p style="padding: 5px; font-size: 20px; margin: auto">{{currentHour}}</p>\n\n      </ion-row>\n\n      <ion-row style="padding: 5px; cursor: pointer" (click)="decreaseHour()">\n\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-down"></ion-icon>\n\n      </ion-row>\n\n    </ion-col>\n\n\n\n    <ion-col col-2>\n\n      <ion-row style="padding: 5px; cursor: pointer">\n\n        <ion-icon color="bg-color" style="font-size: 25px; margin: auto" name="ios-arrow-up"></ion-icon>\n\n      </ion-row>\n\n      <ion-row>\n\n        <p style="padding: 5px; font-size: 20px; margin: auto">:</p>\n\n      </ion-row>\n\n      <ion-row style="padding: 5px; cursor: pointer">\n\n        <ion-icon color="bg-color" style="font-size: 25px; margin: auto" name="ios-arrow-down"></ion-icon>\n\n      </ion-row>\n\n    </ion-col>\n\n\n\n    <ion-col col-2>\n\n      <ion-row style="padding: 5px; cursor: pointer" (click)="changeMinutes()">\n\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-up"></ion-icon>\n\n      </ion-row>\n\n      <ion-row>\n\n        <p style="padding: 5px; font-size: 20px; margin: auto">{{currentMinutes}}</p>\n\n      </ion-row>\n\n      <ion-row style="padding: 5px; cursor: pointer" (click)="changeMinutes()">\n\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-down"></ion-icon>\n\n      </ion-row>\n\n    </ion-col>\n\n    <ion-col col-3></ion-col>\n\n  </ion-row>\n\n\n\n  <ion-row>\n\n    <p [ngClass] = "conflictMessageClasses">{{errorMessage}}</p>\n\n  </ion-row>\n\n\n\n  <div style="padding-left: 10%; padding-right: 10%;margin-top:1.5%">\n\n    <button ion-button class="round" full color="primary" (click)="getAppointment()">Réserver</button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\getanappointment\getanappointment.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */]])
], GetAnAppointmentPage);

//# sourceMappingURL=getanappointment.js.map

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_gallery_service__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
let GalleryPage = class GalleryPage {
    constructor(galleryService) {
        this.galleryService = galleryService;
        this.pictures = galleryService.getAll();
    }
};
GalleryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-gallery',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\gallery\gallery.html"*/'<!--\n\n  Generated template for the Gallerie page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>Galerie photos</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n  <div padding margin-top>\n\n    <ion-badge class="square center"  color="primary">Voir plus de photo</ion-badge>\n\n    <div class="clear"></div>\n\n  </div>\n\n\n\n  <!--list of pictures-->\n\n  <ion-grid class="list-hotels">\n\n    <ion-row>\n\n      <ion-col *ngFor="let picture of pictures[0].viewMoreGalery" col-6>\n\n        <div class="hotel-bg" [ngStyle]="{\'background-image\': \'url(\' + picture + \')\'}">\n\n          <div class="bg-filter">\n\n\n\n\n\n          </div>\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\gallery\gallery.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_gallery_service__["a" /* GalleryService */]])
], GalleryPage);

//# sourceMappingURL=gallery.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Alert; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_index__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ticket_confirmation_ticket_confirmation__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__get_a_ticket_get_a_ticket__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let Alert = class Alert {
    /*****************************************************************************
    Class constructor
    *****************************************************************************/
    constructor(alertCtrl, app) {
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.nav = app.getActiveNav();
        this.ticketConfirmationPage = new __WEBPACK_IMPORTED_MODULE_2__ticket_confirmation_ticket_confirmation__["a" /* TicketConfirmationPage */]();
        this.ticket = new __WEBPACK_IMPORTED_MODULE_3__get_a_ticket_get_a_ticket__["a" /* GetaTicketPage */](this.nav);
    }
    /*****************************************************************************
    Function: presentAlert
    Description: This function display a warning on pop-up
    Parameters: None
    Return: None
    *****************************************************************************/
    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Confirmation de ticket',
            message: "Oui, j'accepte les Termes et Conditions de BarberMe",
            buttons: [
                {
                    text: 'Canceler',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                        this.ticket.startTransaction = false;
                    }
                },
                {
                    text: 'Confirmer',
                    handler: data => {
                        //this.nav.push(TicketConfirmationPage);
                        this.ticket.startTransaction = true;
                        this.ticket.makeTransaction();
                    }
                }
            ]
        });
        alert.present();
    }
    /*****************************************************************************
     Function: presentAlert
     Description: This function display a warning on pop-up
     Parameters: None
     Return: None
     *****************************************************************************/
    ticketExist() {
        let alert = this.alertCtrl.create({
            title: 'Tu a deja un ticket.',
            message: "Vous ne pouvez prendre plus d'un ticket.",
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        alert.present();
    }
};
Alert = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-alert',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\alert\alert.html"*/'<!DOCTYPE html>\n\n<html lang="en">\n\n<head>\n\n    <meta charset="UTF-8">\n\n    <title>Title</title>\n\n</head>\n\n<body>\n\n\n\n</body>\n\n</html>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\alert\alert.html"*/
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_index__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */]])
], Alert);

//# sourceMappingURL=alert.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarberLocation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_barber_service__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pricing_pricing__ = __webpack_require__(534);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
let BarberLocation = class BarberLocation {
    constructor(nav, barberService, platform) {
        this.nav = nav;
        this.barberService = barberService;
        this.platform = platform;
        // set sample data
        this.barber = barberService.getItem(1);
    }
    /*****************************************************************************
    Function: ionViewDidLoad
    Description: Triggers specific functions when page is loaded
    Parameters: None
    Return: None
    *****************************************************************************/
    ionViewDidLoad() {
        // init map
        this.initializeMap();
    }
    /*****************************************************************************
    Function: presentAlert
    Description: Set up the map view
    Parameters: None
    Return: None
    *****************************************************************************/
    initializeMap() {
        let latLng = new google.maps.LatLng(this.barber.location.lat, this.barber.location.lon);
        let mapOptions = {
            center: latLng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false
        };
        this.map = new google.maps.Map(document.getElementById("map-detail"), mapOptions);
        new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        // refresh map
        setTimeout(() => {
            google.maps.event.trigger(this.map, 'resize');
        }, 300);
    }
    /*****************************************************************************
    Function: presentAlert
    Description: Go to the pricing page
    Parameters: None
    Return: None
    *****************************************************************************/
    goToPricing() {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__pricing_pricing__["a" /* PricingPage */]);
    }
};
BarberLocation = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-barber-location',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\barber-location\barber-location.html"*/'<!--\n\n  Generated template for the ProfilePage page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>Contactez Mario Perfect Cut</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content class=" light-bg">\n\n\n\n  <!-- Show map here -->\n\n  <div style="height: 40vh;" id="map-detail"></div>\n\n\n\n\n\n\n\n\n\n  <!--services-->\n\n  <ion-grid style="height: 10vh;" class="border-bottom">\n\n    <ion-row>\n\n      <ion-col col-1 text-left>\n\n        <ion-icon style="padding-top: 16px" class="text-2x" name="pin"  color="dark"></ion-icon>\n\n      </ion-col>\n\n      <ion-col col-11 text-left>\n\n        <span class="service-name" style="font-size: 15px;font-weight: bold;padding-top: 22px" ion-text color="dark">1536 Boulevard Curé-Labelle #185</span>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <!--services-->\n\n  <ion-grid style="height: 10vh;" class="border-bottom">\n\n    <ion-row>\n\n      <ion-col col-1 text-left>\n\n        <ion-icon style="padding-top: 20px" class="text-2x" name="globe"  color="dark"></ion-icon>\n\n      </ion-col>\n\n      <ion-col col-11 text-left>\n\n        <a href="http://www.marioperfectcutbarbershop.com/" class="service-name" style="font-size: 15px;font-weight: bold;padding-top: 20px" ion-text color="dark">marioperfectcutbarbershop.com</a>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <!--services-->\n\n  <ion-grid  style="height: 10vh;" class="border-bottom">\n\n    <ion-row>\n\n      <ion-col col-1 text-left>\n\n        <ion-icon style="padding-top: 20px" class="text-2x" name="call"  color="dark"></ion-icon>\n\n      </ion-col>\n\n      <ion-col col-11 text-left>\n\n        <a href="tel:514-996-4730" class="service-name" style="font-size: 15px;font-weight: bold;padding-top: 22px" ion-text color="dark">514-996-4730</a>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <!--services-->\n\n  <ion-grid  style="height: 10vh;" class="border-bottom">\n\n    <ion-row>\n\n      <ion-col col-1 text-left>\n\n        <ion-icon style="padding-top: 20px" class="" name="mail"  color="dark"></ion-icon>\n\n      </ion-col>\n\n      <ion-col col-11 text-left>\n\n        <a href="mailto:marioperfectcutbarbershop@gmail.com" class="service-name" style="font-size: 15px;font-weight: bold;padding-top: 20px" ion-text color="dark">marioperfectcutbarbershop@gmail.com</a>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <!--services-->\n\n  <ion-grid  style="height: 10vh;" class="border-bottom">\n\n    <ion-row>\n\n      <ion-col col-1 text-left>\n\n        <ion-icon style="padding-top: 18px" class="text-2x" name="logo-instagram"  color="dark"></ion-icon>\n\n      </ion-col>\n\n      <ion-col col-11 text-left>\n\n        <a href="http://www.instagram.com/marioperfectcut" class="service-name" style="font-size: 15px;font-weight: bold;padding-top: 22px" ion-text color="dark">instagram.com/marioperfectcut</a>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <!--services-->\n\n  <ion-grid  style="height: 10vh;" class="border-bottom">\n\n    <ion-row>\n\n      <ion-col col-1 text-left>\n\n        <ion-icon style="padding-top: 18px" class="text-2x" name="logo-facebook"  color="dark"></ion-icon>\n\n      </ion-col>\n\n      <ion-col col-11 text-left>\n\n        <a href="http://www.facebook.com/MarioPerfectCutBarberShop" class="service-name" style="font-size: 15px;font-weight: bold;padding-top: 22px" ion-text color="dark">facebook.com/MarioPerfectCutBarberShop</a>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\barber-location\barber-location.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_barber_service__["a" /* BarberService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */]])
], BarberLocation);

//# sourceMappingURL=barber-location.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarberService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_barbers__ = __webpack_require__(885);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let BarberService = class BarberService {
    constructor() {
        this.barbers = __WEBPACK_IMPORTED_MODULE_1__mock_barbers__["a" /* BARBERS */];
    }
    getAll() {
        return this.barbers;
    }
    getItem(id) {
        for (var i = 0; i < this.barbers.length; i++) {
            if (this.barbers[i].id === parseInt(id)) {
                return this.barbers[i];
            }
        }
        return null;
    }
    remove(item) {
        this.barbers.splice(this.barbers.indexOf(item), 1);
    }
};
BarberService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], BarberService);

//# sourceMappingURL=barber-service.js.map

/***/ }),

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PricingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_gallery_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
let PricingPage = class PricingPage {
    constructor(nav, galleryService, toastCtrl) {
        this.nav = nav;
        this.galleryService = galleryService;
        this.toastCtrl = toastCtrl;
        // number of nights
        this.nights = 1;
        // number of guests
        this.guests = 2;
        // date from
        this.dateFrom = new Date();
        // date to
        this.dateTo = new Date();
        // set sample data
        this.picture = galleryService.getItem(1);
    }
    /*****************************************************************************
    Function: send
    Purpose: Quit the current page and display a toast message
    Parameters: None
    Return: None
    *****************************************************************************/
    send() {
        // show message
        let toast = this.toastCtrl.create({
            message: 'Booking sent',
            duration: 2000,
            position: 'middle'
        });
        toast.present();
        // back to home page
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    }
};
PricingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-pricing',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\pricing\pricing.html"*/'<!--\n\n  Generated template for the ProfilePage page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>Panier</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="pricing common-bg">\n\n  <div class="card round">\n\n    <div class="hotel-bg" [ngStyle]="{\'background-image\': \'url(\' + picture.thumb + \')\'}">\n\n      <div class="bg-filter" text-center>\n\n        <div>\n\n          <h5 ion-text color="light" no-margin>Mario Perfect Cut</h5>\n\n          <span ion-text color="light">{{ dateFrom | date: \'MMM dd, yyyy\'}} - {{ dateTo | date: \'MMM dd, yyyy\'}}</span>\n\n          <div margin-top>\n\n            <span ion-text color="light">1536 Bd Curé Labelle, Chomedey QC H7V 2W2</span>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="border-bottom" padding>\n\n      <h5 no-margin>Frais de reservation.</h5>\n\n      <span ion-text color="dark">5$</span>\n\n    </div>\n\n\n\n    <!--total price-->\n\n    <div padding>\n\n      <h4 class="pull-left" no-margin>Total</h4>\n\n      <h4 class="pull-right" ion-text color="primary" no-margin>25$</h4>\n\n      <div class="clear"></div>\n\n    </div>\n\n  </div>\n\n\n\n  <!--more info-->\n\n  <div class="card round" margin-top>\n\n    <ion-item class="no-border">\n\n      <ion-icon name="contact" item-left color="dark"></ion-icon>\n\n      <div>\n\n        <span class="bold" ion-text color="dark">KOUENI REPLACE THIS WITH CALENDAR</span>\n\n        <br/>\n\n        <span ion-text color="dark">Enter your information</span>\n\n      </div>\n\n    </ion-item>\n\n  </div>\n\n\n\n  <!--payment info-->\n\n  <div class="card round" margin-top>\n\n    <ion-item class="no-border">\n\n      <ion-icon name="ios-card" item-left color="dark"></ion-icon>\n\n      <div>\n\n        <span class="bold" ion-text color="dark">Mode de payment</span>\n\n        <br/>\n\n        <span ion-text color="dark">Carte de credit</span>\n\n      </div>\n\n    </ion-item>\n\n  </div>\n\n\n\n  <!--submit button-->\n\n  <button ion-button class="round" color="primary" margin-top full (click)="send()">COMPLETER</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\pricing\pricing.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_gallery_service__["a" /* GalleryService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */]])
], PricingPage);

//# sourceMappingURL=pricing.js.map

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(150);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
let SettingsPage = class SettingsPage {
    constructor(nav) {
        this.nav = nav;
    }
    /*****************************************************************************
    Function: logout
    Purpose: Pushes the login page
    Parameters: None
    Return: None
    *****************************************************************************/
    logout() {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    }
};
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\settings\settings.html"*/'<!--\n\n  Generated template for the Settings page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header class="no-shadow">\n\n\n\n  <ion-navbar class="no-border" color="primary">\n\n    <ion-title>PARAMÈTRES</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content class="common-bg">\n\n  <!--top information-->\n\n  <div class="top-info" padding>\n\n    <div padding-top>\n\n      <h5 ion-text color="white">John Doe</h5>\n\n      <span ion-text color="white">johndoe@mail.com</span>\n\n    </div>\n\n  </div>\n\n\n\n  <!--user settings-->\n\n    <ion-item-group style="margin-top: 10px">\n\n      <ion-item-divider color="bg-color">Notifications</ion-item-divider>\n\n      <ion-item>\n\n        <ion-label>Notification push</ion-label>\n\n        <ion-toggle color="primary" checked="true"></ion-toggle>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Notification par courriel</ion-label>\n\n        <ion-toggle color="primary" checked="true"></ion-toggle>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Notification par SMS</ion-label>\n\n        <ion-toggle color="primary" checked="true"></ion-toggle>\n\n      </ion-item>\n\n    </ion-item-group>\n\n\n\n\n\n    <ion-item-group style="margin-top: 10px">\n\n      <ion-item-divider color="bg-color">Informations légales</ion-item-divider>\n\n        <ion-list>\n\n          <button ion-item>Termes et conditions</button>\n\n        </ion-list>\n\n      <ion-item-divider color="bg-color"></ion-item-divider>\n\n    </ion-item-group>\n\n\n\n    <!--sign out button-->\n\n    <div style="padding-left: 10%; padding-right: 10%">\n\n      <button ion-button class="round" color="orange" full (click)="logout()">SE DECONNECTER</button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\settings\settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the CreateUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let CreateUserPage = class CreateUserPage {
    constructor(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.email = "";
        this.password = "";
        this.confirmationPassword = "";
    }
    /*****************************************************************************
    Function: presentAlert
    Description: Pushes home page
    Parameters: None
    Return: None
    *****************************************************************************/
    gotohome() {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    }
    /*****************************************************************************
    Function: presentAlert
    Description: Validate entries and create new user in firebase database.
    Also displays warning registration messages
    Parameters: None
    Return: None
    *****************************************************************************/
    createUser() {
        if (this.email.length == 0 || this.password.length == 0 || this.confirmationPassword.length == 0) {
            this.showAlert('Authentification Impossible !', 'Veuillez remplir tous les champs.');
        }
        else {
            if (this.password == this.confirmationPassword) {
                let loginController = this;
                __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().createUserWithEmailAndPassword(this.email, this.password).then(function (data) {
                    loginController.loginUser();
                }).catch(function (error) {
                    loginController.showAlert('Inscription Impossible !', error.toString().substring(7, error.toString().length));
                });
            }
            else {
                this.showAlert('Inscription Impossible !', 'Les 2 mots de passe inscrits sont différents. Veuillez inscrire le même mot de passe.');
            }
        }
    }
    /*****************************************************************************
    Function: presentAlert
    Description: Validate the entries with firebase db and logs the user in
    Parameters: None
    Return: None
    *****************************************************************************/
    loginUser() {
        this.logoutUser();
        let loginController = this;
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().signInWithEmailAndPassword(this.email, this.password).then(function (data) {
            if (loginController.isLoggedIn())
                loginController.gotohome();
        }).catch(function (error) {
            loginController.showAlert('Authentification Impossible !', error.toString().substring(7, error.toString().length));
        });
    }
    /*****************************************************************************
    Function: presentAlert
    Description: Log off the user if logged in
    Parameters: None
    Return: None
    *****************************************************************************/
    logoutUser() {
        return __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().signOut();
    }
    /*****************************************************************************
    Function: presentAlert
    Description: Go to the login page
    Parameters: None
    Return: None
    *****************************************************************************/
    gotoLoginPage() {
        this.navCtrl.pop();
    }
    /*****************************************************************************
    Function: presentAlert
    Description: Tells if there is a user logged in
    Parameters: None
    Return: True of False
    *****************************************************************************/
    isLoggedIn() {
        var user = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser;
        return (user != null && user != undefined) ? true : false;
    }
    /*****************************************************************************
    Function: presentAlert
    Description: Display a specific alert using Parameters
    Parameters: title: The pop-up title
                subTitle: The pop-up message
    Return: None
    *****************************************************************************/
    showAlert(title, subtitle) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    }
};
CreateUserPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-create-user',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\create-user\create-user.html"*/'<!--\n\n  Generated template for the Create User page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-content padding class="login common-bg auth-page">\n\n  <div class="login-content">\n\n\n\n    <!-- Logo -->\n\n    <div padding text-center>\n\n      <!--\n\n      <div class="logo activity-bg">\n\n        <ion-icon name="md-calendar" color="light"></ion-icon>\n\n      </div> -->\n\n      <h2 ion-text color="light">\n\n        Mario Perfect Cut\n\n      </h2>\n\n    </div>\n\n\n\n    <!-- Login form -->\n\n    <div class="list-form" padding>\n\n\n\n      <ion-item>\n\n        <ion-label stacked>Email</ion-label>\n\n        <ion-input [(ngModel)]="email" type="text" color="white"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label stacked>Password</ion-label>\n\n        <ion-input [(ngModel)]="password" type="password"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label stacked>Confirm Password</ion-label>\n\n        <ion-input [(ngModel)]="confirmationPassword" type="password"></ion-input>\n\n      </ion-item>\n\n\n\n    </div>\n\n\n\n    <br />\n\n    <div>\n\n      <button ion-button block color="primary" (click)="createUser()">\n\n        S\'INSCRIRE\n\n      </button>\n\n    </div>\n\n\n\n    <div text-center margin-top>\n\n      <span ion-text color="light" (click)="gotoLoginPage()">Déjà Inscrit? Connecte toi !</span>\n\n    </div>\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\create-user\create-user.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], CreateUserPage);

//# sourceMappingURL=create-user.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let ProgressBarComponent = class ProgressBarComponent {
    constructor() {
        this.progress = 100;
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('progress'),
    __metadata("design:type", Object)
], ProgressBarComponent.prototype, "progress", void 0);
ProgressBarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-progress-bar',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\progress-bar\progress-bar.html"*/'<div class="progress-outer">\n\n  <div class="progress-inner" [style.width]="progress + \'%\'">\n\n    {{progress}}%\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\progress-bar\progress-bar.html"*/
    }),
    __metadata("design:paramtypes", [])
], ProgressBarComponent);

//# sourceMappingURL=progress-bar.js.map

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(547);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_gallery_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_barber_service__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_pricing_pricing__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_barber_location_barber_location__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_get_a_ticket_get_a_ticket__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_ticket_confirmation_ticket_confirmation__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_create_user_create_user__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_phone_number_phone_number__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_gallery_gallery__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_settings_settings__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_progress_bar_progress_bar__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_getanappointment_getanappointment__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_alert_alert__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_keyboard__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_http__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_stripe__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_network__ = __webpack_require__(541);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
























// import services
// end import services
// end import services
// import pages
// end import pages
const components = [__WEBPACK_IMPORTED_MODULE_17__pages_getanappointment_getanappointment__["b" /* GetAnAppointmentPage */]];
const directives = [__WEBPACK_IMPORTED_MODULE_17__pages_getanappointment_getanappointment__["a" /* DateSelectorDirective */]];
const providers = [];
let AppModule = class AppModule {
    constructor() {
        __WEBPACK_IMPORTED_MODULE_19_firebase__["initializeApp"]({
            apiKey: "AIzaSyBShXmN6TIS7xy2Tnr65NkCJbAEXM51g7Q",
            authDomain: "mpc-app-37f6f.firebaseapp.com",
            databaseURL: "https://mpc-app-37f6f.firebaseio.com",
            projectId: "mpc-app-37f6f",
            storageBucket: "mpc-app-37f6f.appspot.com",
            messagingSenderId: "351355658098"
        });
    }
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_pricing_pricing__["a" /* PricingPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_get_a_ticket_get_a_ticket__["a" /* GetaTicketPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_ticket_confirmation_ticket_confirmation__["a" /* TicketConfirmationPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_gallery_gallery__["a" /* GalleryPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_settings_settings__["a" /* SettingsPage */],
            components,
            directives,
            __WEBPACK_IMPORTED_MODULE_8__pages_barber_location_barber_location__["a" /* BarberLocation */],
            __WEBPACK_IMPORTED_MODULE_18__pages_alert_alert__["a" /* Alert */],
            __WEBPACK_IMPORTED_MODULE_12__pages_create_user_create_user__["a" /* CreateUserPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_phone_number_phone_number__["a" /* PhoneNumberPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_progress_bar_progress_bar__["a" /* ProgressBarComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_21__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */], {
                scrollPadding: false,
                scrollAssist: false,
                autoFocusAssist: false
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_pricing_pricing__["a" /* PricingPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_get_a_ticket_get_a_ticket__["a" /* GetaTicketPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_ticket_confirmation_ticket_confirmation__["a" /* TicketConfirmationPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_gallery_gallery__["a" /* GalleryPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_barber_location_barber_location__["a" /* BarberLocation */],
            components,
            __WEBPACK_IMPORTED_MODULE_18__pages_alert_alert__["a" /* Alert */],
            __WEBPACK_IMPORTED_MODULE_12__pages_create_user_create_user__["a" /* CreateUserPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_phone_number_phone_number__["a" /* PhoneNumberPage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__services_gallery_service__["a" /* GalleryService */],
            __WEBPACK_IMPORTED_MODULE_5__services_barber_service__["a" /* BarberService */],
            __WEBPACK_IMPORTED_MODULE_10__pages_get_a_ticket_get_a_ticket__["a" /* GetaTicketPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_ticket_confirmation_ticket_confirmation__["a" /* TicketConfirmationPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_gallery_gallery__["a" /* GalleryPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_alert_alert__["a" /* Alert */],
            __WEBPACK_IMPORTED_MODULE_12__pages_create_user_create_user__["a" /* CreateUserPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_phone_number_phone_number__["a" /* PhoneNumberPage */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_stripe__["a" /* Stripe */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_network__["a" /* Network */],
            providers,
            __WEBPACK_IMPORTED_MODULE_16__pages_progress_bar_progress_bar__["a" /* ProgressBarComponent */]
            /* import services */
        ]
    }),
    __metadata("design:paramtypes", [])
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_phone_number_phone_number__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(151);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import pages
// end import pages
let MyApp = class MyApp {
    constructor(platform, keyboard) {
        this.platform = platform;
        this.keyboard = keyboard;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_phone_number_phone_number__["a" /* PhoneNumberPage */];
        // show splash screen
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Splashscreen */].show();
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* StatusBar */].styleDefault();
            this.keyboard.disableScroll(true);
        });
    }
    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
};
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\app\app.html"*/'<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\app\app.html"*/,
        queries: {
            nav: new __WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */]('content')
        }
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_gallery_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getanappointment_getanappointment__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gallery_gallery__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__get_a_ticket_get_a_ticket__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__barber_location_barber_location__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__settings_settings__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__progress_bar_progress_bar__ = __webpack_require__(537);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
let HomePage = class HomePage {
    constructor(nav, galleryService, progress) {
        this.nav = nav;
        this.galleryService = galleryService;
        this.progress = progress;
        this.numberClientWaitingTicketList = 0;
        this.numberClientWaitingReservation = 0;
        // set sample data
        this.pictures = galleryService.getAll();
        this.ClientWaiting();
        this.TotalReservation();
        this.DirectMessages();
    }
    /*****************************************************************************
    Function: getAnAppointment
    Purpose: Pushes Get an appointment page
    Parameters: None
    Return: None
    *****************************************************************************/
    getAnAppointment() {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__getanappointment_getanappointment__["b" /* GetAnAppointmentPage */]);
    }
    /*****************************************************************************
    Function: getTicket
    Purpose: Pushes Get a ticket page
    Parameters: None
    Return: None
    *****************************************************************************/
    getTicket() {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__get_a_ticket_get_a_ticket__["a" /* GetaTicketPage */]);
    }
    /*****************************************************************************
    Function: viewGallery
    Purpose: Pushes gallery page
    Parameters: None
    Return: None
    *****************************************************************************/
    viewGallery() {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__gallery_gallery__["a" /* GalleryPage */]);
    }
    /*****************************************************************************
    Function: goToSettings
    Purpose: Pushes settings page
    Parameters: None
    Return: None
    *****************************************************************************/
    goToSettings() {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__settings_settings__["a" /* SettingsPage */]);
    }
    /*****************************************************************************
    Function: goToBarberLocation
    Purpose: Pushes barber-location page
    Parameters: None
    Return: None
    *****************************************************************************/
    goToBarberLocation() {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_6__barber_location_barber_location__["a" /* BarberLocation */]);
    }
    ClientWaiting() {
        const listOfUsers = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.database().ref('TicketList/Users/');
        listOfUsers.on('value', function (snapshot) {
            var numberClientWaitingTicketList = 0;
            snapshot.forEach(function (childSnapshot) {
                numberClientWaitingTicketList++;
            }.bind(this));
            this.numberClientWaitingTicketList = numberClientWaitingTicketList;
        }.bind(this));
    }
    TotalReservation() {
        const listOfUsers = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.database().ref('Appointments/Users/');
        listOfUsers.on('value', function (snapshot) {
            var numberClientWaitingReservation = 0;
            snapshot.forEach(function (childSnapshot) {
                numberClientWaitingReservation++;
            }.bind(this));
            this.numberClientWaitingReservation = numberClientWaitingReservation;
        }.bind(this));
    }
    DirectMessages() {
        const liveMessages = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.database().ref('Messages/live/');
        liveMessages.on('value', snap => this.directMessages = snap.val()).bind(this);
    }
};
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\home\home.html"*/'<!--\n\n  Generated template for the ProfilePage page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header class="no-shadow">\n\n\n\n  <ion-navbar class="no-border" color="primary">\n\n    <ion-title>ACCUEIL</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button (click)="goToSettings()">\n\n        <ion-icon name="more"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n\n\n<ion-content class=" common-bg">\n\n  <!--list menu on the top-->\n\n  <div class="top-menu common-bg">\n\n    <ion-grid class="card">\n\n      <ion-row>\n\n        <ion-col (click)="getTicket()">\n\n          <ion-icon name="md-pricetag" color="green"></ion-icon>\n\n          <span ion-text color="dark">Prendre un ticket</span>\n\n        </ion-col>\n\n        <ion-col (click)="getAnAppointment()">\n\n          <ion-icon name="md-calendar" color="flight-color"></ion-icon>\n\n          <span ion-text color="dark">Prendre un rendez vous</span>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n\n\n  <ion-grid class="card">\n\n    <ion-row>\n\n      <ion-col>\n\n        <ion-badge class="center square" color="primary" (click)="goToBarberLocation()">Contacts</ion-badge>\n\n      </ion-col>\n\n      <ion-col  >\n\n        <ion-badge class="center square" color="primary" (click)="viewGallery()">Photos</ion-badge>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="margin-bottom:5%;margin-top:5%;" class="card" >\n\n    <ion-row>\n\n      <ion-col col-1>\n\n        <ion-icon name="people" style ="font-size: 30px;" color="flight-color"></ion-icon>\n\n      </ion-col>\n\n      <ion-col  col-11>\n\n        <span ion-text color="dark" style="font-size: 30px;">Client devant vous: <span style="font-weight: bold">{{numberClientWaitingTicketList}}</span></span>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-1>\n\n        <ion-icon name="clock" style ="font-size: 30px;" color="flight-color"></ion-icon>\n\n      </ion-col>\n\n      <ion-col  col-11>\n\n        <span ion-text color="dark" style="font-size: 30px;">Temps estimer: <span style="font-weight: bold">30 </span>minute</span>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n\n\n  <ion-grid text-center class="card">\n\n    <ion-row center>\n\n      <ion-col center style="padding-top: 20px;align-content: center;" col-12>\n\n        <ion-row center>\n\n          <ion-icon  style ="font-size: 50px;margin:0 auto;" name="people" color="flight-color"></ion-icon>\n\n        </ion-row>\n\n        <ion-row center>\n\n          <span ion-text color="dark" style="font-size: 30px;margin:0 auto;">Heure de votre reservation</span>\n\n        </ion-row>\n\n        <ion-row center>\n\n          <span ion-text color="dark" style="font-weight: bold;font-size: 30px;margin:0 auto;">21-SEP-2017 10 : 00</span>\n\n        </ion-row>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid  style="margin-top:5%;" text-center class="card">\n\n    <ion-row center>\n\n      <ion-col center style="align-content: center;" col-12>\n\n        <ion-label style="font-size: 20px;font-weight: bold;">Messages en direct:</ion-label>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row center>\n\n      <ion-col center style="align-content: center;" col-12>\n\n        <ion-label style="font-size: 20px;">{{directMessages}}</ion-label>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_gallery_service__["a" /* GalleryService */], __WEBPACK_IMPORTED_MODULE_9__progress_bar_progress_bar__["a" /* ProgressBarComponent */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_pictures__ = __webpack_require__(854);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let GalleryService = class GalleryService {
    constructor() {
        this.pictures = __WEBPACK_IMPORTED_MODULE_1__mock_pictures__["a" /* PICTURES */];
    }
    getAll() {
        return this.pictures;
    }
    getItem(id) {
        for (var i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].id === parseInt(id)) {
                return this.pictures[i];
            }
        }
        return null;
    }
    remove(item) {
        this.pictures.splice(this.pictures.indexOf(item), 1);
    }
};
GalleryService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], GalleryService);

//# sourceMappingURL=gallery-service.js.map

/***/ }),

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PICTURES; });
let PICTURES = [
    {
        id: 1,
        name: "Mario Perfect Cut",
        rating: 5.0,
        price: 25,
        sale_price: 20,
        location: {
            lat: 45.5495467,
            lon: -73.7578152,
        },
        address: "1536 Boulevard Curé-Labelle Laval QC H7V 2W2",
        description: "Best Barber in town",
        location_text: "Best Barber in town",
        features: "Best Barber in town",
        room_amenities: "Best Barber in town",
        thumb: "assets/img/hotel/thumb/img_1.jpg",
        homeGalery: [
            "assets/img/hotel/thumb/img_1.jpg",
            "assets/img/hotel/thumb/img_2.jpg",
            "assets/img/hotel/thumb/img_3.jpg",
            "assets/img/hotel/thumb/img_4.jpg",
            "assets/img/hotel/thumb/img_5.jpg",
            "assets/img/hotel/thumb/img_6.jpg"
        ],
        viewMoreGalery: [
            "assets/img/hotel/thumb/img_1.jpg",
            "assets/img/hotel/thumb/img_2.jpg",
            "assets/img/hotel/thumb/img_3.jpg",
            "assets/img/hotel/thumb/img_4.jpg",
            "assets/img/hotel/thumb/img_5.jpg",
            "assets/img/hotel/thumb/img_6.jpg",
            "assets/img/hotel/thumb/img_5.jpg",
            "assets/img/hotel/thumb/img_5.jpg",
            "assets/img/hotel/thumb/img_5.jpg",
            "assets/img/hotel/thumb/img_5.jpg"
        ],
        images: [
            "assets/img/hotel/thumb/img_2.jpg",
            "assets/img/hotel/thumb/img_4.jpg",
            "assets/img/hotel/thumb/img_5.jpg",
            "assets/img/hotel/thumb/img_6.jpg",
            "assets/img/hotel/thumb/img_6.jpg",
            "assets/img/hotel/thumb/img_6.jpg"
        ],
        free_wifi: 1,
        services: [
            {
                id: 1,
                icon: "ios-checkmark-circle-outline",
                name: "Pool"
            },
            {
                id: 2,
                icon: "ios-wifi",
                name: "Internet"
            }
        ],
        numb_available_rooms: 5,
        reviews: [
            {
                id: 1,
                username: "David",
                from: "Ohio",
                title: "Nice place, as long as you don't want to leave",
                content: "My wife and myself had two stays in the past week broken by a visit to Holong Bay. The hotel staff were very helpful in all ways, nothing was too much trouble. The taxis that bear the Nikko name were always on hand and good operators (cheap to get around). The bar had a fantastic happy hour being good nibbles and great value. We were always being helped by the concierge operators when coming and going and always translated for us to the taxi drivers. One of my best hotels.",
                rating: 4
            },
            {
                id: 2,
                username: " epz",
                from: "z",
                title: "Close to old quarter",
                content: "4 nights. Nice suite Staff very helpful. Easy to get cabs",
                rating: 4
            },
            {
                id: 3,
                username: "Hui Lan",
                from: "Singapore",
                title: "Short stay",
                content: "We stayed for 1 night before travelling to Sapa. Hotel reception staff speak limited English and not so friendly. Access to nearby food & beverage outside the hotel is not convenient.",
                rating: 3
            },
            {
                id: 4,
                username: "David",
                from: "Singapore",
                title: "CONVENIENT LOCATION",
                content: "I BOOKED THIS HOTEL BECAUSE IT WAS CONVENIENT TO WHERE I NEEDED TO BE. IT WAS A PRETTY AVERAGE HOTEL IN MOST WAYS BUT PLEASANT ENOUGH.",
                rating: 4
            },
            {
                id: 5,
                username: "Chrissie",
                from: "",
                title: "Disappointing and overpriced",
                content: "Disappointing stay as the condition of the hotel was the exact opposite of hotel nikko in saigon- Do not eat the food in this hotel, it is not only overprized but it also lacks in freshness and quality. The pool and fitness area looked alrite. The staff was helpful. The bar only offered one type of wine by the glass. We saw a bottle of wine called 'Apothic Red' which cost $12 in Aspen, CO in a bottle shop and about $30 in an expensive restaurant in Aspen. The hotel offered this inexpensive wine for &100?? We had a laugh and ended up having a drink in a different hotel. I would highly recommend hotel nikko in Saigon BUT not in hanoi",
                rating: 4
            }
        ],
        rooms: [
            {
                id: 1,
                active: 1,
                name: "Deluxe Room",
                beds: "1 king bed or 1 twin bed",
                numb_available_rooms: 3,
                refundable: 0,
                room_info: "Free Parking \n Free Internet \n Free Welcome Drink",
                thumb: "assets/img/hotel/thumb/img_4.jpg",
                price: 78
            },
            {
                id: 2,
                active: 0,
                name: "Grand Deluxe",
                beds: "1 king bed or 1 queen bed",
                numb_available_rooms: 2,
                refundable: 0,
                room_info: "",
                thumb: "assets/img/hotel/thumb/img_2.jpg",
                price: 90
            },
        ]
    },
    {
        id: 2,
        name: "Hanoi Fortuna Hotel",
        rating: 3.7,
        price: 131,
        sale_price: 73,
        location: {
            lat: 21.021425,
            lon: 105.8158252,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_7.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    },
    {
        id: 3,
        name: "Pullman Hanoi Hotel",
        rating: 4.1,
        price: 93,
        sale_price: 88,
        location: {
            lat: 21.0295445,
            lon: 105.82603,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_8.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    },
    {
        id: 4,
        name: "Windy Hotel",
        rating: 3.3,
        price: 37,
        sale_price: 35,
        location: {
            lat: 21.0260087,
            lon: 105.8321135,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_8.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    },
    {
        id: 5,
        name: "Capital Garden Hotel",
        rating: 4.1,
        price: 37,
        sale_price: 35,
        location: {
            lat: 21.0154663,
            lon: 105.8109217,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_9.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    },
    {
        id: 6,
        name: "Hotel Nikko Hanoi",
        rating: 4.1,
        price: 37,
        sale_price: 35,
        location: {
            lat: 21.0179794,
            lon: 105.8397699,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_10.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    },
    {
        id: 7,
        name: "Parkside Sunline Hotel",
        rating: 4.0,
        price: 104,
        sale_price: 47,
        location: {
            lat: 21.0084391,
            lon: 105.8452307,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_11.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    },
    {
        id: 8,
        name: "Pullman Hanoi Hotel",
        rating: 4.1,
        price: 93,
        sale_price: 0,
        location: {
            lat: 21.032786,
            lon: 105.812913,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_8.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    }
];
//# sourceMappingURL=mock-pictures.js.map

/***/ }),

/***/ 856:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 403,
	"./af.js": 403,
	"./ar": 404,
	"./ar-dz": 405,
	"./ar-dz.js": 405,
	"./ar-kw": 406,
	"./ar-kw.js": 406,
	"./ar-ly": 407,
	"./ar-ly.js": 407,
	"./ar-ma": 408,
	"./ar-ma.js": 408,
	"./ar-sa": 409,
	"./ar-sa.js": 409,
	"./ar-tn": 410,
	"./ar-tn.js": 410,
	"./ar.js": 404,
	"./az": 411,
	"./az.js": 411,
	"./be": 412,
	"./be.js": 412,
	"./bg": 413,
	"./bg.js": 413,
	"./bn": 414,
	"./bn.js": 414,
	"./bo": 415,
	"./bo.js": 415,
	"./br": 416,
	"./br.js": 416,
	"./bs": 417,
	"./bs.js": 417,
	"./ca": 418,
	"./ca.js": 418,
	"./cs": 419,
	"./cs.js": 419,
	"./cv": 420,
	"./cv.js": 420,
	"./cy": 421,
	"./cy.js": 421,
	"./da": 422,
	"./da.js": 422,
	"./de": 423,
	"./de-at": 424,
	"./de-at.js": 424,
	"./de-ch": 425,
	"./de-ch.js": 425,
	"./de.js": 423,
	"./dv": 426,
	"./dv.js": 426,
	"./el": 427,
	"./el.js": 427,
	"./en-au": 428,
	"./en-au.js": 428,
	"./en-ca": 429,
	"./en-ca.js": 429,
	"./en-gb": 430,
	"./en-gb.js": 430,
	"./en-ie": 431,
	"./en-ie.js": 431,
	"./en-nz": 432,
	"./en-nz.js": 432,
	"./eo": 433,
	"./eo.js": 433,
	"./es": 434,
	"./es-do": 435,
	"./es-do.js": 435,
	"./es.js": 434,
	"./et": 436,
	"./et.js": 436,
	"./eu": 437,
	"./eu.js": 437,
	"./fa": 438,
	"./fa.js": 438,
	"./fi": 439,
	"./fi.js": 439,
	"./fo": 440,
	"./fo.js": 440,
	"./fr": 441,
	"./fr-ca": 442,
	"./fr-ca.js": 442,
	"./fr-ch": 443,
	"./fr-ch.js": 443,
	"./fr.js": 441,
	"./fy": 444,
	"./fy.js": 444,
	"./gd": 445,
	"./gd.js": 445,
	"./gl": 446,
	"./gl.js": 446,
	"./gom-latn": 447,
	"./gom-latn.js": 447,
	"./he": 448,
	"./he.js": 448,
	"./hi": 449,
	"./hi.js": 449,
	"./hr": 450,
	"./hr.js": 450,
	"./hu": 451,
	"./hu.js": 451,
	"./hy-am": 452,
	"./hy-am.js": 452,
	"./id": 453,
	"./id.js": 453,
	"./is": 454,
	"./is.js": 454,
	"./it": 455,
	"./it.js": 455,
	"./ja": 456,
	"./ja.js": 456,
	"./jv": 457,
	"./jv.js": 457,
	"./ka": 458,
	"./ka.js": 458,
	"./kk": 459,
	"./kk.js": 459,
	"./km": 460,
	"./km.js": 460,
	"./kn": 461,
	"./kn.js": 461,
	"./ko": 462,
	"./ko.js": 462,
	"./ky": 463,
	"./ky.js": 463,
	"./lb": 464,
	"./lb.js": 464,
	"./lo": 465,
	"./lo.js": 465,
	"./lt": 466,
	"./lt.js": 466,
	"./lv": 467,
	"./lv.js": 467,
	"./me": 468,
	"./me.js": 468,
	"./mi": 469,
	"./mi.js": 469,
	"./mk": 470,
	"./mk.js": 470,
	"./ml": 471,
	"./ml.js": 471,
	"./mr": 472,
	"./mr.js": 472,
	"./ms": 473,
	"./ms-my": 474,
	"./ms-my.js": 474,
	"./ms.js": 473,
	"./my": 475,
	"./my.js": 475,
	"./nb": 476,
	"./nb.js": 476,
	"./ne": 477,
	"./ne.js": 477,
	"./nl": 478,
	"./nl-be": 479,
	"./nl-be.js": 479,
	"./nl.js": 478,
	"./nn": 480,
	"./nn.js": 480,
	"./pa-in": 481,
	"./pa-in.js": 481,
	"./pl": 482,
	"./pl.js": 482,
	"./pt": 483,
	"./pt-br": 484,
	"./pt-br.js": 484,
	"./pt.js": 483,
	"./ro": 485,
	"./ro.js": 485,
	"./ru": 486,
	"./ru.js": 486,
	"./sd": 487,
	"./sd.js": 487,
	"./se": 488,
	"./se.js": 488,
	"./si": 489,
	"./si.js": 489,
	"./sk": 490,
	"./sk.js": 490,
	"./sl": 491,
	"./sl.js": 491,
	"./sq": 492,
	"./sq.js": 492,
	"./sr": 493,
	"./sr-cyrl": 494,
	"./sr-cyrl.js": 494,
	"./sr.js": 493,
	"./ss": 495,
	"./ss.js": 495,
	"./sv": 496,
	"./sv.js": 496,
	"./sw": 497,
	"./sw.js": 497,
	"./ta": 498,
	"./ta.js": 498,
	"./te": 499,
	"./te.js": 499,
	"./tet": 500,
	"./tet.js": 500,
	"./th": 501,
	"./th.js": 501,
	"./tl-ph": 502,
	"./tl-ph.js": 502,
	"./tlh": 503,
	"./tlh.js": 503,
	"./tr": 504,
	"./tr.js": 504,
	"./tzl": 505,
	"./tzl.js": 505,
	"./tzm": 506,
	"./tzm-latn": 507,
	"./tzm-latn.js": 507,
	"./tzm.js": 506,
	"./uk": 508,
	"./uk.js": 508,
	"./ur": 509,
	"./ur.js": 509,
	"./uz": 510,
	"./uz-latn": 511,
	"./uz-latn.js": 511,
	"./uz.js": 510,
	"./vi": 512,
	"./vi.js": 512,
	"./x-pseudo": 513,
	"./x-pseudo.js": 513,
	"./yo": 514,
	"./yo.js": 514,
	"./zh-cn": 515,
	"./zh-cn.js": 515,
	"./zh-hk": 516,
	"./zh-hk.js": 516,
	"./zh-tw": 517,
	"./zh-tw.js": 517
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 856;

/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GetAnAppointmentModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let GetAnAppointmentModel = class GetAnAppointmentModel {
    constructor() {
        this.businessHours = [];
        this.dataSnapshot = [];
        this.userAccounts = [];
        this.updateDataSnapshot();
        this.updateUserAccounts();
        this.businessHours = [
            {
                'Day': 'Monday',
                'Opening': null,
                'Closure': null
            },
            {
                'Day': 'Tuesday',
                'Opening': 10,
                'Closure': 18
            },
            {
                'Day': 'Wednesday',
                'Opening': 10,
                'Closure': 18
            },
            {
                'Day': 'Thursday',
                'Opening': 10,
                'Closure': 21
            },
            {
                'Day': 'Friday',
                'Opening': 10,
                'Closure': 21
            },
            {
                'Day': 'Saturday',
                'Opening': 10,
                'Closure': 18
            },
            {
                'Day': 'Sunday',
                'Opening': 10,
                'Closure': 17
            }
        ];
    }
    /*****************************************************************************
    Function: getUserId
    Purpose: Retrieve the user id in db
    Parameters: None
    Return: userID (String)
    *****************************************************************************/
    getUserId() {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid;
    }
    /*****************************************************************************
    Function: updateDataSnapshot
    Purpose: Listener to firebase database. Update model if data changes
    Parameters: None
    Return: None
    *****************************************************************************/
    updateDataSnapshot() {
        let model = this;
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('Appointments/Users')
            .on('value', function (snapshot) {
            let appointments = snapshot.val();
            model.dataSnapshot = [];
            for (var property in appointments) {
                if (appointments.hasOwnProperty(property)) {
                    model.dataSnapshot.push(appointments[property]);
                }
            }
        });
    }
    /*****************************************************************************
    Function: getBusinessHours
    Purpose: Return the business hours of the date in parameter
    Parameters: date (String): Date we want the business hours
    Return: None
    *****************************************************************************/
    getBusinessHours(date) {
        var day = date.toString().substring(0, 3);
        var currentDate = this.businessHours.find(item => item.Day.indexOf(day) != -1);
        if (currentDate.Opening != null) {
            return currentDate;
        }
        else {
            do {
                var index = this.businessHours.findIndex(item => item.Day.indexOf(day) != -1);
                index++;
                day = this.businessHours[index].Day.substring(0, 3);
            } while (this.businessHours[index].Opening == null);
            return this.businessHours[index];
        }
    }
    /*****************************************************************************
    Function: isAvailable
    Purpose: Tells if the date and hour in parameter is available in db
    Parameters: date (String): date user wants to book
                hour (String): hour user wants to book
    Return: None
    *****************************************************************************/
    isAvailable(date, hour) {
        return (this.dataSnapshot.find(item => item.Date == date && item.Hour == hour) == undefined);
    }
    /*****************************************************************************
    Function: createNew
    Purpose: Register a new appointment in db
    Parameters: date(String): date to be saved
                hour(String): hour to be saved
    Return: None
    *****************************************************************************/
    createNew(date, hour) {
        var appointments = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('Appointments/Users');
        var userId = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid;
        var timeStamp = new Date().getTime().toString();
        var user = this.userAccounts.find(item => item.UserId == userId);
        appointments.child(timeStamp).set({
            UserId: userId,
            Date: date,
            Hour: hour,
            firstName: user.firstName,
            lastName: user.lastName
        });
    }
    /*****************************************************************************
    Function: updateUserAccounts
    Purpose: Fetch user accounts from db
    Parameters: None
    Return: None
    *****************************************************************************/
    updateUserAccounts() {
        let controller = this;
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('Users/')
            .on('value', function (snapshot) {
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
    Function: getDaysBooked
    Purpose: Return the list of the days that cannot receive a booking anymore
    Parameters: None
    Return: daysFullBooked (Array<String>): The list of days fully booked
    *****************************************************************************/
    getDaysBooked() {
        var days = [];
        var nbAppointments = [];
        var nbMaxAppointments = [0, 0, 0, 0, 0, 0, 0];
        var daysBooked = [];
        //Calculate the nb of booking available for each day
        for (var i = 0; i < nbMaxAppointments.length; i++) {
            if (this.businessHours[i].Opening != null) {
                nbMaxAppointments[i] = 2 * (this.businessHours[i].Closure - this.businessHours[i].Opening);
            }
            else {
                nbMaxAppointments[i] = 0;
            }
        }
        //Calculate nb of booking recorded for each day in database
        for (var i = 0; i < this.dataSnapshot.length; i++) {
            if (days.find(item => item == this.dataSnapshot[i].Date) != null) {
                var index = days.indexOf(this.dataSnapshot[i].Date);
                nbAppointments[index]++;
            }
            else {
                days.push(this.dataSnapshot[i].Date);
                nbAppointments.push(1);
            }
        }
        //Save days that have reached the max nb of appointments available
        for (var i = 0; i < days.length; i++) {
            var day = new Date(days[i]).getDay();
            var nbAppMax = nbMaxAppointments[day - 1];
            if (nbAppointments[i] >= nbAppMax)
                daysBooked.push(days[i]);
        }
        return daysBooked;
    }
};
GetAnAppointmentModel = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\getanappointment\getanappointment.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>Prendre rendez-vous</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content class="light-bg">\n\n  <div class="getanappointment">\n\n    <div style="height:auto" class="cal-bg header-row">\n\n      <ion-row class="text-center input-row">\n\n        <ion-col width-100>\n\n          <div class="check-text">Choisissez le jour</div>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row class="text-center week-row">\n\n        <ion-col *ngFor="let weekName of weekNames" style="margin:0;padding:0">\n\n          <span>{{weekName}}</span>\n\n        </ion-col>\n\n      </ion-row>\n\n    </div>\n\n\n\n    <!-- ion-content contains the calendar months displayed in the view -->\n\n    <div style="height:100%; overflow-y: scroll; margin-left:0" class="month-list">\n\n      <ion-item *ngFor="let monthObj of months">\n\n        <ion-row class="month-row" >\n\n          <ion-col width-60 class="text-center">\n\n            {{monthObj.selectedMonth.format("MMM YYYY")}}\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n        <div class="day-grid">\n\n          <ion-row class="text-center day-row" *ngFor="let week of monthObj.weeks; let rowIndex = index" >\n\n            <ion-col class="day-col" *ngFor="let day of week.days; let colIndex = index">\n\n\n\n                <button ion-button  *ngIf="day"  clear [datespan]="day.id" (click)="select(monthObj,day,rowIndex)">\n\n                  {{day.displayText}}\n\n                </button>\n\n\n\n            </ion-col>\n\n          </ion-row>\n\n        </div>\n\n      </ion-item>\n\n    </div>\n\n  </div>\n\n\n\n  <ion-row style="position: relative; margin-top:27.5%">\n\n    <ion-col col-3></ion-col>\n\n    <ion-col col-2>\n\n      <ion-row style="padding: 5px; cursor: pointer" (click)="increaseHour()">\n\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-up"></ion-icon>\n\n      </ion-row>\n\n      <ion-row>\n\n        <p style="padding: 5px; font-size: 20px; margin: auto">{{currentHour}}</p>\n\n      </ion-row>\n\n      <ion-row style="padding: 5px; cursor: pointer" (click)="decreaseHour()">\n\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-down"></ion-icon>\n\n      </ion-row>\n\n    </ion-col>\n\n\n\n    <ion-col col-2>\n\n      <ion-row style="padding: 5px; cursor: pointer">\n\n        <ion-icon color="bg-color" style="font-size: 25px; margin: auto" name="ios-arrow-up"></ion-icon>\n\n      </ion-row>\n\n      <ion-row>\n\n        <p style="padding: 5px; font-size: 20px; margin: auto">:</p>\n\n      </ion-row>\n\n      <ion-row style="padding: 5px; cursor: pointer">\n\n        <ion-icon color="bg-color" style="font-size: 25px; margin: auto" name="ios-arrow-down"></ion-icon>\n\n      </ion-row>\n\n    </ion-col>\n\n\n\n    <ion-col col-2>\n\n      <ion-row style="padding: 5px; cursor: pointer" (click)="changeMinutes()">\n\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-up"></ion-icon>\n\n      </ion-row>\n\n      <ion-row>\n\n        <p style="padding: 5px; font-size: 20px; margin: auto">{{currentMinutes}}</p>\n\n      </ion-row>\n\n      <ion-row style="padding: 5px; cursor: pointer" (click)="changeMinutes()">\n\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-down"></ion-icon>\n\n      </ion-row>\n\n    </ion-col>\n\n    <ion-col col-3></ion-col>\n\n  </ion-row>\n\n\n\n  <ion-row>\n\n    <p [ngClass] = "conflictMessageClasses">{{errorMessage}}</p>\n\n  </ion-row>\n\n\n\n  <div style="padding-left: 10%; padding-right: 10%;margin-top:1.5%">\n\n    <button ion-button class="round" full color="primary" (click)="getAppointment()">Réserver</button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Surface\Desktop\CodeKL\Ionic\Projets\Barber\src\pages\getanappointment\getanappointment.html"*/,
    }),
    __metadata("design:paramtypes", [])
], GetAnAppointmentModel);

//# sourceMappingURL=GetAnAppointmentModel.js.map

/***/ }),

/***/ 885:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BARBERS; });
let BARBERS = [
    {
        id: 1,
        name: "Mario Perfect Cut",
        rating: 5.0,
        price: 25,
        sale_price: 20,
        location: {
            lat: 45.5495467,
            lon: -73.7578152,
        },
        address: "1536 Boulevard Curé-Labelle Laval QC H7V 2W2",
        description: "Best Barber in town",
        location_text: "Best Barber in town",
        features: "Best Barber in town",
        room_amenities: "Best Barber in town",
        thumb: "assets/img/hotel/thumb/img_1.jpg",
        homeGalery: [
            "assets/img/hotel/thumb/img_1.jpg",
            "assets/img/hotel/thumb/img_2.jpg",
            "assets/img/hotel/thumb/img_3.jpg",
            "assets/img/hotel/thumb/img_4.jpg",
            "assets/img/hotel/thumb/img_5.jpg",
            "assets/img/hotel/thumb/img_6.jpg"
        ],
        viewMoreGalery: [
            "assets/img/hotel/thumb/img_1.jpg",
            "assets/img/hotel/thumb/img_2.jpg",
            "assets/img/hotel/thumb/img_3.jpg",
            "assets/img/hotel/thumb/img_4.jpg",
            "assets/img/hotel/thumb/img_5.jpg",
            "assets/img/hotel/thumb/img_6.jpg",
            "assets/img/hotel/thumb/img_5.jpg",
            "assets/img/hotel/thumb/img_5.jpg",
            "assets/img/hotel/thumb/img_5.jpg",
            "assets/img/hotel/thumb/img_5.jpg"
        ],
        images: [
            "assets/img/hotel/thumb/img_2.jpg",
            "assets/img/hotel/thumb/img_4.jpg",
            "assets/img/hotel/thumb/img_5.jpg",
            "assets/img/hotel/thumb/img_6.jpg",
            "assets/img/hotel/thumb/img_6.jpg",
            "assets/img/hotel/thumb/img_6.jpg"
        ],
        free_wifi: 1,
        services: [
            {
                id: 1,
                icon: "ios-checkmark-circle-outline",
                name: "Pool"
            },
            {
                id: 2,
                icon: "ios-wifi",
                name: "Internet"
            }
        ],
        numb_available_rooms: 5,
        reviews: [
            {
                id: 1,
                username: "David",
                from: "Ohio",
                title: "Nice place, as long as you don't want to leave",
                content: "My wife and myself had two stays in the past week broken by a visit to Holong Bay. The hotel staff were very helpful in all ways, nothing was too much trouble. The taxis that bear the Nikko name were always on hand and good operators (cheap to get around). The bar had a fantastic happy hour being good nibbles and great value. We were always being helped by the concierge operators when coming and going and always translated for us to the taxi drivers. One of my best hotels.",
                rating: 4
            },
            {
                id: 2,
                username: " epz",
                from: "z",
                title: "Close to old quarter",
                content: "4 nights. Nice suite Staff very helpful. Easy to get cabs",
                rating: 4
            },
            {
                id: 3,
                username: "Hui Lan",
                from: "Singapore",
                title: "Short stay",
                content: "We stayed for 1 night before travelling to Sapa. Hotel reception staff speak limited English and not so friendly. Access to nearby food & beverage outside the hotel is not convenient.",
                rating: 3
            },
            {
                id: 4,
                username: "David",
                from: "Singapore",
                title: "CONVENIENT LOCATION",
                content: "I BOOKED THIS HOTEL BECAUSE IT WAS CONVENIENT TO WHERE I NEEDED TO BE. IT WAS A PRETTY AVERAGE HOTEL IN MOST WAYS BUT PLEASANT ENOUGH.",
                rating: 4
            },
            {
                id: 5,
                username: "Chrissie",
                from: "",
                title: "Disappointing and overpriced",
                content: "Disappointing stay as the condition of the hotel was the exact opposite of hotel nikko in saigon- Do not eat the food in this hotel, it is not only overprized but it also lacks in freshness and quality. The pool and fitness area looked alrite. The staff was helpful. The bar only offered one type of wine by the glass. We saw a bottle of wine called 'Apothic Red' which cost $12 in Aspen, CO in a bottle shop and about $30 in an expensive restaurant in Aspen. The hotel offered this inexpensive wine for &100?? We had a laugh and ended up having a drink in a different hotel. I would highly recommend hotel nikko in Saigon BUT not in hanoi",
                rating: 4
            }
        ],
        rooms: [
            {
                id: 1,
                active: 1,
                name: "Deluxe Room",
                beds: "1 king bed or 1 twin bed",
                numb_available_rooms: 3,
                refundable: 0,
                room_info: "Free Parking \n Free Internet \n Free Welcome Drink",
                thumb: "assets/img/hotel/thumb/img_4.jpg",
                price: 78
            },
            {
                id: 2,
                active: 0,
                name: "Grand Deluxe",
                beds: "1 king bed or 1 queen bed",
                numb_available_rooms: 2,
                refundable: 0,
                room_info: "",
                thumb: "assets/img/hotel/thumb/img_2.jpg",
                price: 90
            },
        ]
    },
    {
        id: 2,
        name: "Hanoi Fortuna Hotel",
        rating: 3.7,
        price: 131,
        sale_price: 73,
        location: {
            lat: 21.021425,
            lon: 105.8158252,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_7.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    },
    {
        id: 3,
        name: "Pullman Hanoi Hotel",
        rating: 4.1,
        price: 93,
        sale_price: 88,
        location: {
            lat: 21.0295445,
            lon: 105.82603,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_8.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    },
    {
        id: 4,
        name: "Windy Hotel",
        rating: 3.3,
        price: 37,
        sale_price: 35,
        location: {
            lat: 21.0260087,
            lon: 105.8321135,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_8.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    },
    {
        id: 5,
        name: "Capital Garden Hotel",
        rating: 4.1,
        price: 37,
        sale_price: 35,
        location: {
            lat: 21.0154663,
            lon: 105.8109217,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_9.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    },
    {
        id: 6,
        name: "Hotel Nikko Hanoi",
        rating: 4.1,
        price: 37,
        sale_price: 35,
        location: {
            lat: 21.0179794,
            lon: 105.8397699,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_10.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    },
    {
        id: 7,
        name: "Parkside Sunline Hotel",
        rating: 4.0,
        price: 104,
        sale_price: 47,
        location: {
            lat: 21.0084391,
            lon: 105.8452307,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_11.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    },
    {
        id: 8,
        name: "Pullman Hanoi Hotel",
        rating: 4.1,
        price: 93,
        sale_price: 0,
        location: {
            lat: 21.032786,
            lon: 105.812913,
        },
        address: "360 Kim Ma Street Hanoi 100000",
        description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
        location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
        features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
        room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
        thumb: "assets/img/hotel/thumb/img_8.jpg",
        images: [],
        services: [],
        numb_available_rooms: 5,
        reviews: [],
        rooms: []
    }
];
//# sourceMappingURL=mock-barbers.js.map

/***/ })

},[542]);
//# sourceMappingURL=main.js.map