import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
    private authService: AuthService
  ) { }

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
