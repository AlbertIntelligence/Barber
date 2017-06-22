import firebase from 'firebase';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

export class DatePickerModel {
  private businessHours:Array<any> = [];
  private dataSnapshot:Array<any> = [];
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

    //Event listener on change in database
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
     });
  }

  //Get the current user id key
  getUserId(): String {
    return firebase.auth().currentUser.uid;
  }

  //Get firebase data snapshot
  /*updateDataSnapshot(data: Array<any>): Array<any> {
    this.dataSnapshot = data;
    console.log(this.dataSnapshot);
    return this.dataSnapshot;
  }

  //Update firebase data snapshot
  async updateDataSnapshot() {
    let appointmentsList = new Array<any>();
    await firebase.database().ref('Appointments/')
     .once('value').then(function(snapshot) {
       let appointments = snapshot.val();

       for (var property in appointments) {
          if (appointments.hasOwnProperty(property)) {
              appointmentsList.push(appointments[property]);
          }
       }
     });
     this.dataSnapshot = appointmentsList;
  }*/

  //Get first hour available for an appointment
  /*getFirstHourAvailable(date: String): String {
    if (this.dataSnapshot.length > 0) {
      var openingHour = parseFloat(this.getBusinessHours(new Date(date)).Opening);
      var closingHour = parseFloat(this.getBusinessHours(new Date(date)).Closure);

      let hoursArray: Array<any> = [];
      hoursArray = this.dataSnapshot.filter((element, index)=>{ return (element.Date == date); });
      if (hoursArray.length > 0) {
        var tmpArray = [];
        for (var i = 0; i < hoursArray.length; i++) {
          var time = (hoursArray[i].Hour.substring(5, 7) == "00") ?
          (parseFloat(hoursArray[i].Hour.substring(0, 2))) : (parseFloat(hoursArray[i].Hour.substring(0, 2)) + 0.5);
          tmpArray.push(time);
        }

        var isFounded = true;
        while (isFounded) {
          isFounded = (tmpArray.find(item => item == openingHour)) ? true : false;
          openingHour += 0.5;
        }
        openingHour -= 0.5;

        if (openingHour.toString().length > 2) {
          return openingHour.toString().substring(0, 2) + " : 30";
        }
        return openingHour.toString() + " : 00";
      }
    }
    return "10 : 00";
  }*/

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
    return [];
  }


}
