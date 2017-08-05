import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the CreateUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})

export class CreateUserPage {
  email: any = "";
  password: any = "";
  confirmationPassword: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  /*****************************************************************************
  Function: presentAlert
  Description: Pushes home page
  Parameters: None
  Return: None
  *****************************************************************************/
  gotohome() {
    this.navCtrl.setRoot(HomePage);
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
      this.showAlert('Authentification Impossible !', 'Veuillez remplir tous les champs.')
    } else {
      if (this.password == this.confirmationPassword) {
        let loginController = this;
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function (data) {
          loginController.loginUser();
        }).catch(function (error) {
          loginController.showAlert('Inscription Impossible !', error.toString().substring(7, error.toString().length));
        });
      } else {
        this.showAlert('Inscription Impossible !', 'Les 2 mots de passe inscrits sont différents. Veuillez inscrire le même mot de passe.')
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
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function (data) {
      if (loginController.isLoggedIn()) loginController.gotohome();
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
  logoutUser(): firebase.Promise<void> {
    return firebase.auth().signOut();
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
  isLoggedIn(): Boolean {
    var user = firebase.auth().currentUser;
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

}
