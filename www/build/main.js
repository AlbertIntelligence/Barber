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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert_alert__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(529);
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
    constructor(nav, newAlert) {
        this.nav = nav;
        this.newAlert = newAlert;
        this.getCurrentClient();
        this.getUserInfo();
    }
    ionViewDidLoad() {
        this.hideTicketDiv();
    }
    makeTransaction() {
        if (true) {
            // this.addClientToList()
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
        dbRefObject.on('value', snap => this.currentPosition = snap.val());
    }
    /*****************************************************************************
     Function: checkPayment
     Auteur(s): Lenz Petion
     Date de creation: 2017-06-03
     Date de modification:
     Description: This function tells if a user is logged in
     *****************************************************************************/
    addClientToList() {
        const dbRefObject = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref().child('TicketsList/Users/');
        dbRefObject.set({ currentPosition: this.currentPosition + 1 });
    }
    //------------------------------------------THIS IS THE HELPER FUNCTION SECTION----------------------------------------------//
    setHiddeDiv(value) {
        this.hiddenDiv = value;
    }
    getHiddeDiv() {
        return this.hiddenDiv;
    }
    confirmMessage() {
        this.newAlert.presentAlert();
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
        selector: 'get-a-ticket',template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/get-a-ticket/get-a-ticket.html"*/'\n<script>\n  this.hideTicketDiv();\n</script>\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Profile\n    </ion-title>\n    <ion-buttons left>\n      <button ion-button icon-only>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content padding="false" class="common-bg">\n  <div style="">\n    <div style="">\n      <div style="display: block; border: 1px solid #C5C5C5; border-radius: 100%; padding: 0">\n        <img color="primary" src="../../assets/img/bg.jpg" style="display: block; margin: auto; border: 3vw solid #009687; width: 70vw; height: 70vw; border-radius: 100%" />\n      </div>\n      <div style="font-size: 20px; margin-top: 10px" text-center>{{userInfoFirstName + " " + userInfoLastName }}</div>\n      <div style="font-size: 10px" text-center>\n        <ion-icon color="primary" style="" name="pin"></ion-icon>\n        Montreal, Canada </div>\n    </div>\n\n\n    <div>\n\n      <div id="ticketPosition"  class="animated infinite bounce" >\n        <ion-grid style="margin-top: 15%">\n          <ion-row>\n            <ion-col col-6>\n              <ion-row>\n                <p style="margin:auto; font-size: 20px"><b>{{currentPosition}}</b></p>\n              </ion-row>\n              <ion-row>\n                <p style="margin:auto; font-size: 10px">CURRENT CLIENT</p>\n              </ion-row>\n            </ion-col>\n            <ion-col col-6>\n              <ion-row>\n                <p style="margin:auto; font-size: 20px"><b>{{userPosition}}</b></p>\n              </ion-row>\n              <ion-row>\n                <p style="margin:auto; font-size: 10px">YOUR POSITION</p>\n              </ion-row>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </div>\n\n      <ion-grid style="margin-top: 1%">\n        <ion-row>\n          <ion-icon (click)="confirmMessage()" color="primary" style="margin:auto; font-size: 50px;" name="add-circle"></ion-icon>\n        </ion-row>\n\n        <ion-row>\n          <p style="margin:auto; font-size: 10px">TAKE A NUMBER</p>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/get-a-ticket/get-a-ticket.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__alert_alert__["a" /* Alert */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__alert_alert__["a" /* Alert */]) === "function" && _b || Object])
], GetaTicketPage);

