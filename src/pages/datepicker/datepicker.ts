import { Component, Directive, Input, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { DatePickerService } from './datepicker.service';
import moment from 'moment';
import {DatePickerModel} from './DatePickerModel';

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
  private slideOptions:any;
  private previousDate:any;
  private currentDate:any;
  private currentHour:any;
  private currentMinutes:any;
  private focusOnpreviousDate:Boolean = false;
  private appointments:DatePickerModel = new DatePickerModel();

  // A Map where key = 'DD-MMM-YYYY' and Value as the ViewChild Reference of the date element displayed in the
  // calendar view
  public dateDirectivesMap:Map<String,DateSelectorDirective> = new Map<String,DateSelectorDirective>();

  // Get All the  ViewChild References of the date element displayed in the
  // calendar view
  @ViewChildren(DateSelectorDirective) dateSelectors:QueryList<DateSelectorDirective>;
  constructor(public datePickerService:DatePickerService) {
    this.weekNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    this.today = moment();
    this.currentDate = this.today.clone();
    this.currentHour = this.appointments.getFirstHourAvailable();
    this.currentMinutes = '00';
    var d = new Date("Fri 30 2017");
    this.disableDate(d);
  }

  //Increase hour value
  increaseHour() {
    let nextHour = this.appointments.getNextHourAvailable();
    if (nextHour != null) {
      this.currentHour = nextHour;
    } else {
      //To be completed : Display Plus aucune autre plage horaire disponible.
    }
  }

  //Decrease hour value
  decreaseHour() {
    let previousHour = this.appointments.getPreviousHourAvailable();
    if (previousHour != null) {
      this.currentHour = previousHour;
    } else {
      //To be completed : Display Plus aucune autre plage horaire disponible.
    }
  }

  //Change the minutes value
  changeMinutes() {
    if (this.currentMinutes == '00') {
      this.currentMinutes = '30';
    } else if (this.currentMinutes == '30') {
      this.currentMinutes = '00';
    }
  }

  //Save appointment in database
  getAppointment() {
    var date = this.currentDate.toString().substring(0, 10) + ", " + this.currentHour + " : " + this.currentMinutes;
    (this.appointments.isAvailable(date)) ? this.appointments.createNew(date) : alert("Réservation impossible !");
  }

  // Disable date in parameter
  disableDate(date) {
    if(date) {
      let selectorKey = this.getSelectorKey(date);
      this.dateDirectivesMap.get(selectorKey).setDisabled();
    }
  }

  // Enable date in parameter
  enableDate(date) {
    if(date) {
      let selectorKey = this.getSelectorKey(date);
      this.dateDirectivesMap.get(selectorKey).setEnabled();
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

  /*
  // Programmatically set the CSS Classes on the dates displayed in the Calendar View
  checkInSelected() {
    this.dateSelectors.forEach((dateSelector) => {
      //console.log(dateSelector.getId());
      let selectorId = dateSelector.getId();
      let directiveDate = moment(selectorId,FORMAT);

      if(directiveDate.isBefore(this.previousDate,'day')) {
        dateSelector.setDisabled();
      } else {
        dateSelector.setEnabled();
      }
    });
  }

  // Programmatically set the CSS Classes on the dates displayed in the Calendar View
  checkoutSelected() {
    this.dateSelectors.forEach((dateSelector) => {
      //console.log(dateSelector.getId());
      let selectorId = dateSelector.getId();
      let directiveDate = moment(selectorId,FORMAT);

      if(directiveDate.isBefore(this.today,'day')) {
        dateSelector.setDisabled();
      } else if (!directiveDate.isSame(this.currentDate,'day')) {
        dateSelector.setEnabled();
      }
      if(directiveDate.isSame(this.previousDate,'day')){
        dateSelector.setInRange('right');
      } else if(directiveDate.isAfter(this.previousDate,'day') && directiveDate.isBefore(this.currentDate,'day')) {
        dateSelector.setInRange('full');
      } else if(directiveDate.isSame(this.currentDate,'day')){
        dateSelector.setInRange('left');
      }

    });
  }*/

  select(monthObj,selectedDate,rowIndex) {
    //let self = this;
    let day = moment(selectedDate.id,FORMAT);

    /*if((!this.focusOnpreviousDate
      && day.isBefore(this.previousDate,'day'))
      || day.isBefore(this.today,'day')
      || day.isSame(this.previousDate,'day')) {
        return;
    }*/

    // previousDate Is Selected Again
    /*if(this.focusOnpreviousDate) {
      this.clearSelectedDate(this.previousDate);
      this.clearSelectedDate(this.currentDate);
      this.selectDate(day);
      this.previousDate = day;
      setTimeout(() => {
        self.checkInSelected();
      });
      this.currentDate = null;
      this.focusOnpreviousDate = false;
    } else { // currentDate is Selected
      this.selectDate(day);
      this.currentDate = day;
      this.focusOnpreviousDate = true;
      setTimeout(() => {
        self.checkoutSelected();
      });
    }*/
    this.clearSelectedDate(this.currentDate);
    this.currentDate = day;
    this.selectDate(day);
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
      //console.log(dateSelector.getId());
      let selectorId = dateSelector.getId();
      let directiveDate = moment(selectorId,FORMAT);
      //Programmatically set the CSS Class to disable and enable the dates
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
