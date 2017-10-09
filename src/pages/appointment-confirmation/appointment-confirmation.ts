import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

/*
   Generated class for the TicketConfirmation page.
 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'appointment-confirmation',
  templateUrl: 'appointment-confirmation.html'
})
export class AppointmentConfirmationPage {

  private date:String;
  private heure:String;
  private titleConfirmation:String;
  private confirmationMessage:String;

  constructor(private navController: NavController, private navParams: NavParams)
  {
    this.date = navParams.get('date');
    this.heure = navParams.get('heure');

    if (this.date == 'Cancellation') {
      this.titleConfirmation = 'Annulation complétée !';
      this.confirmationMessage = 'Votre rendez-vous a été annulé.'
    } else {
      this.titleConfirmation = 'Réservation complétée !';
      this.confirmationMessage = 'Votre rendez-vous est le ' + this.date + 'à ' + this.heure + '.';
    }
  }

}
