import { Component } from "@angular/core";
import { AlertController } from "ionic-angular/index";
import {TicketConfirmationPage} from "../ticket-confirmation/ticket-confirmation";
import {NavController} from "ionic-angular";
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html'
})
export class Alert {

  private nav: NavController;
  private ticketConfirmationPage:TicketConfirmationPage;

  constructor(private alertCtrl ?: AlertController ) {
    this.ticketConfirmationPage = new TicketConfirmationPage();
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
            console.log('Confirm clicked');
            //this.nav.push(TicketConfirmationPage).catch(() => {});
          }
        }
      ]
    });
    alert.present();
  }




}
