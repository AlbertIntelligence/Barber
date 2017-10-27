import {Component, ViewChild} from "@angular/core";
import {Platform, AlertController} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {PhoneNumberPage} from "../pages/phone-number/phone-number";
import { Keyboard } from '@ionic-native/keyboard';
import { AppUpdate } from '@ionic-native/app-update';
import firebase from 'firebase';

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

  constructor(public platform: Platform, private keyboard: Keyboard, private appUpdate: AppUpdate,
              public alertCtrl: AlertController) {
    this.rootPage = PhoneNumberPage;

    // show splash screen
    Splashscreen.show();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      this.keyboard.disableScroll(true);

      //App url update
      /*var updateUrl;
      let controller = this;
      firebase.database().ref('AppUpdate/')
       .on('value', function(snapshot) {
         let appUpdate = snapshot.val();
         if (appUpdate.hasAnUrl) updateUrl = appUpdate.url;
         controller.appUpdate.checkAppUpdate(updateUrl);
       });*/
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
