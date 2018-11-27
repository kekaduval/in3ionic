import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { first } from 'rxjs/operators';
import { FirestoreService } from './../../providers/firestore/firestore.service';

@IonicPage()
@Component({
  selector: 'page-return-visitor',
  templateUrl: 'return-visitor.html',
})
export class ReturnVisitorPage {

  nameOrEmail;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public firestore: FirestoreService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReturnVisitorPage');
  }

  lookup() {
    // Create and show the loading icon
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Searching...'
    });
    loading.present();

    if (!this.nameOrEmail) {
      this.showToast('Please enter a valid email or phone number');
      return
    }

    // if the user input is an email address
    if (this.validEmail(this.nameOrEmail)) {

      // look for the visitor's info in firestore
      this.firestore.getAllObjectsFromCollection('visitors', ref => ref.where('email', '==', this.nameOrEmail)).pipe(first()).subscribe(visitors => {
        debugger
        // if we found a visitor
        if (visitors.length > 0) {
          this.navCtrl.push('SignInPage', { visitorInfo: visitors[0] })
        } else
          this.showToast("Your information wasn't found");

        loading.dismiss();
      });
    } else {
      // look for the visitor's info in firestore
      this.firestore.getAllObjectsFromCollection('visitors', ref => ref.where('phone', '==', this.nameOrEmail)).pipe(first()).subscribe(visitors => {
        debugger
        // if we found a visitor
        if (visitors.length > 0) {
          this.navCtrl.push('SignInPage', { visitorInfo: visitors[0] })
        } else
          this.showToast("Your information wasn't found");

        loading.dismiss();
      });
    }
  }

  validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      cssClass: 'toast-message'
    });
    toast.present();
  }


  // onFieldInput(event) {
  //   if (this.nameOrEmail.replace(/[0-9\-]/g,'') <= 0) {
  //     debugger
  //   }
  // }
}