//------------------------------------------THIS IS THE Algorithm  SECTION----------------------------------------------//
class LinkedListItem {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}
class LinkedList {
    constructor(item) {
        this.head = item;
    }
    // Adds the element at a specific position inside the linked list
    insert(val, previousItem) {
        let newItem = new LinkedListItem(val);
        let currentItem = this.head;
        if (!currentItem) {
            this.head = newItem;
        }
        else {
            while (true) {
                if (currentItem === previousItem) {
                    let tempNextItem = previousItem.next;
                    currentItem.next = newItem;
                    newItem.next = tempNextItem;
                    break;
                }
                else {
                    currentItem = currentItem.next;
                }
            }
        }
    }
    // Adds the element at the end of the linked list
    append(val) {
        let currentItem = this.head;
        let newItem = new LinkedListItem(val);
        if (!currentItem) {
            this.head = newItem;
        }
        else {
            while (true) {
                if (currentItem.next) {
                    currentItem = currentItem.next;
                }
                else {
                    currentItem.next = newItem;
                    break;
                }
            }
        }
    }
    // Add the element at the beginning of the linked list
    prepend(val) {
        let newItem = new LinkedListItem(val);
        let oldHead = this.head;
        this.head = newItem;
        newItem.next = oldHead;
    }
    delete(val) {
        var currentItem = this.head;
        if (!currentItem) {
            return;
        }
        if (currentItem.value === val) {
            this.head = currentItem.next;
        }
        else {
            var previous = null;
            while (true) {
                if (currentItem.value === val) {
                    if (currentItem.next) {
                        previous.next = currentItem.next;
                    }
                    else {
                        previous.next = null;
                    }
                    currentItem = null; // avoid memory leaks
                    break;
                }
                else {
                    previous = currentItem;
                    currentItem = currentItem.next;
                }
            }
        }
    }
    showInArray() {
        let arr = [];
        let currentItem = this.head;
        while (true) {
            arr.push(currentItem.value);
            if (currentItem.next) {
                currentItem = currentItem.next;
            }
            else {
                break;
            }
        }
        return arr;
    }
}
var _a, _b;
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
        selector: 'ticket-confirmation',template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/ticket-confirmation/ticket-confirmation.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Confirmation\n    </ion-title>\n    <ion-buttons left>\n     <button ion-button icon-only>\n    </button>\n  </ion-buttons>\n</ion-navbar>\n</ion-header>\n<ion-content padding="false" class="primary-bg" color="white">\n  <ion-row>\n    <ion-icon color="primary" style="margin:auto; margin-top: 15vh; font-size: 70vw; color: white" name="ios-checkmark-circle-outline"></ion-icon>\n  </ion-row>\n  <ion-row>\n    <div style="font-size: 20px; margin: auto; margin-top: 10px; color: white" text-center>Reservation completed !</div>\n  </ion-row>\n  <ion-row>\n    <div style="font-size: 20px; margin: auto; margin-top: 10px; color: white" text-center>Your position is 166</div>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/ticket-confirmation/ticket-confirmation.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__create_user_create_user__ = __webpack_require__(534);
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
        selector: 'page-login',template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/login/login.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding class="login common-bg auth-page">\n  <div class="login-content">\n\n    <!-- Logo -->\n    <div padding text-center>\n      <h2 ion-text color="light">\n        Mario Perfect Cut\n      </h2>\n    </div>\n\n    <!-- Login form -->\n    <div class="list-form" padding>\n\n      <ion-item>\n        <ion-label stacked>Email</ion-label>\n        <ion-input [(ngModel)]="email" type="text" color="white"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>Password</ion-label>\n        <ion-input [(ngModel)]="password" type="password"></ion-input>\n      </ion-item>\n\n    </div>\n\n    <p text-right ion-text color="light">Mot de passe oublié?</p>\n\n    <div>\n      <button ion-button block color="primary" (click)="loginUser()">\n        SE CONNECTER\n      </button>\n\n      <p text-center ion-text color="light">Ou</p>\n\n      <button ion-button block color="fb-color" (click)="gotoCreateUser()">\n        S\'INSCRIRE\n      </button>\n    </div>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 162:
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
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 205:
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
webpackEmptyAsyncContext.id = 205;

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneNumberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(150);
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
    constructor(navCtrl, navParams, keyboard, platform, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.keyboard = keyboard;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.loaded = false;
        this.currentView = "home";
        this.pinIsFull = false;
    }
    ngOnInit() {
        this.setHeaderFooter();
    }
    ionViewDidLoad() {
        this.recaptchaVerifier = new __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth.RecaptchaVerifier('recaptcha-container');
    }
    handleKeyboardEvent(event) {
        if (event.key != "Backspace" && __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).parent().attr('id').indexOf("digit") == 0) {
            var index = parseInt(__WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).parent().attr('id')[5]);
            index++;
            if (index == 7)
                this.pinIsFull = true;
            if (index < 7) {
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit" + index).css('border-bottom', '2px solid black');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit" + index).children().eq(0).focus();
            }
            if (__WEBPACK_IMPORTED_MODULE_3_jquery__("#digit1").children().eq(0).val().length > 0)
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit1").css('border-bottom', '2px solid black');
            if (__WEBPACK_IMPORTED_MODULE_3_jquery__("#digit2").children().eq(0).val().length > 0)
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit2").css('border-bottom', '2px solid black');
            if (__WEBPACK_IMPORTED_MODULE_3_jquery__("#digit3").children().eq(0).val().length > 0)
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit3").css('border-bottom', '2px solid black');
            if (__WEBPACK_IMPORTED_MODULE_3_jquery__("#digit4").children().eq(0).val().length > 0)
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit4").css('border-bottom', '2px solid black');
            if (__WEBPACK_IMPORTED_MODULE_3_jquery__("#digit5").children().eq(0).val().length > 0)
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit6").css('border-bottom', '2px solid black');
            if (__WEBPACK_IMPORTED_MODULE_3_jquery__("#digit5").children().eq(0).val().length > 0)
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit6").css('border-bottom', '2px solid black');
        }
        else if (event.key == "Backspace" && __WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).parent().attr('id').indexOf("digit") == 0) {
            var index = parseInt(__WEBPACK_IMPORTED_MODULE_3_jquery__(event.target).parent().attr('id')[5]);
            if (index < 7 && index > 1 && __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit" + index).val().length == 0) {
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit" + index).css('border-bottom', '2px solid #F2F2F2');
                index--;
                if (index > 0 && !this.pinIsFull) {
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit" + index).children().eq(0).val("");
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit" + index).children().eq(0).focus();
                }
                if (index == 5)
                    this.pinIsFull = false;
            }
        }
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
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#postalCode").children().eq(0).focus();
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
    Function: enterYourPhone
    Description: Trigger the transition
    Parameters: event
    Return: void
    *****************************************************************************/
    enterYourPhone() {
        //When focusing on input, load phone number view if not already loaded
        if (!this.loaded) {
            this.loaded = true;
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#main").css('background-color', 'white');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#main").css('height', '100vh');
            if (this.platform.is('ios')) {
                this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#main"), "0px", "-63.5vh");
            }
            else {
                this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#main"), "0px", "-63vh");
            }
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#link").removeClass('visible').addClass('hidden');
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#title"), "0px", "10vh");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#inputBloc"), "0px", "14vh");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#title").css('font-size', '5vw');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#backBtn").css('margin-top', '2vh');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#title").text("Entrez votre numéro de téléphone");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#hr").removeClass('visible').addClass('hidden');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#input").attr("placeholder", "(514) 555-1234");
            //Animation slow
            setTimeout(() => {
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#backBtn").removeClass('hidden').addClass('visible');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#nextBtn").removeClass('hidden').addClass('visible');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#inputBloc").css('border-bottom', '2px solid black');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#input").focus();
                setTimeout(() => {
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#input").focus();
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
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#input").blur();
            this.loaded = false;
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#title"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#inputBloc"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#main"), "0px", "0px");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#title").css('font-size', '5.75vw');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#backBtn").css('margin-top', '0');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#title").text("Coiffez vous avec Barber Me");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#hr").removeClass('hidden').addClass('visible');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#backBtn").addClass('hidden').removeClass('visible');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#nextBtn").addClass('hidden').removeClass('visible');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#inputBloc").css('border', '0');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#input").attr("placeholder", "Numéro de téléphone");
            setTimeout(() => {
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#main").css('height', 'auto');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#link").removeClass('hidden').addClass('visible');
            }, 1000);
            this.currentView = "home";
        }
        else if (this.currentView == "6-digit") {
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#digitTitle"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#title"), "0px", "10vh");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#digitBloc"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#inputBloc"), "0px", "14vh");
            this.currentView = "phoneNumber";
        }
        else if (this.currentView == "email") {
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#emailTitle"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#digitTitle"), "-100vw", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#digitBloc"), "-100vw", "0px");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit1").children().eq(0).val("");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit2").children().eq(0).val("");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit3").children().eq(0).val("");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit4").children().eq(0).val("");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit5").children().eq(0).val("");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit6").children().eq(0).val("");
            this.currentView = "6-digit";
        }
        else if (this.currentView == "password") {
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordTitle"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#emailTitle"), "-100vw", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput"), "-100vw", "0px");
            this.currentView = "email";
        }
        else if (this.currentView == "name") {
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameTitle"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordTitle"), "-100vw", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameInput"), "0px", "0px");
            this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput"), "-100vw", "0px");
            this.currentView = "password";
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
    Description: Show the 4 digit PIN features
    Parameters: None
    Return: None
    *****************************************************************************/
    goToNext() {
        switch (this.currentView) {
            //Go to enter your view
            case "phoneNumber":
                if (__WEBPACK_IMPORTED_MODULE_3_jquery__("#input").val().length == 14) {
                    this.currentView = "6-digit";
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#digitTitle"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#title"), "-100vw", "10vh");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#digitBloc"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#inputBloc"), "-100vw", "14vh");
                    setTimeout(() => { __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit1").children().eq(0).focus(); }, 1000);
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit1").children().eq(0).val("");
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit2").children().eq(0).val("");
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit3").children().eq(0).val("");
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit4").children().eq(0).val("");
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit5").children().eq(0).val("");
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit6").children().eq(0).val("");
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit1").css('border-bottom', '2px solid black');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit2").css('border-bottom', '2px solid #F2F2F2');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit3").css('border-bottom', '2px solid #F2F2F2');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit4").css('border-bottom', '2px solid #F2F2F2');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit5").css('border-bottom', '2px solid #F2F2F2');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit6").css('border-bottom', '2px solid #F2F2F2');
                    this.signInWithPhoneNumber();
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#input").parent().css('border-bottom', '2px solid red');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#input").focus();
                }
                break;
            //Go to enter your name email
            case "6-digit":
                if (__WEBPACK_IMPORTED_MODULE_3_jquery__("#digit1").children().eq(0).val().length == 1 &&
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit2").children().eq(0).val().length == 1 &&
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit3").children().eq(0).val().length == 1 &&
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit4").children().eq(0).val().length == 1 &&
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit5").children().eq(0).val().length == 1 &&
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit6").children().eq(0).val().length == 1) {
                    this.confirmSmsCode();
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit1").css('border-bottom', '2px solid red');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit2").css('border-bottom', '2px solid red');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit3").css('border-bottom', '2px solid red');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit4").css('border-bottom', '2px solid red');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit5").css('border-bottom', '2px solid red');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit6").css('border-bottom', '2px solid red');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit1").children().eq(0).val().length == 0 ? __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit1").children().eq(0).focus() :
                        (__WEBPACK_IMPORTED_MODULE_3_jquery__("#digit2").children().eq(0).val().length == 0 ? __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit2").children().eq(0).focus() :
                            (__WEBPACK_IMPORTED_MODULE_3_jquery__("#digit3").children().eq(0).val().length == 0 ? __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit3").children().eq(0).focus() :
                                (__WEBPACK_IMPORTED_MODULE_3_jquery__("#digit4").children().eq(0).val().length == 0 ? __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit4").children().eq(0).focus() :
                                    (__WEBPACK_IMPORTED_MODULE_3_jquery__("#digit5").children().eq(0).val().length == 0 ? __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit5").children().eq(0).focus() :
                                        (__WEBPACK_IMPORTED_MODULE_3_jquery__("#digit6").children().eq(0).val().length == 0 ? __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit6").children().eq(0).focus() : null)))));
                }
                break;
            //Go to enter your name password
            case "email":
                var email = __WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput").children().eq(0).val();
                if (email.length > 0 && email.indexOf("@") != -1 && email.indexOf(".") != -1) {
                    this.currentView = "password";
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput").css('border-bottom', '2px solid black');
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordTitle"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#emailTitle"), "-200vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput"), "-200vw", "0px");
                    setTimeout(() => { __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput").children().eq(0).focus(); }, 1000);
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput").css('border-bottom', '2px solid red');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput").children().eq(0).focus();
                }
                break;
            //Go to enter your name view
            case "password":
                var password = __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput").children().eq(0).val();
                if (password.length >= 5) {
                    this.currentView = "name";
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#firstName").css('border-bottom', '2px solid black');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#lastName").css('border-bottom', '2px solid #F2F2F2');
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameTitle"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordTitle"), "-200vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameInput"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput"), "-200vw", "0px");
                    setTimeout(() => { __WEBPACK_IMPORTED_MODULE_3_jquery__("#firstName").children().eq(0).focus(); }, 1000);
                    this.linkWithEmailAuth();
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput").css('border-bottom', '2px solid red');
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput").children().eq(0).focus();
                }
                break;
            //Go to enter select payment method
            case "name":
                var firstName = __WEBPACK_IMPORTED_MODULE_3_jquery__("#firstName").children().eq(0).val();
                var lastName = __WEBPACK_IMPORTED_MODULE_3_jquery__("#lastName").children().eq(0).val();
                if (firstName.length > 0 && lastName.length > 0) {
                    this.currentView = "paymentMethod";
                    __WEBPACK_IMPORTED_MODULE_3_jquery__("#nextBtn").hide();
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#paymentTitle"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameTitle"), "-200vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#paymentList"), "-100vw", "0px");
                    this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#nameInput"), "-200vw", "0px");
                    this.createNewUser();
                }
                else {
                    if (firstName.length == 0) {
                        __WEBPACK_IMPORTED_MODULE_3_jquery__("#firstName").css('border-bottom', '2px solid red');
                        __WEBPACK_IMPORTED_MODULE_3_jquery__("#firstName").children().eq(0).focus();
                    }
                    if (lastName.length == 0) {
                        __WEBPACK_IMPORTED_MODULE_3_jquery__("#lastName").css('border-bottom', '2px solid red');
                        __WEBPACK_IMPORTED_MODULE_3_jquery__("#lastName").children().eq(0).focus();
                    }
                }
                break;
            //Go to credit card form
            case "paymentMethod":
                this.currentView = "creditCardForm";
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#cardName").css('border-bottom', '2px solid black');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#cardNumber").css('border-bottom', '2px solid #F2F2F2');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#expirationDate").css('border-bottom', '2px solid #F2F2F2');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#cvv").css('border-bottom', '2px solid #F2F2F2');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#country").css('border-bottom', '2px solid #F2F2F2');
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#postalCode").css('border-bottom', '2px solid #F2F2F2');
                this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#creditCardTitle"), "-100vw", "0px");
                this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#paymentTitle"), "-200vw", "0px");
                this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#creditCartInputs"), "-100vw", "0px");
                this.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#paymentList"), "-200vw", "0px");
                setTimeout(() => { __WEBPACK_IMPORTED_MODULE_3_jquery__("#cardName").children().eq(0).focus(); }, 1000);
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
    Function: signInWithPhoneNumber
    Description: Sign in user with his phone number
    Parameters: none
    Return: void
    *****************************************************************************/
    signInWithPhoneNumber() {
        //const appVerifier = this.recaptchaVerifier;
        const appVerifier = new __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth.RecaptchaVerifier('nextBtn', { 'size': 'invisible' });
        var value = __WEBPACK_IMPORTED_MODULE_3_jquery__("#input").val();
        const phoneNumberString = "+1" + value.substring(1, 4) + value.substring(6, 9) + value.substring(10, 14);
        __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
            .then(confirmationResult => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            this.smsConfirmation = confirmationResult;
        })
            .catch(function (error) {
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
            confirmationCode += __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit" + i).children().eq(0).val();
        }
        let controller = this;
        this.smsConfirmation.confirm(confirmationCode)
            .then(function (result) {
            // User signed in successfully.
            if (result.user) {
                controller.gotohome();
            }
            else {
                controller.currentView = "email";
                __WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput").css('border-bottom', '2px solid black');
                controller.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#emailTitle"), "-100vw", "0px");
                controller.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#digitTitle"), "-200vw", "0px");
                controller.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput"), "-100vw", "0px");
                controller.translate(__WEBPACK_IMPORTED_MODULE_3_jquery__("#digitBloc"), "-200vw", "0px");
                setTimeout(() => { __WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput").children().eq(0).focus(); }, 1000);
            }
        }).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit1").css('border-bottom', '2px solid red');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit2").css('border-bottom', '2px solid red');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit3").css('border-bottom', '2px solid red');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit4").css('border-bottom', '2px solid red');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit5").css('border-bottom', '2px solid red');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit6").css('border-bottom', '2px solid red');
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#digit6").children().eq(0).focus();
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
        var users = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('Users/');
        var userId = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser.uid;
        users.child(userId).set({
            UserId: userId,
            Date: Date(),
            firstName: __WEBPACK_IMPORTED_MODULE_3_jquery__("#firstName").children().eq(0).val(),
            lastName: __WEBPACK_IMPORTED_MODULE_3_jquery__("#lastName").children().eq(0).val()
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
    Function: loginUser
    Purpose: Validate the entries and logs the user in.
    Parameters: None
    Return: None
    *****************************************************************************/
    /*loginUser() {
      var email = "";
      var password = "";
      if (email.length == 0 || password.length == 0) {
        this.showAlert('Authentification Impossible !', 'Veuillez remplir tous les champs.')
      } else {
        this.logoutUser();
        let loginController = this;
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function (data) {
          if (loginController.isLoggedIn()) loginController.gotohome();
        }).catch(function (error) {
          loginController.showAlert('Authentification Impossible !', error.toString().substring(7, error.toString().length));
        });
      }
    }*/
    /*****************************************************************************
    Function:   Function: presentAlert
    Description: Link user phone auth with email auth
    Also displays warning registration messages
    Parameters: None
    Return: None
    *****************************************************************************/
    linkWithEmailAuth() {
        var email = __WEBPACK_IMPORTED_MODULE_3_jquery__("#emailInput").children().eq(0).val();
        var password = __WEBPACK_IMPORTED_MODULE_3_jquery__("#passwordInput").children().eq(0).val();
        if (email.length == 0 || password.length == 0) {
        }
        else {
            let loginController = this;
            var credential = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth.EmailAuthProvider.credential(email, password);
            __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser.linkWithCredential(credential).then(function (user) {
                console.log("Account linking success", user);
            }, function (error) {
                console.log("Account linking error", error);
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
            __WEBPACK_IMPORTED_MODULE_3_jquery__(".header-img").height("65vh");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#link").height("7.5vh");
        }
        else {
            __WEBPACK_IMPORTED_MODULE_3_jquery__(".header-img").height("63vh");
            __WEBPACK_IMPORTED_MODULE_3_jquery__("#link").height("7.5vh");
        }
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
        selector: 'page-phone-number',template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/phone-number/phone-number.html"*/'<!--\n  Generated template for the Phone Number auth page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div no-bounce ion-fixed class="content" style="margin:0; padding:0">\n  <div id="recaptcha-container"></div>\n  <!-- Header image -->\n  <ion-row id="headerImg" class="header-img">\n\n    <img src="assets/img/bg23.jpg" class="img"/>\n\n  </ion-row>\n\n  <!--body of page !-->\n  <ion-row id="main" class="main">\n    <!-- Title -->\n    <ion-row class="backbtn hidden" id="backBtn">\n      <ion-icon (click)="goBack()" style="font-size: 12vw; color: black;padding:0;margin:0" name="ios-arrow-round-back"></ion-icon>\n    </ion-row>\n\n    <!-- Title -->\n    <ion-row class="title" id="title">\n      <div>Coiffez vous avec Barber Me</div>\n    </ion-row>\n\n    <!-- Input for phone number -->\n    <ion-row id="inputBloc" class="phoneNumber">\n      <span class="flag-icon flag-icon-ca" style="font-size: 5vw; margin-right:1vw;"></span>\n      <ion-icon name="md-arrow-dropdown" style="color: gray; margin: auto; padding: auto;"></ion-icon>\n      <span style="font-size: 19px; font-family: Verdana, Geneva, sans-serif; margin: auto; padding: auto;">+1</span>\n      <input maxlength="14" id="input" (focus)="enterYourPhone()" (keydown)="onKeyPress(e)" class="input" [(ngModel)]="phoneNumber" type="tel" placeholder="Numéro de téléphone">\n    </ion-row>\n\n    <!-- Enter 4 digit -->\n    <ion-row class="digitTitle" id="digitTitle">\n      <div>Entrez le code à 4 chiffres qui vous a été envoyé à </div>\n    </ion-row>\n\n    <!-- Input for phone number -->\n    <ion-row id="digitBloc" class="digitBloc">\n      <ion-grid>\n        <ion-row>\n          <ion-col id="digit1" col-1 style="margin-right:10px; padding-left:0;padding-right:0">\n            <input maxlength="1" size="1" class="input" type="password" placeholder="" style="padding:auto; margin: auto; font-size: 20px;" pattern="[0-9]*" inputmode="numeric">\n          </ion-col>\n          <ion-col id="digit2" col-1 style="margin-right:10px; padding-left:0;padding-right:0">\n            <input maxlength="1" size="1" class="input" type="password" placeholder="" style="padding:auto; margin: auto; font-size: 20px;" pattern="[0-9]*" inputmode="numeric">\n          </ion-col>\n          <ion-col id="digit3" col-1 style="margin-right:10px; padding-left:0;padding-right:0">\n            <input maxlength="1" size="1" class="input" type="password" placeholder="" style="padding:auto; margin: auto; font-size: 20px;" pattern="[0-9]*" inputmode="numeric">\n          </ion-col>\n          <ion-col id="digit4" col-1 style="margin-right:10px; padding-left:0;padding-right:0">\n            <input maxlength="1" size="1" class="input" type="password" placeholder="" style="padding:auto; margin: auto; font-size: 20px;" pattern="[0-9]*" inputmode="numeric">\n          </ion-col>\n          <ion-col id="digit5" col-1 style="margin-right:10px; padding-left:0;padding-right:0">\n            <input maxlength="1" size="1" class="input" type="password" placeholder="" style="padding:auto; margin: auto; font-size: 20px;" pattern="[0-9]*" inputmode="numeric">\n          </ion-col>\n          <ion-col id="digit6" col-1 style="margin-right:10px; padding-left:0;padding-right:0">\n            <input maxlength="1" size="1" class="input" type="password" placeholder="" style="padding:auto; margin: auto; font-size: 20px;" pattern="[0-9]*" inputmode="numeric">\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-row>\n\n    <!-- Enter your email -->\n    <ion-row class="digitTitle" id="emailTitle">\n      <div>Quelle est votre adresse e-mail ?</div>\n    </ion-row>\n\n    <!-- Input for email -->\n    <ion-row id="emailInput" class="inputBloc">\n      <input class="input" type="email" placeholder="example@mail.ca">\n    </ion-row>\n\n    <!-- Enter your password -->\n    <ion-row class="digitTitle" id="passwordTitle">\n      <div>Créez le mot de passe de votre compte</div>\n    </ion-row>\n\n    <!-- Input for password -->\n    <ion-row id="passwordInput" class="inputBloc">\n      <input class="input" type="password" placeholder="5 caractères minimum">\n    </ion-row>\n\n    <!-- Enter your name -->\n    <ion-row class="digitTitle" id="nameTitle">\n      <div>Comment vous appelez-vous ?</div>\n    </ion-row>\n\n    <!-- Input for name -->\n    <ion-row id="nameInput" class="inputBloc">\n      <ion-grid style="margin:0; padding:0">\n        <ion-row style="margin:0; padding:0">\n          <ion-col id="firstName" col-5 style="margin-left:0px">\n            <input class="nameInput" type="text" placeholder="Prénom">\n          </ion-col>\n\n          <ion-col id="lastName" col-5 style="margin-left:10px">\n            <input (focus)="onFocus(\'lastName\')" class="nameInput" type="text" placeholder="Nom">\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-row>\n\n    <!-- Select your payment method -->\n    <ion-row class="digitTitle" id="paymentTitle">\n      <div>Sélectionnez votre moyen de paiement préféré</div>\n    </ion-row>\n\n    <!-- List of payment methods -->\n    <ion-list (click)="selectCreditCard()" id="paymentList" class="digitBloc" style="padding:0; margin-top: 50px">\n      <ion-item (click)="selectCreditCard()" style="padding:0">\n        <ion-icon name="card" style="margin-left:7vw; margin-right:5vw"></ion-icon>\n          Carte de crédit\n        <ion-icon name="arrow-forward" style="position:absolute; right:5vw"></ion-icon>\n      </ion-item>\n    </ion-list>\n\n    <!-- Enter your credit card -->\n    <ion-row class="digitTitle" id="creditCardTitle" style="top: 10%">\n      <div>Ajouter la carte</div>\n    </ion-row>\n\n    <!-- Inputs for credit card -->\n    <ion-row id="creditCartInputs" class="digitBloc" style="top: 15%; padding-right: 3vw">\n      <!-- Credit card name -->\n      <!--ion-row><ion-label color="#F2F2F2" stacked></ion-label></ion-row!-->\n      <ion-row id="cardName" style="padding:auto; margin:auto; margin-left:0; margin-top:30px">\n        <ion-icon style="font-size:8vw; margin-right: 15px" name="contact"></ion-icon>\n        <input class="input" type="text" placeholder="Nom sur la carte">\n      </ion-row>\n\n      <!-- Credit card number -->\n      <!--ion-row style="margin-top: 50px"><ion-label color="#F2F2F2" stacked></ion-label></ion-row!-->\n      <ion-row id="cardNumber" style="padding:auto; margin:auto; margin-left:0; margin-top: 50px">\n        <ion-icon name="card" style="font-size:8vw; margin-right: 15px"></ion-icon>\n        <input maxlength="16" class="input" type="tel" style="width:85%" placeholder="Numéro de carte">\n      </ion-row>\n\n      <!-- Exp date / CVV -->\n      <ion-grid style="margin:0; margin-top:50px; padding:0">\n        <ion-row style="margin:0; padding:0">\n          <ion-col id="expirationDate" col-6 style="margin-left:0px; padding-left:0">\n            <input class="nameInput" style="width:100%" type="text" placeholder="Date d\'exp.">\n          </ion-col>\n\n          <ion-col id="cvv" col-5 style="margin-left:10px">\n            <input class="nameInput" style="width:100%" type="text" placeholder="CVV">\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n      <!-- country -->\n      <ion-label color="#F2F2F2" style="width: 100vw; margin-top: 40px" stacked>Pays</ion-label>\n      <ion-row id="country" style="padding:0; margin:0; margin-right: 5vw; width: 100vw">\n        <span class="flag-icon flag-icon-ca" style="font-size: 5vw; margin-right:2vw;"></span>\n        <div style="font-size: 5vw; font-family: Verdana, Geneva, sans-serif; margin: auto; padding: auto; width: 55vw">Canada</div>\n        <ion-icon name="md-arrow-dropdown" style="font-size:8vw; color: gray; margin: auto; padding: auto"></ion-icon>\n      </ion-row>\n\n      <!-- Postal Code -->\n      <ion-row id="postalCode" style="padding:auto; margin:auto; margin-left:0; margin-top:50px;">\n        <input maxlength="6" class="input" style="width:80vw; padding-left:0; margin-left:0; padding-bottom: 5px" type="text" placeholder="Code postal">\n      </ion-row>\n\n    </ion-row>\n\n  </ion-row>\n\n  <!-- Link to login page -->\n  <ion-row class="footer" id="link">\n    <span (click)="gotoLoginPage()" ion-text color="black" style="margin-top: auto; margin-bottom: auto;">Connecte toi avec ton adresse courriel</span>\n  </ion-row>\n\n  <button id="nextBtn" (click)="goToNext()" ion-button class="btn-circle btn-xl hidden"><ion-icon name="ios-arrow-round-forward" class="nextIcon"></ion-icon></button>\n\n</div>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/phone-number/phone-number.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], PhoneNumberPage);

//# sourceMappingURL=phone-number.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateSelectorDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GetAnAppointmentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GetAnAppointmentModel__ = __webpack_require__(853);
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
        (this.appointments.isAvailable(date, hour)) ? this.appointments.createNew(date, hour) : this.showAlert();
        this.disableBookedDays();
    }
    /*****************************************************************************
    Function: showAlert
    Purpose: Display a pop-up alert to notify user on reservation conflict
    Parameters: None
    Return: None
    *****************************************************************************/
    showAlert() {
        let alert = this.alertCtrl.create({
            title: 'Réservation impossible !',
            subTitle: 'Veuillez choisir une autre plage horaire.',
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
    //Disable all dates that are full booked
    disableBookedDays() {
        var daysBooked = this.appointments.getDaysBooked();
        for (var i = 0; i < daysBooked.length; i++) {
            this.disableDate(daysBooked[i]);
        }
    }
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
            if (directiveDate.isBefore(this.today, 'day')) {
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
        this.selectDate(this.currentDate);
        this.selectToday(this.today);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChildren */])(DateSelectorDirective),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* QueryList */])
], GetAnAppointmentPage.prototype, "dateSelectors", void 0);
GetAnAppointmentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'getanappointment',template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/getanappointment/getanappointment.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Mario Perfect Cut</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="light-bg">\n  <div class="getanappointment">\n    <div style="height:auto" class="cal-bg header-row">\n      <ion-row class="text-center input-row">\n        <ion-col width-100>\n          <div class="check-text">Choisissez le jour</div>\n        </ion-col>\n      </ion-row>\n\n      <ion-row class="text-center week-row">\n        <ion-col *ngFor="let weekName of weekNames" style="margin:0;padding:0">\n          <span>{{weekName}}</span>\n        </ion-col>\n      </ion-row>\n    </div>\n\n    <!-- ion-content contains the calendar months displayed in the view -->\n    <div style="height:100%; overflow-y: scroll; margin-left:0" class="month-list">\n      <ion-item *ngFor="let monthObj of months">\n        <ion-row class="month-row" >\n          <ion-col width-60 class="text-center">\n            {{monthObj.selectedMonth.format("MMM YYYY")}}\n          </ion-col>\n        </ion-row>\n\n        <div class="day-grid">\n          <ion-row class="text-center day-row" *ngFor="let week of monthObj.weeks; let rowIndex = index" >\n            <ion-col class="day-col" *ngFor="let day of week.days; let colIndex = index">\n\n                <button ion-button  *ngIf="day"  clear [datespan]="day.id" (click)="select(monthObj,day,rowIndex)">\n                  {{day.displayText}}\n                </button>\n\n            </ion-col>\n          </ion-row>\n        </div>\n      </ion-item>\n    </div>\n  </div>\n\n  <ion-row style="position: relative; margin-top:27.5%">\n    <ion-col col-3></ion-col>\n    <ion-col col-2>\n      <ion-row style="padding: 5px; cursor: pointer" (click)="increaseHour()">\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-up"></ion-icon>\n      </ion-row>\n      <ion-row>\n        <p style="padding: 5px; font-size: 20px; margin: auto">{{currentHour}}</p>\n      </ion-row>\n      <ion-row style="padding: 5px; cursor: pointer" (click)="decreaseHour()">\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-down"></ion-icon>\n      </ion-row>\n    </ion-col>\n\n    <ion-col col-2>\n      <ion-row style="padding: 5px; cursor: pointer">\n        <ion-icon color="bg-color" style="font-size: 25px; margin: auto" name="ios-arrow-up"></ion-icon>\n      </ion-row>\n      <ion-row>\n        <p style="padding: 5px; font-size: 20px; margin: auto">:</p>\n      </ion-row>\n      <ion-row style="padding: 5px; cursor: pointer">\n        <ion-icon color="bg-color" style="font-size: 25px; margin: auto" name="ios-arrow-down"></ion-icon>\n      </ion-row>\n    </ion-col>\n\n    <ion-col col-2>\n      <ion-row style="padding: 5px; cursor: pointer" (click)="changeMinutes()">\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-up"></ion-icon>\n      </ion-row>\n      <ion-row>\n        <p style="padding: 5px; font-size: 20px; margin: auto">{{currentMinutes}}</p>\n      </ion-row>\n      <ion-row style="padding: 5px; cursor: pointer" (click)="changeMinutes()">\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-down"></ion-icon>\n      </ion-row>\n    </ion-col>\n    <ion-col col-3></ion-col>\n  </ion-row>\n\n  <ion-row>\n    <p [ngClass] = "conflictMessageClasses">{{errorMessage}}</p>\n  </ion-row>\n\n  <div style="padding-left: 10%; padding-right: 10%;margin-top:1.5%">\n    <button ion-button class="round" full color="primary" (click)="getAppointment()">Réserver</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/getanappointment/getanappointment.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */]])
], GetAnAppointmentPage);

//# sourceMappingURL=getanappointment.js.map

/***/ }),

