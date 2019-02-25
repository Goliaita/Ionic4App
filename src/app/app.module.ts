import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt, 'it');

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {GetService} from './service/get.service';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {HttpClientModule} from '@angular/common/http';

import { Firebase } from '@ionic-native/firebase/ngx';

import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { environment } from '../environments/environment';
import { TeachingFilesPage } from './commons/teaching-files/teaching-files.page';
import { TeachingFilesPageModule } from './commons/teaching-files/teaching-files.module';
import { DatePipe } from '@angular/common';
import { FcmService } from './service/fcm.service';
import {GoogleMaps} from '@ionic-native/google-maps';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFireStorageModule,
      HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GetService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClientModule,
    FileTransfer,
    File,
    FileOpener,
    DatePipe,
    FcmService,
    Firebase,
    GoogleMaps,
    { provide: LOCALE_ID, useValue: 'it' }
  ],
  bootstrap: [AppComponent],
  exports: [],


})
export class AppModule {}
