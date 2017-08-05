import {Component} from "@angular/core";
import {GalleryService} from "../../services/gallery-service";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})
export class GalleryPage {

  public pictures: any;

  constructor(public galleryService: GalleryService) {
    this.pictures = galleryService.getAll();
  }
}
