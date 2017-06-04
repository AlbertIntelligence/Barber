import {Injectable} from "@angular/core";
import {FLIGHTS} from "./mock-flights";

@Injectable()
export class FlightService {
  private flights: any;

  constructor() {
    this.flights = FLIGHTS;
  }

  getAll() {
    return this.flights;
  }

  getItem(id) {
    for (var i = 0; i < this.flights.length; i++) {
      if (this.flights[i].id === parseInt(id)) {
        return this.flights[i];
      }
    }
    return null;
  }

  remove(item) {
    this.flights.splice(this.flights.indexOf(item), 1);
  }
}
