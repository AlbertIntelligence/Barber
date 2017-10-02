 import { Component } from "@angular/core";
import { AlertController } from "ionic-angular/index";
import {TicketConfirmationPage} from "../ticket-confirmation/ticket-confirmation";
 import {GetaTicketPage} from "../get-a-ticket/get-a-ticket";
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
  private ticket:GetaTicketPage;

  /*****************************************************************************
  Class constructor
  *****************************************************************************/
  constructor(private alertCtrl ?: AlertController ,private app?:App) {
    this.nav = app.getActiveNav();
    this.ticketConfirmationPage = new TicketConfirmationPage();
    this.ticket = new GetaTicketPage(this.nav) ;
  }

  /*****************************************************************************
  Function: presentAlert
  Description: This function display a warning on pop-up
  Parameters: None
  Return: None
  *****************************************************************************/
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation de ticket',
      message: "Oui, j'accepte les Termes et Conditions de BarberMe",
      buttons: [
        {
          text: 'Canceler',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            this.ticket.startTransaction=false;
          }
        },
        {
          text: 'Confirmer',
            handler: data => {
              //this.nav.push(TicketConfirmationPage);
              this.ticket.startTransaction=true;
              this.ticket.makeTransaction();

          }
        }
      ]
    });
    alert.present();
  }

  /*****************************************************************************
   Function: presentAlert
   Description: This function display a warning on pop-up
   Parameters: None
   Return: None
   *****************************************************************************/
  ticketExist() {
    let alert = this.alertCtrl.create({
      title: 'Tu a deja un ticket.',
      message: "Vous ne pouvez prendre plus d'un ticket.",
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