/***/ 527:
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
        selector: 'page-gallery',template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/gallery/gallery.html"*/'<!--\n  Generated template for the Gallerie page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Galerie photos</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <div padding margin-top>\n    <ion-badge class="square center"  color="primary">Voir plus de photo</ion-badge>\n    <div class="clear"></div>\n  </div>\n\n  <!--list of pictures-->\n  <ion-grid class="list-hotels">\n    <ion-row>\n      <ion-col *ngFor="let picture of pictures[0].viewMoreGalery" col-6>\n        <div class="hotel-bg" [ngStyle]="{\'background-image\': \'url(\' + picture + \')\'}">\n          <div class="bg-filter">\n\n\n          </div>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/gallery/gallery.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_gallery_service__["a" /* GalleryService */]])
], GalleryPage);

//# sourceMappingURL=gallery.js.map

/***/ }),

/***/ 528:
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
        this.ticket = new __WEBPACK_IMPORTED_MODULE_3__get_a_ticket_get_a_ticket__["a" /* GetaTicketPage */];
    }
    /*****************************************************************************
    Function: presentAlert
    Description: This function display a warning on pop-up
    Parameters: None
    Return: None
    *****************************************************************************/
    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Payment Confirmation',
            message: 'You will be charged 3$ on you credit card !',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: data => {
                        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__ticket_confirmation_ticket_confirmation__["a" /* TicketConfirmationPage */]);
                        this.ticket.makeTransaction();
                    }
                }
            ]
        });
        alert.present();
    }
};
Alert = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-alert',template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/alert/alert.html"*/'<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>Title</title>\n</head>\n<body>\n\n</body>\n</html>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/alert/alert.html"*/
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_index__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */]])
], Alert);

