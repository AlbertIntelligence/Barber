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
      title: 'Confirmez votre Ticket',
      message: "En cliquant sur Confirmer, je confirme avoir lu et accepté les Termes et Conditions et la Politique de Confidentialité de Barber Me.",
      buttons: [
        {
          text: 'Annuler',
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
      title: 'Erreur.',
      message: "Vous avez déjà un ticket.",
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

  /*****************************************************************************
   Function: cannotCancel
   Description: This function display a warning on pop-up
   Parameters: None
   Return: None
   *****************************************************************************/
  cannotCancel() {
    let alert = this.alertCtrl.create({
      title: 'Annulation Impossible !',
      message: "Vous ne pouvez plus annuler votre ticket.",
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  /*****************************************************************************
  Function: showCancellationConfirmation
  Description: This function display a warning on pop-up
  Parameters: None
  Return: None
  *****************************************************************************/
  showCancellationConfirmation() {
    let alert = this.alertCtrl.create({
      title: 'Confirmez votre annulation',
      message: "En cliquant sur Confirmer, je confirme avoir lu et accepté les Termes et Conditions et la Politique de Confidentialité de Barber Me.",
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmer',
            handler: data => {
              this.ticket.cancelTicket();

          }
        }
      ]
    });
    alert.present();
  }

}
