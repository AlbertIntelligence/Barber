import {Component, ViewChild} from "@angular/core";
import {Platform, AlertController} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {PhoneNumberPage} from "../pages/phone-number/phone-number";
import { Keyboard } from '@ionic-native/keyboard';
//import { Push, PushObject, PushOptions } from '@ionic-native/push';


// import pages
// end import pages

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage: any;

  public nav: any;

  constructor(public platform: Platform, private keyboard: Keyboard, //public push: Push,
              public alertCtrl: AlertController) {
    this.rootPage = PhoneNumberPage;

    // show splash screen
    //Splashscreen.show();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      this.keyboard.disableScroll(true);

      //Setup the push notifications
      //this.pushSetup();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  /*pushSetup() {
    const options: PushOptions = {
       android: {
         //senderID: '351355658098'
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       },
       windows: {},
       browser: {
           pushServiceURL: 'http://push.api.phonegap.com/v1/push'
       }
     };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => this.showAlert('Mario Perfect Cut', notification.message));

    pushObject.on('registration').subscribe((registration: any) => this.showAlert('Device registered', registration.registrationId));

    pushObject.on('error').subscribe(error => console.log('Error with Push plugin ' + error));
  }

  /*****************************************************************************
  Function: showAlert
  Purpose: Display a pop-up alert to notify user on reservation conflict
  Parameters: None
  Return: None
  *****************************************************************************/
  /*showAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }*/

}
