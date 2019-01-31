import {Component} from '@angular/core';

import {Events, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      console.log("HELLO")
    this.initializeApp();
    event.subscribe('parsing:data', (user) => {
      user.url = user.url.substr(1).slice(0, -1);
      this.user = user;
      if(this.user.type == 'student') {
        this.appPages = [
          {title: 'Home', url: '/' + this.user.type + '-home', icon: 'home'},
          {title: 'Chat', url: '/chat-page', icon: 'chatbubbles'},
          {title: 'Gradimento', url: '/approval', icon: 'star'}
        ];
      }else{
        this.appPages = [
          {title: 'Home', url: '/' + this.user.type + '-home', icon: 'home'},
          {title: 'Chat', url: '/chat-page', icon: 'chatbubbles'}
          ];
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

}
