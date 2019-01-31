import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {GetService} from './service/get.service';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {HttpClientModule} from '@angular/common/http';

import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx'
import {DocumentViewer} from '@ionic-native/document-viewer/ngx'
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { environment } from '../environments/environment';


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
    DocumentViewer,
    FileOpener
  ],
  bootstrap: [AppComponent],


})
export class AppModule {}
