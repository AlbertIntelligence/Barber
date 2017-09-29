import {Injectable} from "@angular/core";
import {BARBERS} from "./mock-barbers";

@Injectable()
export class BarberService {
  private barbers: any;

  constructor() {
    this.barbers = BARBERS;
  }

  getAll() {
    return this.barbers;
  }

  getItem(id) {
    for (var i = 0; i < this.barbers.length; i++) {
      if (this.barbers[i].id === parseInt(id)) {
        return this.barbers[i];
      }
    }
    return null;
  }

  remove(item) {
    this.barbers.splice(this.barbers.indexOf(item), 1);
  }
}
