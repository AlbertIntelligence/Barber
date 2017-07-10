import {Component} from "@angular/core";
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";
import * as $ from 'jquery';
import { Directive, Input, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  gotohome() {
    this.navCtrl.push(HomePage);
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


  //------------------------------------------THIS IS THE HELPER FUNCTION SECTION----------------------------------------------//


  doLogin(){
    var email = $("#email").text();
    var password = $("#password").text();
    console.log(email);
    console.log(password);
    console.log(this.loginUser(email,password));
  }


}
