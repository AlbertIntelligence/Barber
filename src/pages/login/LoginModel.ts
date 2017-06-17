

export class LoginModel {

  public loginInterface:loginInterface;

  constructor() {
  }

  doLogin(){
    return true;
  }

  checkLogin (username:string,password:string) {
    this.loginInterface.username = username;
    this.loginInterface.password = password;
  }


}

interface loginInterface {
  username:string;
  password:string;
  doLogin: ()=>boolean
}
