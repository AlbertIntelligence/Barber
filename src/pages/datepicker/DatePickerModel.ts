import firebase from 'firebase';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

export class DatePickerModel {
  private openingHour:any;
  private closingHour:any;
  private businessHours:Array<any> = [];
  private platform: Platform = new Platform();

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

    this.businessHours = [
      {
        'Day': 'Monday',
        'Opening': null,
        'Closure': null
      },
      {
        'Day': 'Tuesday',
        'Opening': 10,
        'Closure': 18
      },
      {
        'Day': 'Wednesday',
        'Opening': 10,
        'Closure': 18
      },
      {
        'Day': 'Thursday',
        'Opening': 10,
        'Closure': 21
      },
      {
        'Day': 'Friday',
        'Opening': 10,
        'Closure': 21
      },
      {
        'Day': 'Saturday',
        'Opening': 10,
        'Closure': 18
      },
      {
        'Day': 'Sunday',
        'Opening': 10,
        'Closure': 17
      }
    ];

  }

  //Get the current user id key
  getUserId(): String {
    return firebase.auth().currentUser.uid;
  }

  //Get first hour available for an appointment
  getFirstHourAvailable(date: String) {
    //To be completed
    return 10;
  }

  //Get next hour available for an appointment
  getNextHourAvailable(date: String) {
    //To be completed
    return 11;
  }

  //Get next hour available for an appointment
  getPreviousHourAvailable(date: String) {
    //To be completed
    return 9;
  }

  //Get the business hours of the day in parameter
  getBusinessHours(date: String) {
    var day = date.toString().substring(0, 3);
    return this.businessHours.find(item => item.Day.indexOf(day) != -1);
  }

  //Tells if the date and hour in parameter is available in db
  isAvailable(date: String, hour: String): Boolean {
    return true;
  }

  //Create new record in db
  createNew(date: String, hour: String) {
    var appointments = firebase.database().ref('Appointments/');
    var apptId = 23;
    var userId = firebase.auth().currentUser.uid;
    appointments.child("Appointment" + apptId).set({
      UserId: userId,
      Date: date,
      Hour: hour
    });
  }

  //Get all days that are entirely booked
  getDaysBooked() {

  }


}
