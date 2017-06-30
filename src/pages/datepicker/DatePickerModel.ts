import firebase from 'firebase';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import {DatePickerComponent} from '../datepicker/datepicker';

export class DatePickerModel {
  private businessHours:Array<any> = [];
  private dataSnapshot:Array<any> = [];
  private platform: Platform = new Platform();
  private controller:DatePickerComponent;

  constructor(controller:DatePickerComponent) {
    this.controller = controller;
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
        'Closure': 11
      },
      {
        'Day': 'Sunday',
        'Opening': 10,
        'Closure': 17
      }
    ];

    this.updateDataSnapshot();
    //this.updateDataSnapshot();  //Event listener tp database
    //Event listener on change in database
    /*let model = this;
    firebase.database().ref('Appointments/')
     .on('value', function(snapshot) {
       let appointments = snapshot.val();
       model.dataSnapshot = [];
       for (var property in appointments) {
          if (appointments.hasOwnProperty(property)) {
              model.dataSnapshot.push(appointments[property]);
          }
       }
     });*/
  }

  //Get the current user id key
  getUserId(): String {
    return firebase.auth().currentUser.uid;
  }

  //Update firebase data snapshot
  updateDataSnapshot() {
    let model = this;
    firebase.database().ref('Appointments/')
     .on('value', function(snapshot) {
       let appointments = snapshot.val();
       model.dataSnapshot = [];
       for (var property in appointments) {
          if (appointments.hasOwnProperty(property)) {
              model.dataSnapshot.push(appointments[property]);
          }
       }
       model.controller.verifyAvailibility();
       model.controller.disableBookedDays();
     });
  }

  //Get the business hours of the day in parameter
  getBusinessHours(date: String) {
    var day = date.toString().substring(0, 3);
    return this.businessHours.find(item => item.Day.indexOf(day) != -1);
  }

  //Tells if the date and hour in parameter is available in db
  isAvailable(date: String, hour: String): Boolean {
    return (this.dataSnapshot.find(item => item.Date == date && item.Hour == hour) == undefined);
  }

  //Create new record in db
  createNew(date: String, hour: String) {
    var appointments = firebase.database().ref('Appointments/');
    var userId = firebase.auth().currentUser.uid;
    var timeStamp = new Date().getTime().toString();
    appointments.child(timeStamp).set({
      UserId: userId,
      Date: date,
      Hour: hour
    });
  }

  //Get all days that are entirely booked
  getDaysBooked(): Array<String> {
    var days = [];
    var nbAppointments = [];
    var nbMaxAppointments = [0, 0, 0, 0, 0, 0, 0];
    var daysBooked = [];

    //Calculate the nb of booking available for each day
    for (var i = 0; i < nbMaxAppointments.length; i++) {
      if (this.businessHours[i].Opening != null) {
        nbMaxAppointments[i] = 2 * (this.businessHours[i].Closure - this.businessHours[i].Opening);
      } else {
        nbMaxAppointments[i] = 0;
      }
    }

    //Calculate nb of booking recorded for each day in database
    for (var i = 0; i < this.dataSnapshot.length; i++) {
      if (days.find(item => item == this.dataSnapshot[i].Date) != null) {
        var index = days.indexOf(this.dataSnapshot[i].Date);
        nbAppointments[index]++;
      } else {
        days.push(this.dataSnapshot[i].Date);
        nbAppointments.push(1);
      }
    }

    //Save days that have reached the max nb of appointments available
    for (var i = 0; i < days.length; i++) {
        var day = new Date(days[i]).getDay();
        var nbAppMax = nbMaxAppointments[day - 1];
        if (nbAppointments[i] >= nbAppMax) daysBooked.push(days[i]);
    }

    return daysBooked;
  }


}
