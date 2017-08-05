import {Injectable} from "@angular/core";
import {PICTURES} from "./mock-pictures";

@Injectable()
export class GalleryService {
  private pictures: any;

  constructor() {
    this.pictures = PICTURES;
  }

  getAll() {
    return this.pictures;
  }

  getItem(id) {
    for (var i = 0; i < this.pictures.length; i++) {
      if (this.pictures[i].id === parseInt(id)) {
        return this.pictures[i];
      }
    }
    return null;
  }

  remove(item) {
    this.pictures.splice(this.pictures.indexOf(item), 1);
  }
}
