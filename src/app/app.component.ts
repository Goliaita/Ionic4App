import { Component } from '@angular/core';
import { Events, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from './service/fcm.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Environment } from '@ionic-native/google-maps';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})


export class AppComponent {

  public user = {
    firstName: '',
    lastName: '',
    url: '',
    type: ''
  };

  public appPages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private event: Events) {

    this.initializeApp();

    event.subscribe('parsing:data', (user) => {
      this.user = user;
      if (this.user.type === 'student') {
        this.appPages = [
          {title: 'Home', url: '/student-home', icon: 'home'},
          {title: 'Chat', url: '/chat-list', icon: 'chatbubbles'},
          {title: 'Lezioni svolte', url: '/lectures-list', icon: 'magnet'},
          {title: 'File lezioni', url: '/teaching-files', icon: 'document'},
          {title: 'Maps', url: '/google-maps', icon: 'compass'}
        ];
      } else {
        this.appPages = [
          {title: 'Home', url: '/professor-home', icon: 'home'},
          {title: 'Chat', url: '/chat-list', icon: 'chatbubbles'},
          {title: 'Lezioni svolte', url: '/lectures-list', icon: 'magnet'},
          {title: 'File lezioni', url: '/teaching-files', icon: 'document'},
          {title: 'Maps', url: '/google-maps', icon: 'compass'}
        ];

      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      /*Environment.setEnv({
          // api key for server
          'API_KEY_FOR_ANDROID_RELEASE': 'AIzaSyBf27ToMuqEn56IllNGusoKYNbhiJEolnA',

          // api key for local development
          'API_KEY_FOR_ANDROID_DEBUG': 'AIzaSyBf27ToMuqEn56IllNGusoKYNbhiJEolnA'
      });*/
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
/*
cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyBf27ToMuqEn56IllNGusoKYNbhiJEolnA" --variable API_KEY_FOR_IOS="AIzaSyBf27ToMuqEn56IllNGusoKYNbhiJEolnA"
*/
  }

}
