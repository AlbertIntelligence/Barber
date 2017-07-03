import { Component, Directive, Input, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import moment from 'moment';
import {DatePickerModel} from './DatePickerModel';
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';

const NUM_OF_DAYS = 7;
const NUM_OF_MONTHS = 12;
const FORMAT = 'DD-MMM-YYYY';

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

@Component({
  selector:'datepicker',
  templateUrl: 'datepicker.html',
})
export class DatePickerComponent {
  private weekNames:Array<String>;
  private selectedDate:any;
  private today:any;
  private months:Array<any> = [];
  private currentDate:any;
  private currentHour:any = "10";
  private currentMinutes:any = "00";
  private appointments:DatePickerModel;
  private errorMessage:String;
  private conflictMessageClasses:any = { 'conflictMessageOn': false, 'conflictMessageOff': true };
  private openingHour:String;
  private closingHour:String;

  // A Map where key = 'DD-MMM-YYYY' and Value as the ViewChild Reference of the date element displayed in the
  // calendar view
  public dateDirectivesMap:Map<String,DateSelectorDirective> = new Map<String,DateSelectorDirective>();

  // Get All the  ViewChild References of the date element displayed in the
  // calendar view
  @ViewChildren(DateSelectorDirective) dateSelectors:QueryList<DateSelectorDirective>;
  constructor(public alertCtrl: AlertController) {
    this.appointments = new DatePickerModel();
    this.weekNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    this.today = moment();
    this.currentDate = this.today.clone();
    this.setDefaultHour();
    this.openingHour = this.appointments.getBusinessHours(this.currentDate).Opening + "h";
    this.closingHour = this.appointments.getBusinessHours(this.currentDate).Closure + "h";
    this.updateDataSnapshot();
  }

  //Increase hour value
  increaseHour() {
    var closingHour = parseFloat(this.appointments.getBusinessHours(this.currentDate).Closure);
    if (closingHour > (parseFloat(this.currentHour) + 1)) {
      this.currentHour = parseInt(this.currentHour) + 1;
      this.verifyAvailibility();  //check if hour is available
    } else {
      //To be completed : Display Heure de fermeture
      this.displayConflictMessage("Heures d'ouverture : " + this.openingHour + " - " + this.closingHour);
    }
  }

  //Decrease hour value
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

  //Change the minutes value
  changeMinutes() {
    this.currentMinutes = (this.currentMinutes == '00') ? '30' : '00';
    this.verifyAvailibility();
  }

  //Display the correct message if hour and date is available or not
  displayConflictMessage (errorMessage) {
    this.errorMessage = errorMessage;
    this.conflictMessageClasses = { 'conflictMessageOn': true, 'conflictMessageOff': false };
  }

  //Check if time selected is available
  verifyAvailibility () {
    this.conflictMessageClasses = { 'conflictMessageOn': false, 'conflictMessageOff': true };
    var hour = this.currentHour + " : " + this.currentMinutes;
    if (!this.appointments.isAvailable(this.currentDate.format(FORMAT), hour))
        this.displayConflictMessage("Cette plage horaire n'est plus disponible.");
  }

  //Find the first available hour in date selected
  setDefaultHour() {
    var hour = this.appointments.getBusinessHours(this.currentDate).Opening;
    this.currentHour = hour.toString().substring(0, 2);
    this.currentMinutes = (this.currentHour.toString().length > 2) ? "30" : "00";
  }

  //Database event listener
  updateDataSnapshot() {
    let controller = this;
    firebase.database().ref('Appointments/')
     .on('value', function(snapshot) {
       controller.verifyAvailibility();
       controller.appointments.getDaysBooked();
     });
  }

  //Save appointment in database
  getAppointment() {
    var date = this.currentDate.format(FORMAT);
    var hour = this.currentHour + " : " + this.currentMinutes;
    (this.appointments.isAvailable(date, hour)) ? this.appointments.createNew(date, hour) : this.showAlert();
    this.disableBookedDays();
  }

  //Display alert when user clicks on get appointment and date/hour is not available
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Réservation impossible !',
      subTitle: 'Veuillez choisir une autre plage horaire.',
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
      if(directiveDate.isBefore(this.today,'day')) {
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
    this.selectDate(this.currentDate);
    this.selectToday(this.today);
  }

}
