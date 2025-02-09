import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
    templateUrl: '../getanappointment/getanappointment.html',
})
export class GetAnAppointmentModel {
  private businessHours:Array<any> = [];
  private dataSnapshot:Array<any> = [];
  private userAccounts:Array<any> = [];

  constructor() {
    this.updateDataSnapshot();
    this.updateUserAccounts();
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

  /*****************************************************************************
  Function: getUserId
  Purpose: Retrieve the user id in db
  Parameters: None
  Return: userID (String)
  *****************************************************************************/
  getUserId(): String {
    return firebase.auth().currentUser.uid;
  }

  /*****************************************************************************
  Function: updateDataSnapshot
  Purpose: Listener to firebase database. Update model if data changes
  Parameters: None
  Return: None
  *****************************************************************************/
  updateDataSnapshot() {
    let model = this;
    firebase.database().ref('Appointments/Users')
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

  /*****************************************************************************
  Function: getBusinessHours
  Purpose: Return the business hours of the date in parameter
  Parameters: date (String): Date we want the business hours
  Return: None
  *****************************************************************************/
  getBusinessHours(date: String) {
    var day = date.toString().substring(0, 3);
    var currentDate = this.businessHours.find(item => item.Day.indexOf(day) != -1)
    if (currentDate.Opening != null) {
      return currentDate;
    } else {
      do {
        var index = this.businessHours.findIndex(item => item.Day.indexOf(day) != -1);
        index++;
        day = this.businessHours[index].Day.substring(0, 3);
      } while (this.businessHours[index].Opening == null)
      return this.businessHours[index];
    }
  }

  /*****************************************************************************
  Function: isAvailable
  Purpose: Tells if the date and hour in parameter is available in db
  Parameters: date (String): date user wants to book
              hour (String): hour user wants to book
  Return: None
  *****************************************************************************/
  isAvailable(date: String, hour: String): Boolean {
    return (this.dataSnapshot.find(item => item.Date == date && item.Hour == hour) == undefined);
  }

  /*****************************************************************************
  Function: createNew
  Purpose: Register a new appointment in db
  Parameters: date(String): date to be saved
              hour(String): hour to be saved
  Return: None
  *****************************************************************************/
  createNew(date: String, hour: String) {
    var appointments = firebase.database().ref('Appointments/Users');
    var userId = firebase.auth().currentUser.uid;
    var timeStamp = new Date().getTime().toString();
    var user = this.userAccounts.find(item => item.UserId == userId);
    appointments.child(timeStamp).set({
      UserId: userId,
      Date: date,
      Hour: hour,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }

  /*****************************************************************************
  Function: updateUserAccounts
  Purpose: Fetch user accounts from db
  Parameters: None
  Return: None
  *****************************************************************************/
  updateUserAccounts() {
    let controller = this;
    firebase.database().ref('Users/')
     .on('value', function(snapshot) {
       let users = snapshot.val();
       controller.userAccounts = [];
       for (var property in users) {
          if (users.hasOwnProperty(property)) {
              controller.userAccounts.push(users[property]);
          }
       }
     });
  }

  /*****************************************************************************
  Function: getDaysBooked
  Purpose: Return the list of the days that cannot receive a booking anymore
  Parameters: None
  Return: daysFullBooked (Array<String>): The list of days fully booked
  *****************************************************************************/
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
