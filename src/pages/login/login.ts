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

  gotohome() {
    this.navCtrl.setRoot(HomePage);
  }

  /*****************************************************************************
  Function: createUser
  Auteur(s): Koueni Deumeni
  Date de creation: 2017-06-03
  Date de modification:
  Description: This function create a new app user in the Firebase DB
  *****************************************************************************/
  createUser() {
    this.navCtrl.push(CreateUserPage);
  }

  /*****************************************************************************
  Function: loginUser
  Auteur(s): Koueni Deumeni
  Date de creation: 2017-06-03
  Date de modification:
  Description: This function authentificates an app user
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
    return (user != null && user != undefined) ? true : false;
  }

  /*****************************************************************************
  Function: showAlert
  Auteur(s): Koueni Deumeni
  Date de creation: 2017-07-23
  Date de modification:
  Description: This function triggers warning messages
  *****************************************************************************/
  showAlert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }


  //------------------------------------------THIS IS THE HELPER FUNCTION SECTION----------------------------------------------//


  doLogin(){
    var email = $("#email").text();
    var password = $("#password").text();
  }


}
