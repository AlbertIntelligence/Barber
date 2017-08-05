import {Component, ViewChild} from "@angular/core";
import {Platform} from "ionic-angular";
//import {StatusBar, Splashscreen} from "ionic-native";
import {StatusBar} from "ionic-native";
import {LoginPage} from "../pages/login/login";
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage: any;

  public nav: any;

  constructor(public platform: Platform,private splashScreen: SplashScreen) {
    this.rootPage = LoginPage;

    // show splash screen
    //Splashscreen.show();
    this.splashScreen.show();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