//# sourceMappingURL=alert.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarberLocation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_barber_service__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pricing_pricing__ = __webpack_require__(532);
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
        selector: 'page-barber-location',template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/barber-location/barber-location.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Contactez Mario Perfect Cut</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class=" light-bg">\n\n  <!-- Show map here -->\n  <div style="height: 40vh;" id="map-detail"></div>\n\n\n\n\n  <!--services-->\n  <ion-grid style="height: 10vh;" class="border-bottom">\n    <ion-row>\n      <ion-col col-1 text-left>\n        <ion-icon style="padding-top: 16px" class="text-2x" name="pin"  color="dark"></ion-icon>\n      </ion-col>\n      <ion-col col-11 text-left>\n        <span class="service-name" style="font-size: 15px;font-weight: bold;padding-top: 22px" ion-text color="dark">1536 Boulevard Curé-Labelle #185</span>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <!--services-->\n  <ion-grid style="height: 10vh;" class="border-bottom">\n    <ion-row>\n      <ion-col col-1 text-left>\n        <ion-icon style="padding-top: 20px" class="text-2x" name="globe"  color="dark"></ion-icon>\n      </ion-col>\n      <ion-col col-11 text-left>\n        <a href="http://www.marioperfectcutbarbershop.com/" class="service-name" style="font-size: 15px;font-weight: bold;padding-top: 20px" ion-text color="dark">marioperfectcutbarbershop.com</a>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <!--services-->\n  <ion-grid  style="height: 10vh;" class="border-bottom">\n    <ion-row>\n      <ion-col col-1 text-left>\n        <ion-icon style="padding-top: 20px" class="text-2x" name="call"  color="dark"></ion-icon>\n      </ion-col>\n      <ion-col col-11 text-left>\n        <a href="tel:514-996-4730" class="service-name" style="font-size: 15px;font-weight: bold;padding-top: 22px" ion-text color="dark">514-996-4730</a>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <!--services-->\n  <ion-grid  style="height: 10vh;" class="border-bottom">\n    <ion-row>\n      <ion-col col-1 text-left>\n        <ion-icon style="padding-top: 20px" class="" name="mail"  color="dark"></ion-icon>\n      </ion-col>\n      <ion-col col-11 text-left>\n        <a href="mailto:marioperfectcutbarbershop@gmail.com" class="service-name" style="font-size: 15px;font-weight: bold;padding-top: 20px" ion-text color="dark">marioperfectcutbarbershop@gmail.com</a>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <!--services-->\n  <ion-grid  style="height: 10vh;" class="border-bottom">\n    <ion-row>\n      <ion-col col-1 text-left>\n        <ion-icon style="padding-top: 18px" class="text-2x" name="logo-instagram"  color="dark"></ion-icon>\n      </ion-col>\n      <ion-col col-11 text-left>\n        <a href="http://www.instagram.com/marioperfectcut" class="service-name" style="font-size: 15px;font-weight: bold;padding-top: 22px" ion-text color="dark">instagram.com/marioperfectcut</a>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <!--services-->\n  <ion-grid  style="height: 10vh;" class="border-bottom">\n    <ion-row>\n      <ion-col col-1 text-left>\n        <ion-icon style="padding-top: 18px" class="text-2x" name="logo-facebook"  color="dark"></ion-icon>\n      </ion-col>\n      <ion-col col-11 text-left>\n        <a href="http://www.facebook.com/MarioPerfectCutBarberShop" class="service-name" style="font-size: 15px;font-weight: bold;padding-top: 22px" ion-text color="dark">facebook.com/MarioPerfectCutBarberShop</a>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/barber-location/barber-location.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_barber_service__["a" /* BarberService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_barber_service__["a" /* BarberService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */]) === "function" && _c || Object])
], BarberLocation);

