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

  ionViewDidLoad() {
  }

  /*****************************************************************************
  *gotohome function sends user to home page
  *****************************************************************************/
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
  Function: loginUser
  Auteur(s): Koueni Deumeni
  Date de creation: 2017-06-03
  Date de modification:
  Description: This function authentificates an app user
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
  Function: loginUser
  Auteur(s): Koueni Deumeni
  Date de creation: 2017-06-03
  Date de modification:
  Description: This function authentificates an app user
  *****************************************************************************/
  gotoLoginPage() {
    this.navCtrl.pop();
  }

  /*****************************************************************************
  Function: isLoggedIn
  Auteur(s): Koueni Deumeni
  Date de creation: 2017-07-23
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

}
