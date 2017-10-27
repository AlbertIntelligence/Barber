import {Component} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {BarberService} from "../../services/barber-service";

declare var google: any;
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-barber-location',
  templateUrl: 'barber-location.html'
})
export class BarberLocation {
  // barber info
  public barber: any;
  // Map
  public map: any;


  constructor(public nav: NavController, public barberService: BarberService, public platform: Platform) {
    // set sample data
    this.barber = barberService.getItem(1);
  }

  /*****************************************************************************
  Function: ionViewDidLoad
  Description: Triggers specific functions when page is loaded
  Parameters: None
  Return: None
  *****************************************************************************/
  ionViewDidLoad() {
    // init map
    this.initializeMap();
  }

  /*****************************************************************************
  Function: presentAlert
  Description: Set up the map view
  Parameters: None
  Return: None
  *****************************************************************************/
  initializeMap() {
    let latLng = new google.maps.LatLng(this.barber.location.lat, this.barber.location.lon);

    let mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false
    }

    this.map = new google.maps.Map(document.getElementById("map-detail"), mapOptions);
    new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    // refresh map
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 300);
  }


}
