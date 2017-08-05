import {Component} from "@angular/core";
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";
import * as $ from 'jquery';
import { Directive, Input, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import {CreateUserPage} from "../create-user/create-user";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: any = "";
  password: any = "";

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

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

  /*****************************************************************************
  Function: gotoCreateUser
  Purpose: Pushes create-user page
  Parameters: None
  Return: None
  *****************************************************************************/
  gotoCreateUser() {
    this.navCtrl.push(CreateUserPage);
  }

  /*****************************************************************************
  Function: loginUser
  Purpose: Validate the entries and logs the user in.
  Parameters: None
  Return: None
  *****************************************************************************/
  loginUser() {
    if (this.email.length == 0 || this.password.length == 0) {
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
  Function: resetPassword
  Purpose: Allows the user to change his password
  Parameters: None
  Return: None
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
  Purpose: Tells if there is a user logged in
  Parameters: None
  Return: True or False
  *****************************************************************************/
  isLoggedIn(): Boolean {
    var user = firebase.auth().currentUser;
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


}
