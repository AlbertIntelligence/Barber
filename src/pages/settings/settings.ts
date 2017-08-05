import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  pushNotification: any ;
  emailNotificaiton: any ;
  smsNotification : any ;

  constructor(public nav: NavController) {
    this.sendNewPositionPushNotification();
    this.sendNewPositionSmsNotification();
    this.sendNewPositionEmailNotification();
  }

  /*****************************************************************************
  Function: logout
  Purpose: Pushes the login page
  Parameters: None
  Return: None
  *****************************************************************************/
  logout() {
    this.nav.setRoot(LoginPage);
  }

  public sendNewPositionPushNotification(){
    console.log("alert");
    console.log(this.pushNotification.val);
    if(this.pushNotification){

    }

  }

  public sendNewPositionSmsNotification(){
    if(this.smsNotification){

    }

  }

  public sendNewPositionEmailNotification(){
    if(this.emailNotificaiton){

    }

  }


}
