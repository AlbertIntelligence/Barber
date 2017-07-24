import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
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
  email: any;
  password: any;
  confirmationPassword: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  /*****************************************************************************
  Function: createUser
  Auteur(s): Koueni Deumeni
  Date de creation: 2017-06-03
  Date de modification:
  Description: This function create a new app user in the Firebase DB
  *****************************************************************************/
  createUser() {
    if (this.password == this.confirmationPassword) {
      let loginController = this;
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function (data) {
        if (this.isLoggedIn()) this.gotohome();
      }).catch(function (error) {
        loginController.showAlert('Authentification Impossible !', error.toString().substring(7, error.toString().length));
      });
    } else {
      this.showAlert('Inscription Impossible !', 'Les 2 mots de passe inscrits sont différents. Veuillez inscrire le même mot de passe.')
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
    this.navCtrl.pop();
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
