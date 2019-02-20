import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ToastController } from '@ionic/angular';

import * as app from 'firebase';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FcmService {


  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    // Bind methods to fix temporary bug in AngularFire
    /*     try {
          const _messaging = app.messaging();
          _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
          _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        } catch (e) {} */
  }

  subscribeToTopic(topic) {
    this.platform.ready().then(() => {
      this.firebaseNative.subscribe(topic)
        .catch((e) => console.log(e)).then(() => console.log(topic));
    });
  }

  subscribeNotifications(person) {
    // Get a FCM token
    this.getToken(person.personId);
    const fullName = person.firstName + ' ' + person.lastName;
    // Listen to incoming messages
    this.listenToNotifications().pipe(
      tap(async msg => {
        if (await (fullName === msg.title)) {
          console.log(fullName + ' == ' + msg.title);
        } else {
          console.log(fullName + ' != ' + msg.title);
          // show a toast
          await console.log(msg);
          const toast = await this.toastController.create({
            message: `${msg.title}: ${msg.body}`,
            duration: 5000,
            position: 'top'
          });
          toast.present();
        }
      })
    ).subscribe();
  }

  async getToken(id) {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    if (!this.platform.is('mobile')) {
      console.log('web notification');
    }

    return this.saveTokenToFirestore(token, id);
  }

  private saveTokenToFirestore(token, id) {
    if (!token) { return; }

    const devicesRef = this.afs.collection('devices');
    const docData = {
      token,
      userId: id
    };

    return devicesRef.doc(token).set(docData);
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

}
