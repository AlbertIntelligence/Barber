import {Component} from "@angular/core";
import { NavController, ToastController } from 'ionic-angular';
import {HomePage} from "../home/home";
//import {HomePage} from "../home/home";
//import {RegisterPage} from "../register/register";
//import { User } from '../../providers/user';

//import { TranslateService } from '@ngx-translate/core';

import firebase from 'firebase';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  // Our translated text strings
  //private signupErrorString: string;
  userProfile: any = null;
  //loginDetails: FacebookLoginResponse;

  /*constructor(public navCtrl: NavController,
    //public user: User,
    public toastCtrl: ToastController,
    //public translateService: TranslateService
    private facebook: Facebook)
    {
    /*this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }*/


  constructor(public navCtrl: NavController,public toastCtrl: ToastController,platform: Platform) {
    firebase.initializeApp({
      apiKey: "AIzaSyBShXmN6TIS7xy2Tnr65NkCJbAEXM51g7Q",
      authDomain: "mpc-app-37f6f.firebaseapp.com",
      databaseURL: "https://mpc-app-37f6f.firebaseio.com",
      projectId: "mpc-app-37f6f",
      storageBucket: "mpc-app-37f6f.appspot.com",
      messagingSenderId: "351355658098"
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  login() {
    this.navCtrl.setRoot(HomePage);
  }

  /*****************************************************************************
  Function: createUser
  Auteur(s): Koueni Deumeni
  Date de creation: 2017-06-03
  Date de modification:
  Description: This function create a new app user in the Firebase DB
  *****************************************************************************/
  createUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  /*****************************************************************************
  Function: loginUser
  Auteur(s): Koueni Deumeni
  Date de creation: 2017-06-03
  Date de modification:
  Description: This function authentificates an app user
  *****************************************************************************/
  loginUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  /*****************************************************************************
  Function: signOut
  Auteur(s): Koueni Deumeni
  Date de creation: 2017-06-03
  Date de modification:
  Description: This function signs out an app user
  *****************************************************************************/
  logoutUser(): firebase.Promise<void> {
    return firebase.auth().signOut();
  }

  /*****************************************************************************
  Function: resetPassword
  Auteur(s): Koueni Deumeni
  Date de creation: 2017-06-03
  Date de modification:
  Description: This function rests an app user password
  *****************************************************************************/
  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
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
  Auteur(s): Koueni Deumeni
  Date de creation: 2017-06-03
  Date de modification:
  Description: This function tells if a user is logged in
  *****************************************************************************/
  isLoggedIn(): Boolean {
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      return true;
    } else {
      // No user is signed in.
      return false;
    }
  }

}
