import { FirestoreService } from './../../providers/firestore/firestore.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { VisitorStore } from '../../visitor.store';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  reasons = [
    "Meeting",
    "Event",
    "Cowork",
    "Tour",
    "Other"
  ]

  err = null;

  fetchedInfo: any = {};

  events$;
  members$;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private visitorStore: VisitorStore,
    private firestore: FirestoreService
  ) {
  }

  ionViewWillEnter(){
    console.log('ionViewEnterEnter SignInPage');
    this.fetchedInfo = this.navParams.get('visitorInfo');
    if (!this.fetchedInfo)
      this.fetchedInfo = {}
    this.events$ = this.firestore.getAllObjectsFromCollection('events');
    this.members$ = this.firestore.getAllObjectsFromCollection('members');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  signIn(signInForm) {
    console.log('signIn form: ', signInForm);
    console.log('signIn value: ', signInForm.value);
    if (!signInForm.valid) {
      for (let key in signInForm.value) {
        if (!signInForm.value[key])
          this.showToast(`No value entered for "${key}"`);
      }
    } else {
      this.visitorStore.signIn({ ...signInForm.value });
      this.showToast(`Welcome back, ${signInForm.value.name}!`);
      this.navCtrl.popToRoot();
    }
  }

  showToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle',
      cssClass: 'toast-message'
    }).present();
  }

  onInput(event) {
    // debugger
    // if (this.fetchedInfo.Info) 
  }
}
