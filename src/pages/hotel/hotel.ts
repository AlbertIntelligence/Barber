import {Component} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {AppointmentPage} from "../appointment/appointment";

declare var google: any;
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-hotel',
  templateUrl: 'hotel.html'
})
export class HotelPage {
  // list of hotels
  public hotels: any;
  // Map
  public map: any;

  constructor(public nav: NavController, public hotelService: HotelService, public platform: Platform) {
    // set sample data
    this.hotels = hotelService.getAll();
  }

  ionViewDidLoad() {
    // init map
    this.initializeMap();
  }

  // view hotel detail
  viewHotel(hotelId) {
    this.nav.push(AppointmentPage, {id: hotelId});
  }

  initializeMap() {
    let latLng = new google.maps.LatLng(this.hotels[0].location.lat, this.hotels[0].location.lon);

    let mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false
    }

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // add markers to map by hotel
    for (let i = 0; i < this.hotels.length; i++) {
      let hotel = this.hotels[i];
      new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(hotel.location.lat, hotel.location.lon)
      });
    }

    // refresh map
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 300);
  }

  // view all hotels
  viewHotels() {
    this.nav.push(HotelPage);
  }
}
