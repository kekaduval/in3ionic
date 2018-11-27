import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Insomnia } from '@ionic-native/insomnia';

import { MobxAngularModule } from 'mobx-angular';

// ANGULARFIRE
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from '../pages/login/login.module';
import { FirestoreService } from '../providers/firestore/firestore.service';
import { VisitorStore } from '../visitor.store';

const firebaseConfig = {
  apiKey: "AIzaSyDfu-PKZ1zO8POkdlrSWG36pLZEtbH5cz8",
  authDomain: "in3-signin-6aade.firebaseapp.com",
  databaseURL: "https://in3-signin-6aade.firebaseio.com",
  projectId: "in3-signin-6aade",
  storageBucket: "in3-signin-6aade.appspot.com",
  messagingSenderId: "304020654791"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MobxAngularModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AndroidFullScreen,
    Insomnia,
    AngularFirestore,
    FirestoreService,
    VisitorStore
  ]
})
export class AppModule { }
