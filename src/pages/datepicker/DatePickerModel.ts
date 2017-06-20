import firebase from 'firebase';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

export class DatePickerModel {
  public platform: Platform = new Platform();

  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyBShXmN6TIS7xy2Tnr65NkCJbAEXM51g7Q",
      authDomain: "mpc-app-37f6f.firebaseapp.com",
      databaseURL: "https://mpc-app-37f6f.firebaseio.com",
      projectId: "mpc-app-37f6f",
      storageBucket: "mpc-app-37f6f.appspot.com",
      messagingSenderId: "351355658098"
    });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  //Get the current user id key
  getUserId(): String {
    return firebase.auth().currentUser.uid;
  }

  //Get first hour available for an appointment
  getFirstHourAvailable() {
    //To be completed
    return 10;
  }

  //Get next hour available for an appointment
  getNextHourAvailable() {
    //To be completed
    return 11;
  }

  //Get next hour available for an appointment
  getPreviousHourAvailable() {
    //To be completed
    return 9;
  }

  //Tells if the date and hour in parameter is available in db
  isAvailable(date: String): Boolean {
    return false;
  }

  //Create new record in db
  createNew(date: String) {
    var appointments = firebase.database().ref('Appointments/');
    var apptId = 23;
    var userId = firebase.auth().currentUser.uid;
    appointments.child("Appt" + apptId).set({
      Date: date,
      UserId: userId
    });
  }


}
