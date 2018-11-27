import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirestoreService } from '../../providers/firestore/firestore.service';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firestore: FirestoreService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.firestore.signIn(this.email, this.password)
      .then(authData => {
        debugger
        this.navCtrl.setRoot(HomePage);
      })
      .catch((e) => {
        debugger
        console.error('The following error occurred: ', e);
        alert('An error occurred while attempting to login');
      });
  }
}