var _a, _b, _c;
//# sourceMappingURL=barber-location.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarberService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_barbers__ = __webpack_require__(881);
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

/***/ 532:
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
        selector: 'page-pricing',template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/pricing/pricing.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Panier</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="pricing common-bg">\n  <div class="card round">\n    <div class="hotel-bg" [ngStyle]="{\'background-image\': \'url(\' + picture.thumb + \')\'}">\n      <div class="bg-filter" text-center>\n        <div>\n          <h5 ion-text color="light" no-margin>Mario Perfect Cut</h5>\n          <span ion-text color="light">{{ dateFrom | date: \'MMM dd, yyyy\'}} - {{ dateTo | date: \'MMM dd, yyyy\'}}</span>\n          <div margin-top>\n            <span ion-text color="light">1536 Bd Curé Labelle, Chomedey QC H7V 2W2</span>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class="border-bottom" padding>\n      <h5 no-margin>Frais de reservation.</h5>\n      <span ion-text color="dark">5$</span>\n    </div>\n\n    <!--total price-->\n    <div padding>\n      <h4 class="pull-left" no-margin>Total</h4>\n      <h4 class="pull-right" ion-text color="primary" no-margin>25$</h4>\n      <div class="clear"></div>\n    </div>\n  </div>\n\n  <!--more info-->\n  <div class="card round" margin-top>\n    <ion-item class="no-border">\n      <ion-icon name="contact" item-left color="dark"></ion-icon>\n      <div>\n        <span class="bold" ion-text color="dark">KOUENI REPLACE THIS WITH CALENDAR</span>\n        <br/>\n        <span ion-text color="dark">Enter your information</span>\n      </div>\n    </ion-item>\n  </div>\n\n  <!--payment info-->\n  <div class="card round" margin-top>\n    <ion-item class="no-border">\n      <ion-icon name="ios-card" item-left color="dark"></ion-icon>\n      <div>\n        <span class="bold" ion-text color="dark">Mode de payment</span>\n        <br/>\n        <span ion-text color="dark">Carte de credit</span>\n      </div>\n    </ion-item>\n  </div>\n\n  <!--submit button-->\n  <button ion-button class="round" color="primary" margin-top full (click)="send()">COMPLETER</button>\n</ion-content>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/pricing/pricing.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_gallery_service__["a" /* GalleryService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */]])
], PricingPage);

