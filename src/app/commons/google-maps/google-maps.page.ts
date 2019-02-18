import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {
  CameraPosition,
  GoogleMap,
  GoogleMaps,
  LatLng,
  GoogleMapsAnimation,
  GoogleMapsEvent,
  Marker,
  MyLocation,
  GoogleMapOptions
} from '@ionic-native/google-maps/ngx';
import {Platform, ToastController} from '@ionic/angular';
import {load} from '@angular/core/src/render3';
import {Environment} from '@ionic-native/google-maps';
import {GetService} from '../../service/get.service';
import {Room} from '../../models/Room';


@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
})
export class GoogleMapsPage implements OnInit {

  map: GoogleMap;
  address:string;
  selectedRoom: Room = null;
  rooms: Array<Room>;

  constructor(
      public toastCtrl: ToastController,
      private platform: Platform,
      private getService: GetService) {

  }
  ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    this.selectedRoom = JSON.parse(this.platform.getQueryParam('selectedRoom'));
    this.getService.findAllRooms().subscribe(rooms=>{
      this.rooms = rooms;
      this.platform.ready().then(()=>{
        this.loadMap();
      });
    });
  }

  loadMap() {
    let pos = {
      lat: 40.334368,
      lng: 18.114241
    };

    Environment.setEnv({
      // api key for server
      'API_KEY_FOR_ANDROID_RELEASE': 'AIzaSyBf27ToMuqEn56IllNGusoKYNbhiJEolnA',

      // api key for local development
      'API_KEY_FOR_ANDROID_DEBUG': 'AIzaSyBf27ToMuqEn56IllNGusoKYNbhiJEolnA'
    });


    this.map = GoogleMaps.create('map_canvas');




    this.showSelectedRoom();

  }

  showSelectedRoom(){
    if(this.selectedRoom != null){
      let splitted = this.selectedRoom.location.split(',');
      this.map.addMarker({
        title: 'Aule: ' + this.selectedRoom.name,
        icon: 'red',
        animation: 'DROP',
        position: {
          lng: Number(splitted[0]),
          lat: Number(splitted[1])
        }
      });

      this.map.animateCamera({
        target: {
                  lng: Number(splitted[0]),
                  lat: Number(splitted[1])
                },
        duration: 3000,
        zoom: 20
      });
    }else{
      this.showAllMarker();
    }
  }


  showAllMarker() {
    this.rooms.forEach(room=>{
      let splitted = room.location.split(',');
      this.map.addMarker({
        title: 'Aule: ' + room.name,
        icon: 'blue',
        animation: 'DROP',
        position: {
          lng: Number(splitted[0]),
          lat: Number(splitted[1])
        }
      })
    });
    let target = this.rooms[0].location.split(',');
    this.map.animateCamera({
      target: {
        lng: Number(target[0]),
        lat: Number(target[1])
      },
      duration: 3000,
      zoom: 15
    });

  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
}
