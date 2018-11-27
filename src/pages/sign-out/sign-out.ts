import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { VisitorStore } from './../../visitor.store';

@IonicPage()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-sign-out',
  templateUrl: 'sign-out.html',
})
export class SignOutPage {
  members

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public visitorStore: VisitorStore
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignOutPage');
  }

  search(value) {
    if(value.length > 2)
      this.visitorStore.setSignOutSearchText(value)
    else
      this.visitorStore.setSignOutSearchText('')
  }

  signOut(visitor) {
    console.log('signing out visitor: ', visitor);
    this.visitorStore.signOut(visitor);
    this.toastCtrl.create({
      message: `See you next time, ${visitor.name}!`,
      duration: 3000,
      position: 'middle',
      cssClass: 'toast-message'
    }).present();
    this.navCtrl.pop();
  }
}