//# sourceMappingURL=pricing.js.map

/***/ }),

/***/ 533:
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
        selector: 'page-settings',template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/settings/settings.html"*/'<!--\n  Generated template for the Settings page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="no-shadow">\n\n  <ion-navbar class="no-border" color="primary">\n    <ion-title>PARAMÈTRES</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="common-bg">\n  <!--top information-->\n  <div class="top-info" padding>\n    <div padding-top>\n      <h5 ion-text color="white">John Doe</h5>\n      <span ion-text color="white">johndoe@mail.com</span>\n    </div>\n  </div>\n\n  <!--user settings-->\n    <ion-item-group style="margin-top: 10px">\n      <ion-item-divider color="bg-color">Notifications</ion-item-divider>\n      <ion-item>\n        <ion-label>Notification push</ion-label>\n        <ion-toggle color="primary" checked="true"></ion-toggle>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Notification par courriel</ion-label>\n        <ion-toggle color="primary" checked="true"></ion-toggle>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Notification par SMS</ion-label>\n        <ion-toggle color="primary" checked="true"></ion-toggle>\n      </ion-item>\n    </ion-item-group>\n\n\n    <ion-item-group style="margin-top: 10px">\n      <ion-item-divider color="bg-color">Informations légales</ion-item-divider>\n        <ion-list>\n          <button ion-item>Termes et conditions</button>\n        </ion-list>\n      <ion-item-divider color="bg-color"></ion-item-divider>\n    </ion-item-group>\n\n    <!--sign out button-->\n    <div style="padding-left: 10%; padding-right: 10%">\n      <button ion-button class="round" color="orange" full (click)="logout()">SE DECONNECTER</button>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/settings/settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 534:
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
        selector: 'page-create-user',template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/create-user/create-user.html"*/'<!--\n  Generated template for the Create User page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding class="login common-bg auth-page">\n  <div class="login-content">\n\n    <!-- Logo -->\n    <div padding text-center>\n      <!--\n      <div class="logo activity-bg">\n        <ion-icon name="md-calendar" color="light"></ion-icon>\n      </div> -->\n      <h2 ion-text color="light">\n        Mario Perfect Cut\n      </h2>\n    </div>\n\n    <!-- Login form -->\n    <div class="list-form" padding>\n\n      <ion-item>\n        <ion-label stacked>Email</ion-label>\n        <ion-input [(ngModel)]="email" type="text" color="white"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>Password</ion-label>\n        <ion-input [(ngModel)]="password" type="password"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>Confirm Password</ion-label>\n        <ion-input [(ngModel)]="confirmationPassword" type="password"></ion-input>\n      </ion-item>\n\n    </div>\n\n    <br />\n    <div>\n      <button ion-button block color="primary" (click)="createUser()">\n        S\'INSCRIRE\n      </button>\n    </div>\n\n    <div text-center margin-top>\n      <span ion-text color="light" (click)="gotoLoginPage()">Déjà Inscrit? Connecte toi !</span>\n    </div>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/create-user/create-user.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], CreateUserPage);

