import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {LoginModel} from "../login/loginModel";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginModel : any;

  constructor(public nav: NavController ,public LoginModel: LoginModel) {
    this.loginModel = LoginModel;
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {

    if(this.loginModel.loginInterface) {
      this.nav.setRoot(HomePage);
    }
  }


}
