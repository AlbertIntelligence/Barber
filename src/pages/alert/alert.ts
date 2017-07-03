 import { Component } from "@angular/core";
import { AlertController } from "ionic-angular/index";
import {TicketConfirmationPage} from "../ticket-confirmation/ticket-confirmation";
 import {UserProfilePage} from "../user-profile/user-profile";
import {NavController,App} from "ionic-angular";
 import {Injectable} from '@angular/core';
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html'
})
@Injectable()
export class Alert {

  private nav: NavController;
  private ticketConfirmationPage:TicketConfirmationPage;
  private userProfile:UserProfilePage;


  constructor(private alertCtrl ?: AlertController ,private app?:App) {
    this.nav = app.getActiveNav();
    this.ticketConfirmationPage = new TicketConfirmationPage();
    this.userProfile = new UserProfilePage ;
  }

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
              this.nav.push(TicketConfirmationPage);
              this.userProfile.checkPayment();
          }
        }
      ]
    });
    alert.present();
  }






}