//# sourceMappingURL=create-user.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(542);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_gallery_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_barber_service__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_pricing_pricing__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_barber_location_barber_location__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_get_a_ticket_get_a_ticket__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_ticket_confirmation_ticket_confirmation__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_create_user_create_user__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_phone_number_phone_number__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_gallery_gallery__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_settings_settings__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_getanappointment_getanappointment__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_alert_alert__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_keyboard__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_sms__ = __webpack_require__(885);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















//import { Facebook } from '@ionic-native/facebook';





// import services
// end import services
// end import services
// import pages
// end import pages
const components = [__WEBPACK_IMPORTED_MODULE_16__pages_getanappointment_getanappointment__["b" /* GetAnAppointmentPage */]];
const directives = [__WEBPACK_IMPORTED_MODULE_16__pages_getanappointment_getanappointment__["a" /* DateSelectorDirective */]];
const providers = [];
let AppModule = class AppModule {
    constructor() {
        __WEBPACK_IMPORTED_MODULE_18_firebase__["initializeApp"]({
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
            __WEBPACK_IMPORTED_MODULE_17__pages_alert_alert__["a" /* Alert */],
            __WEBPACK_IMPORTED_MODULE_12__pages_create_user_create_user__["a" /* CreateUserPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_phone_number_phone_number__["a" /* PhoneNumberPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
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
            __WEBPACK_IMPORTED_MODULE_17__pages_alert_alert__["a" /* Alert */],
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
            __WEBPACK_IMPORTED_MODULE_17__pages_alert_alert__["a" /* Alert */],
            __WEBPACK_IMPORTED_MODULE_12__pages_create_user_create_user__["a" /* CreateUserPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_phone_number_phone_number__["a" /* PhoneNumberPage */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_sms__["a" /* SMS */],
            //Facebook,
            providers,
        ]
    }),
    __metadata("design:paramtypes", [])
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_phone_number_phone_number__ = __webpack_require__(399);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/app/app.html"*/'<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/app/app.html"*/,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getanappointment_getanappointment__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gallery_gallery__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__get_a_ticket_get_a_ticket__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__barber_location_barber_location__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__settings_settings__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
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
    constructor(nav, galleryService) {
        this.nav = nav;
        this.galleryService = galleryService;
        this.numberClientWaitingTicketList = 0;
        this.numberClientWaitingReservation = 0;
        // set sample data
        this.pictures = galleryService.getAll();
        this.ClientWaiting();
        this.TotalReservation();
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
};
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/home/home.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="no-shadow">\n\n  <ion-navbar class="no-border" color="primary">\n    <ion-title>ACCUEIL</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="goToSettings()">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content class=" common-bg">\n  <!--list menu on the top-->\n  <div class="top-menu common-bg">\n    <ion-grid class="card">\n      <ion-row>\n        <ion-col (click)="getTicket()">\n          <ion-icon name="md-pricetag" color="green"></ion-icon>\n          <span ion-text color="dark">Prendre un ticket</span>\n        </ion-col>\n        <ion-col (click)="getAnAppointment()">\n          <ion-icon name="md-calendar" color="flight-color"></ion-icon>\n          <span ion-text color="dark">Prendre un rendez vous</span>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n\n  <ion-grid class="card">\n    <ion-row>\n      <ion-col>\n        <ion-badge class="center square" color="primary" (click)="goToBarberLocation()">Contacts</ion-badge>\n      </ion-col>\n      <ion-col  >\n        <ion-badge class="center square" color="primary" (click)="viewGallery()">Gallery photo</ion-badge>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid style="margin-bottom:5%;margin-top:5%;" class="card" >\n    <ion-row>\n      <ion-col text-center style="padding-top: 20px;" col-12>\n        <ion-row>\n        <ion-icon name="people" style ="font-size: 50px;margin:0 auto;" color="flight-color"></ion-icon>\n        </ion-row>\n        <ion-row>\n        <span text-center ion-text color="dark" style="font-size: 30px;margin:0 auto;">Nombre de client en attente</span>\n        </ion-row>\n        <ion-row>\n        <span ion-text color="dark" style="font-weight: bold;font-size: 30px;margin:0 auto;">{{numberClientWaitingTicketList}}</span>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid text-center class="card">\n    <ion-row center>\n      <ion-col center style="padding-top: 20px;align-content: center;" col-12>\n        <ion-row center>\n          <ion-icon  style ="font-size: 50px;margin:0 auto;" name="people" color="flight-color"></ion-icon>\n        </ion-row>\n        <ion-row center>\n          <span ion-text color="dark" style="font-size: 30px;margin:0 auto;">Nombre de reservation en attente</span>\n        </ion-row>\n        <ion-row center>\n          <span ion-text color="dark" style="font-weight: bold;font-size: 30px;margin:0 auto;">{{numberClientWaitingReservation}}</span>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_gallery_service__["a" /* GalleryService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_pictures__ = __webpack_require__(850);
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

/***/ 850:
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

/***/ 852:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 401,
	"./af.js": 401,
	"./ar": 402,
	"./ar-dz": 403,
	"./ar-dz.js": 403,
	"./ar-kw": 404,
	"./ar-kw.js": 404,
	"./ar-ly": 405,
	"./ar-ly.js": 405,
	"./ar-ma": 406,
	"./ar-ma.js": 406,
	"./ar-sa": 407,
	"./ar-sa.js": 407,
	"./ar-tn": 408,
	"./ar-tn.js": 408,
	"./ar.js": 402,
	"./az": 409,
	"./az.js": 409,
	"./be": 410,
	"./be.js": 410,
	"./bg": 411,
	"./bg.js": 411,
	"./bn": 412,
	"./bn.js": 412,
	"./bo": 413,
	"./bo.js": 413,
	"./br": 414,
	"./br.js": 414,
	"./bs": 415,
	"./bs.js": 415,
	"./ca": 416,
	"./ca.js": 416,
	"./cs": 417,
	"./cs.js": 417,
	"./cv": 418,
	"./cv.js": 418,
	"./cy": 419,
	"./cy.js": 419,
	"./da": 420,
	"./da.js": 420,
	"./de": 421,
	"./de-at": 422,
	"./de-at.js": 422,
	"./de-ch": 423,
	"./de-ch.js": 423,
	"./de.js": 421,
	"./dv": 424,
	"./dv.js": 424,
	"./el": 425,
	"./el.js": 425,
	"./en-au": 426,
	"./en-au.js": 426,
	"./en-ca": 427,
	"./en-ca.js": 427,
	"./en-gb": 428,
	"./en-gb.js": 428,
	"./en-ie": 429,
	"./en-ie.js": 429,
	"./en-nz": 430,
	"./en-nz.js": 430,
	"./eo": 431,
	"./eo.js": 431,
	"./es": 432,
	"./es-do": 433,
	"./es-do.js": 433,
	"./es.js": 432,
	"./et": 434,
	"./et.js": 434,
	"./eu": 435,
	"./eu.js": 435,
	"./fa": 436,
	"./fa.js": 436,
	"./fi": 437,
	"./fi.js": 437,
	"./fo": 438,
	"./fo.js": 438,
	"./fr": 439,
	"./fr-ca": 440,
	"./fr-ca.js": 440,
	"./fr-ch": 441,
	"./fr-ch.js": 441,
	"./fr.js": 439,
	"./fy": 442,
	"./fy.js": 442,
	"./gd": 443,
	"./gd.js": 443,
	"./gl": 444,
	"./gl.js": 444,
	"./gom-latn": 445,
	"./gom-latn.js": 445,
	"./he": 446,
	"./he.js": 446,
	"./hi": 447,
	"./hi.js": 447,
	"./hr": 448,
	"./hr.js": 448,
	"./hu": 449,
	"./hu.js": 449,
	"./hy-am": 450,
	"./hy-am.js": 450,
	"./id": 451,
	"./id.js": 451,
	"./is": 452,
	"./is.js": 452,
	"./it": 453,
	"./it.js": 453,
	"./ja": 454,
	"./ja.js": 454,
	"./jv": 455,
	"./jv.js": 455,
	"./ka": 456,
	"./ka.js": 456,
	"./kk": 457,
	"./kk.js": 457,
	"./km": 458,
	"./km.js": 458,
	"./kn": 459,
	"./kn.js": 459,
	"./ko": 460,
	"./ko.js": 460,
	"./ky": 461,
	"./ky.js": 461,
	"./lb": 462,
	"./lb.js": 462,
	"./lo": 463,
	"./lo.js": 463,
	"./lt": 464,
	"./lt.js": 464,
	"./lv": 465,
	"./lv.js": 465,
	"./me": 466,
	"./me.js": 466,
	"./mi": 467,
	"./mi.js": 467,
	"./mk": 468,
	"./mk.js": 468,
	"./ml": 469,
	"./ml.js": 469,
	"./mr": 470,
	"./mr.js": 470,
	"./ms": 471,
	"./ms-my": 472,
	"./ms-my.js": 472,
	"./ms.js": 471,
	"./my": 473,
	"./my.js": 473,
	"./nb": 474,
	"./nb.js": 474,
	"./ne": 475,
	"./ne.js": 475,
	"./nl": 476,
	"./nl-be": 477,
	"./nl-be.js": 477,
	"./nl.js": 476,
	"./nn": 478,
	"./nn.js": 478,
	"./pa-in": 479,
	"./pa-in.js": 479,
	"./pl": 480,
	"./pl.js": 480,
	"./pt": 481,
	"./pt-br": 482,
	"./pt-br.js": 482,
	"./pt.js": 481,
	"./ro": 483,
	"./ro.js": 483,
	"./ru": 484,
	"./ru.js": 484,
	"./sd": 485,
	"./sd.js": 485,
	"./se": 486,
	"./se.js": 486,
	"./si": 487,
	"./si.js": 487,
	"./sk": 488,
	"./sk.js": 488,
	"./sl": 489,
	"./sl.js": 489,
	"./sq": 490,
	"./sq.js": 490,
	"./sr": 491,
	"./sr-cyrl": 492,
	"./sr-cyrl.js": 492,
	"./sr.js": 491,
	"./ss": 493,
	"./ss.js": 493,
	"./sv": 494,
	"./sv.js": 494,
	"./sw": 495,
	"./sw.js": 495,
	"./ta": 496,
	"./ta.js": 496,
	"./te": 497,
	"./te.js": 497,
	"./tet": 498,
	"./tet.js": 498,
	"./th": 499,
	"./th.js": 499,
	"./tl-ph": 500,
	"./tl-ph.js": 500,
	"./tlh": 501,
	"./tlh.js": 501,
	"./tr": 502,
	"./tr.js": 502,
	"./tzl": 503,
	"./tzl.js": 503,
	"./tzm": 504,
	"./tzm-latn": 505,
	"./tzm-latn.js": 505,
	"./tzm.js": 504,
	"./uk": 506,
	"./uk.js": 506,
	"./ur": 507,
	"./ur.js": 507,
	"./uz": 508,
	"./uz-latn": 509,
	"./uz-latn.js": 509,
	"./uz.js": 508,
	"./vi": 510,
	"./vi.js": 510,
	"./x-pseudo": 511,
	"./x-pseudo.js": 511,
	"./yo": 512,
	"./yo.js": 512,
	"./zh-cn": 513,
	"./zh-cn.js": 513,
	"./zh-hk": 514,
	"./zh-hk.js": 514,
	"./zh-tw": 515,
	"./zh-tw.js": 515
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
webpackContext.id = 852;

/***/ }),

/***/ 853:
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
        this.updateDataSnapshot();
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
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('Appointments/')
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
                console.log(this.businessHours[index]);
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
        appointments.child(timeStamp).set({
            UserId: userId,
            Date: date,
            Hour: hour,
            firstName: "Koueni",
            lastName: "Deumeni"
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/getanappointment/getanappointment.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Mario Perfect Cut</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="light-bg">\n  <div class="getanappointment">\n    <div style="height:auto" class="cal-bg header-row">\n      <ion-row class="text-center input-row">\n        <ion-col width-100>\n          <div class="check-text">Choisissez le jour</div>\n        </ion-col>\n      </ion-row>\n\n      <ion-row class="text-center week-row">\n        <ion-col *ngFor="let weekName of weekNames" style="margin:0;padding:0">\n          <span>{{weekName}}</span>\n        </ion-col>\n      </ion-row>\n    </div>\n\n    <!-- ion-content contains the calendar months displayed in the view -->\n    <div style="height:100%; overflow-y: scroll; margin-left:0" class="month-list">\n      <ion-item *ngFor="let monthObj of months">\n        <ion-row class="month-row" >\n          <ion-col width-60 class="text-center">\n            {{monthObj.selectedMonth.format("MMM YYYY")}}\n          </ion-col>\n        </ion-row>\n\n        <div class="day-grid">\n          <ion-row class="text-center day-row" *ngFor="let week of monthObj.weeks; let rowIndex = index" >\n            <ion-col class="day-col" *ngFor="let day of week.days; let colIndex = index">\n\n                <button ion-button  *ngIf="day"  clear [datespan]="day.id" (click)="select(monthObj,day,rowIndex)">\n                  {{day.displayText}}\n                </button>\n\n            </ion-col>\n          </ion-row>\n        </div>\n      </ion-item>\n    </div>\n  </div>\n\n  <ion-row style="position: relative; margin-top:27.5%">\n    <ion-col col-3></ion-col>\n    <ion-col col-2>\n      <ion-row style="padding: 5px; cursor: pointer" (click)="increaseHour()">\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-up"></ion-icon>\n      </ion-row>\n      <ion-row>\n        <p style="padding: 5px; font-size: 20px; margin: auto">{{currentHour}}</p>\n      </ion-row>\n      <ion-row style="padding: 5px; cursor: pointer" (click)="decreaseHour()">\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-down"></ion-icon>\n      </ion-row>\n    </ion-col>\n\n    <ion-col col-2>\n      <ion-row style="padding: 5px; cursor: pointer">\n        <ion-icon color="bg-color" style="font-size: 25px; margin: auto" name="ios-arrow-up"></ion-icon>\n      </ion-row>\n      <ion-row>\n        <p style="padding: 5px; font-size: 20px; margin: auto">:</p>\n      </ion-row>\n      <ion-row style="padding: 5px; cursor: pointer">\n        <ion-icon color="bg-color" style="font-size: 25px; margin: auto" name="ios-arrow-down"></ion-icon>\n      </ion-row>\n    </ion-col>\n\n    <ion-col col-2>\n      <ion-row style="padding: 5px; cursor: pointer" (click)="changeMinutes()">\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-up"></ion-icon>\n      </ion-row>\n      <ion-row>\n        <p style="padding: 5px; font-size: 20px; margin: auto">{{currentMinutes}}</p>\n      </ion-row>\n      <ion-row style="padding: 5px; cursor: pointer" (click)="changeMinutes()">\n        <ion-icon color="primary" style="font-size: 25px; margin: auto" name="ios-arrow-down"></ion-icon>\n      </ion-row>\n    </ion-col>\n    <ion-col col-3></ion-col>\n  </ion-row>\n\n  <ion-row>\n    <p [ngClass] = "conflictMessageClasses">{{errorMessage}}</p>\n  </ion-row>\n\n  <div style="padding-left: 10%; padding-right: 10%;margin-top:1.5%">\n    <button ion-button class="round" full color="primary" (click)="getAppointment()">Réserver</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/officemobile/Documents/GitHubRepo/Barber/src/pages/getanappointment/getanappointment.html"*/,
    }),
    __metadata("design:paramtypes", [])
], GetAnAppointmentModel);

//# sourceMappingURL=GetAnAppointmentModel.js.map

/***/ }),

/***/ 881:
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

},[537]);
//# sourceMappingURL=main.js.map