import { Component, Directive, Input, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import moment from 'moment';
import {GetAnAppointmentModel} from './GetAnAppointmentModel';
import { NavController, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import {AppointmentConfirmationPage} from "../appointment-confirmation/appointment-confirmation";

const NUM_OF_DAYS = 7;
const NUM_OF_MONTHS = 1;
const FORMAT = 'DD-MMM-YYYY';

/***************************************************************************************************
THE SECTION BELOW IS AN IMPORTED LIBRARY
***************************************************************************************************/
// Low level primitives to manipulate the css classes of the date elements displayed in the calendar view
interface DateSelectorInterface {
    getId(): String;
}
// Low level primitives to manipulate the css classes of the date elements displayed in the calendar view
@Directive({ selector: '[datespan]' })
export class DateSelectorDirective implements DateSelectorInterface {
  @Input('datespan') id: String;

  constructor(public elemRef:ElementRef,public renderer:Renderer) {
  }

  getId() {
    return this.id;
  }

  setInRange(rangeType) {
    let rangeClass = 'in-range-' + rangeType;
    this.renderer.setElementClass(this.elemRef.nativeElement.parentElement,rangeClass,true);
  }

  setToday() {
    this.renderer.setElementClass(this.elemRef.nativeElement,'today',true);
  }

  setSelected() {
    this.renderer.setElementClass(this.elemRef.nativeElement,'selected',true);
  }

  unsetSelected() {
    this.renderer.setElementClass(this.elemRef.nativeElement,'selected',false);
  }

  setDisabled() {
    this.renderer.setElementClass(this.elemRef.nativeElement.parentElement,'in-range-full',false);
    this.renderer.setElementClass(this.elemRef.nativeElement.parentElement,'in-range-left',false);
    this.renderer.setElementClass(this.elemRef.nativeElement.parentElement,'in-range-right',false);
    this.renderer.setElementProperty(this.elemRef.nativeElement,'disabled',true);
  }

  setEnabled() {
    this.renderer.setElementClass(this.elemRef.nativeElement.parentElement,'in-range-full',false);
    this.renderer.setElementClass(this.elemRef.nativeElement.parentElement,'in-range-left',false);
    this.renderer.setElementClass(this.elemRef.nativeElement.parentElement,'in-range-right',false);
    this.renderer.setElementProperty(this.elemRef.nativeElement,'disabled',false);
  }
}

/***************************************************************************************************
THE SECTION ABOVE IS AN IMPORTED LIBRARY
***************************************************************************************************/

@Component({
  selector:'getanappointment',
  templateUrl: 'getanappointment.html',
})

export class GetAnAppointmentPage {
  private weekNames:Array<String>;
  private selectedDate:any;
  private today:any;
  private months:Array<any> = [];
  private currentDate:any;
  private currentHour:any = "12";
  private currentMinutes:any = "00";
  private appointments:GetAnAppointmentModel;
  private errorMessage:String;
  private conflictMessageClasses:any = { 'conflictMessageOn': false, 'conflictMessageOff': true };
  private openingHour:String;
  private closingHour:String;
  private hasAnAppointment:Boolean = false;
  private buttonText:String = "RÉSERVER";
  private appointmentId:any;

  // A Map where key = 'DD-MMM-YYYY' and Value as the ViewChild Reference of the date element displayed in the
  // calendar view
  public dateDirectivesMap:Map<String,DateSelectorDirective> = new Map<String,DateSelectorDirective>();

  // Get All the  ViewChild References of the date element displayed in the
  // calendar view
  @ViewChildren(DateSelectorDirective) dateSelectors:QueryList<DateSelectorDirective>;
  constructor(public alertCtrl: AlertController, private nav: NavController,) {
    this.appointments = new GetAnAppointmentModel();
    this.weekNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    this.today = moment();
    //this.currentDate = this.today.clone();
    //this.setDefaultHour();
    this.updateDataSnapshot();
    //this.openingHour = this.appointments.getBusinessHours(this.currentDate).Opening + "h";
    //this.closingHour = this.appointments.getBusinessHours(this.currentDate).Closure + "h";
  }

  /*****************************************************************************
  Function: increaseHour
  Purpose: Increment within the restriction the hour value
  Parameters: None
  Return: None
  *****************************************************************************/
  increaseHour() {
    var closingHour = parseFloat(this.appointments.getBusinessHours(this.currentDate).Closure);
    if (closingHour > (parseFloat(this.currentHour) + 1)) {
      this.currentHour = parseInt(this.currentHour) + 1;
      this.verifyAvailibility();  //check if hour is available
    } else {
      //Display Heure de fermeture
      this.displayConflictMessage("Heures d'ouverture : " + this.openingHour + " - " + this.closingHour);
    }
  }

  /*****************************************************************************
  Function: decreaseHour
  Purpose: Decrement within the restriction the hour value
  Parameters: None
  Return: None
  *****************************************************************************/
  decreaseHour() {
    var openingHour = parseFloat(this.appointments.getBusinessHours(this.currentDate).Opening);
    if (openingHour <= (parseFloat(this.currentHour) - 1)) {
      this.currentHour = parseInt(this.currentHour) - 1;
      this.verifyAvailibility();  //check if hour is available
    } else {
      //To be completed : Display Heure de fermeture
      this.displayConflictMessage("Heures d'ouverture : " + this.openingHour + " - " + this.closingHour);
    }
  }

  /*****************************************************************************
  Function: changeMinutes
  Purpose: Change the minutes value by interval of 30 minutes
  Parameters: None
  Return: None
  *****************************************************************************/
  changeMinutes() {
    this.currentMinutes = (this.currentMinutes == '00') ? '30' : '00';
    this.verifyAvailibility();
  }

  /*****************************************************************************
  Function: displayConflictMessage
  Purpose: Display conflict message to user when the day and hour selected
           are not available
  Parameters: errorMessage: The message to be displayed
  Return: None
  *****************************************************************************/
  displayConflictMessage (errorMessage) {
    this.errorMessage = errorMessage;
    this.conflictMessageClasses = { 'conflictMessageOn': true, 'conflictMessageOff': false };
  }

  /*****************************************************************************
  Function: verifyAvailibility
  Purpose: Check if the day and hour selected is available. If No, trigger
           error message
  Parameters: None
  Return: None
  *****************************************************************************/
  verifyAvailibility () {
    if (this.currentDate != undefined) {
      this.conflictMessageClasses = { 'conflictMessageOn': false, 'conflictMessageOff': true };
      var hour = this.currentHour + " : " + this.currentMinutes;
      if (!this.appointments.isAvailable(this.currentDate.format(FORMAT), hour))
          this.displayConflictMessage("Cette plage horaire n'est plus disponible.");
    }
  }

  /*****************************************************************************
  Function: setDefaultHour
  Purpose: Set the hour to the Opening hour of the actual day
  Parameters: None
  Return: None
  *****************************************************************************/
  setDefaultHour() {
    var hour = this.appointments.getBusinessHours(this.currentDate).Opening;
    this.currentHour = hour.toString().substring(0, 2);
    this.currentMinutes = (this.currentHour.toString().length > 2) ? "30" : "00";
  }

  /*****************************************************************************
  Function: updateDataSnapshot
  Purpose: Listen to the firebase db and triggers controller methods when data
           changed in firebase db
  Parameters: None
  Return: None
  *****************************************************************************/
  updateDataSnapshot() {
    let controller = this;
    var userId = firebase.auth().currentUser.uid;
    var hasAppointment = false;
    firebase.database().ref('Appointments/Users/')
     .on('value', function(snapshot) {
       controller.verifyAvailibility();
       controller.appointments.getDaysBooked();
       let appointments = snapshot.val();
       for (var property in appointments) {
          if (appointments.hasOwnProperty(property)) {
              if (appointments[property].UserId == userId) {
                 controller.hasAnAppointment = true;
                 controller.buttonText = "ANNULER RÉSERVATION";
                 controller.appointmentId = property;
                 hasAppointment = true;
              }
          }
       }
       if (!hasAppointment) {
         controller.hasAnAppointment = false;
         controller.buttonText = 'RÉSERVER';
       }
     });
  }

  /*****************************************************************************
  Function: getAppointment
  Purpose: Save the current aay and hour in database. If conflict, display error
           message
  Parameters: None
  Return: None
  *****************************************************************************/
  getAppointment() {
    if (this.buttonText == "ANNULER RÉSERVATION") {
      if (this.canCancel()) {
        this.displayAppointmentConfirmation(date, hour, 'cancellation');
      } else {
        this.showAlert('Annulation impossible !', 'Vous ne pouvez plus annuler votre réservation.');
        this.buttonText = "RÉSERVER";
      }
      return;
    }

    if (this.hasAnAppointment) {
      this.showAlert('Erreur', 'Vous avez déjà un rendez-vous.');
      return;
    }

    if (this.currentDate == undefined) {
      this.showAlert('Erreur', 'Veuillez sélectionner une date.');
      return;
    }

    var openingHour = parseFloat(this.appointments.getBusinessHours(this.currentDate).Opening);
    var closingHour = parseFloat(this.appointments.getBusinessHours(this.currentDate).Closure);
    if (closingHour <= (parseFloat(this.currentHour) + 1) || openingHour > (parseFloat(this.currentHour) - 1)) {
      this.displayConflictMessage("Heures d'ouverture : " + this.openingHour + " - " + this.closingHour);
      return;
    }

    var date = this.currentDate.format(FORMAT);
    var hour = this.currentHour + " : " + this.currentMinutes;
    (this.appointments.isAvailable(date, hour)) ? this.displayAppointmentConfirmation(date, hour, 'reservation') : this.showAlert('Réservation impossible !', 'Veuillez choisir une autre plage horaire.');
    this.disableBookedDays();
  }

  /*****************************************************************************
  Function: cancelReservation
  Purpose: Cancel the user reservation
  Parameters: None
  Return: None
  *****************************************************************************/
  cancelReservation() {
    var id = this.appointmentId;
    /*firebase.database().ref('Appointments/Users/' + id).once('value').then(function(snapshot) {
      var appointment = snapshot.val();
      firebase.database().ref().child('AppointmentsArchive/Users/').update({
        [id] : appointment
      });
    });*/

    firebase.database().ref().child('Appointments/Users/' + id).remove();
    this.goToAppointmentConfirmationPage('Cancellation', 'Cancellation');
    this.hasAnAppointment = false;
    this.buttonText = 'RÉSERVER';
    this.updateDataSnapshot();
  }

  /*****************************************************************************
  Function: cancelReservation
  Purpose: Cancel the user reservation
  Parameters: None
  Return: None
  *****************************************************************************/
  canCancel(): Boolean {
    var timeStamp = new Date().getTime();
    var appointmentTimeStamp = parseInt(this.appointmentId);
    var delta = (timeStamp - appointmentTimeStamp) / (1000 * 60); //minutes
    if (delta < 30) return true;
    return false;
  }

  /*****************************************************************************
  Function: displayAppointmentConfirmation
  Purpose: Prompt alert to confirm user reservation
  Parameters: None
  Return: None
  *****************************************************************************/
  displayAppointmentConfirmation (date, hour, action) {
    var title = (action == 'reservation') ? 'Confirmez votre réservation' : 'Confirmez votre annulation';
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: "En cliquant sur Confirmer, je confirme avoir lu et accepté les Termes et Conditions et la Politique de Confidentialité de BarberMe. Vous disposez d'un délai de 30 minutes pour annuler votre rendez-vous.",
      buttons: [{
        text: 'Annuler',
        role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
      },
      {
        text: 'Confirmer',
            handler: () => {
              if (action == 'reservation') {
                this.appointments.createNew(date, hour);
                this.goToAppointmentConfirmationPage(date, hour);
                this.hasAnAppointment = true;
              } else {
                this.cancelReservation();
              }
            }
      }]
    });
    alert.present();
  }

  /*****************************************************************************
  Function: showAlert
  Purpose: Display a pop-up alert to notify user on reservation conflict
  Parameters: None
  Return: None
  *****************************************************************************/
  showAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  // Disable date in parameter
  disableDate(date) {
    //Date format = "DD-MMM-YYYY"
    let dayBooked = this.dateSelectors.find(item => item.id === date);
    if (typeof dayBooked != "undefined") dayBooked.setDisabled();
  }

  // Enable date in parameter
  enableDate(date) {
    //Date format = "DD-MMM-YYYY"
    let dayBooked = this.dateSelectors.find(item => item.id === date);
    if (typeof dayBooked != "undefined") dayBooked.setEnabled();
  }

  //Change date format to MMM, DD, YYYY
  changeDateFormat(date) {
    var day = date.substring(0, 2);
    var month = date.substring(3, 6);
    var year = date.substring(7, 11);
    return month + ", " + day + ", " + year;
  }

  //Disable all dates that are full booked
  disableBookedDays() {
    var daysBooked = this.appointments.getDaysBooked();
    for (var i = 0; i < daysBooked.length; i++) {
      this.disableDate(daysBooked[i]);
    }
  }

  // Programmatically set the CSS Classes on the dates displayed in the Calendar View
  getSelectorKey(day) {
    return day.format(FORMAT);
  }

  // Programmatically set the CSS Classes on the dates displayed in the Calendar View
  selectDate(selectedDate) {
    let selectorKey = this.getSelectorKey(selectedDate);
    this.dateDirectivesMap.get(selectorKey).setSelected();
  }

  // Programmatically set the CSS Classes on the dates displayed in the Calendar View
  selectToday(selectedDate) {
    let selectorKey = this.getSelectorKey(selectedDate);
    this.dateDirectivesMap.get(selectorKey).setToday();
  }

  // Programmatically set the CSS Classes on the dates displayed in the Calendar View
  clearSelectedDate(selectedDate) {
    if(selectedDate) {
      let selectorKey = this.getSelectorKey(selectedDate);
      this.dateDirectivesMap.get(selectorKey).unsetSelected();
    }
  }

  select(monthObj,selectedDate,rowIndex) {
    let day = moment(selectedDate.id,FORMAT);
    this.clearSelectedDate(this.currentDate);
    this.currentDate = day;
    this.selectDate(day);
    this.openingHour = this.appointments.getBusinessHours(this.currentDate).Opening + "h";
    this.closingHour = this.appointments.getBusinessHours(this.currentDate).Closure + "h";
    this.verifyAvailibility();
  }

  setTimeToZero(dateLocal) {
    return dateLocal.day(0).hour(0).minute(0).second(0).millisecond(0);
  }

  createWeek(forDateObj,buildMonth) {
    let weekDays = [],count = 0;

    while(count < NUM_OF_DAYS) {
      if(forDateObj.month() === buildMonth) {
        let dateObj = {
          displayText: forDateObj.date(),
          id:forDateObj.format(FORMAT)
        }
        weekDays.push(dateObj);
      } else {
        weekDays.push('');
      }
      forDateObj = forDateObj.clone();
      forDateObj.add(1, 'd');
      count++;
    }
    return weekDays;
  }

  createMonth(monthObj,forMonthObj) {
    monthObj.weeks = [];
    let month = forMonthObj.clone(),done=true;

    while(done) {
      monthObj.weeks.push({ days: this.createWeek(month.clone(),monthObj.selectedMonth.month()) });
      month.add(1, 'w');
      if(month.month() !== monthObj.selectedMonth.month()) {
        done=false;
      }
    }
  }

  initMonth(monthObj) {
    let startMonth = monthObj.selectedMonth.clone();
    startMonth.date(1);
    this.setTimeToZero(startMonth.day(0));
    this.createMonth(monthObj,startMonth);

  }

  init(month){
    let monthObj = {};
    monthObj['selectedMonth'] = month;
    this.initMonth(monthObj);
    this.months.push(monthObj);
  }

  // Populate the DateDirectivesMap with the ViewChildren of each date
  // displayed in the Calendar View
  populateSelectorMap(dateSelector) {
    let selectorId = dateSelector.getId();
    this.dateDirectivesMap.set(selectorId,dateSelector);
  }

  // Iterate through each date displayed in the View
  // and populate the ViewChildren in the dateDirectivesMap
  initSelectorMap() {
    this.dateSelectors.forEach((dateSelector) => {
      let selectorId = dateSelector.getId();
      let directiveDate = moment(selectorId,FORMAT);

      //Programmatically set the CSS Class to disable and enable the dates
      //Mario perfect cut is not opened on mondays =  || directiveDate.weekday() == 1
      if(directiveDate.isBefore(this.today,'day') || directiveDate.weekday() == 1) {
        dateSelector.setDisabled();
      } else {
        dateSelector.setEnabled();
      }
      this.populateSelectorMap(dateSelector);
    });
  }

  // Hook up into the life cycle method when the component is initialized.
  ngOnInit() {
    let nextMonth = moment();
    for(let index = 0; index <= NUM_OF_MONTHS; index++) {
      this.init(nextMonth);
      nextMonth = nextMonth.clone().month(nextMonth.month() + 1);
    }
    this.selectedDate = moment();
  }

  //Hook up into the life cycle method after View is Initialized
  //Programmatically Set the CSS classes to optimize the performance
  ngAfterViewInit() {
    this.initSelectorMap();
    //this.selectDate(this.currentDate);
    //this.selectToday(this.today);
  }

  // Open ticket confirmation view page
  public goToAppointmentConfirmationPage(date:String, heure:String) {
    this.nav.push(AppointmentConfirmationPage, { date: date, heure: heure });
  }

}
