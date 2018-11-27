import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VisitorStore } from '../../visitor.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public visitorStore: VisitorStore
  ) {
  }

  signIn() {
    console.log('signIn clicked');
    this.navCtrl.push('SignInPage');
  }

  signOut() {
    console.log('signOut clicked');
    this.navCtrl.push('SignOutPage');
  }

  visitorLookup() {
    this.navCtrl.push('ReturnVisitorPage');
  }
}
