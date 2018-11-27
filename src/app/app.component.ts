import { Insomnia } from '@ionic-native/insomnia';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { FirestoreService } from './../providers/firestore/firestore.service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private androidFullScreen: AndroidFullScreen,
    private insomnia: Insomnia,
    private firestore: FirestoreService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      androidFullScreen.immersiveMode();
      insomnia.keepAwake();
    });

    // if (!platform.is('tablet')) {
    //   this.rootPage = 'NoTabletPage';
    // }

    firestore.auth.onAuthStateChanged((user) => {
      if (user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }
}

