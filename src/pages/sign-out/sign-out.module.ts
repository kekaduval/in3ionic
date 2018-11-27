import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignOutPage } from './sign-out';

import { MobxAngularModule } from 'mobx-angular';

@NgModule({
  declarations: [
    SignOutPage,
  ],
  imports: [
    IonicPageModule.forChild(SignOutPage),
    MobxAngularModule
  ],
})
export class SignOutPageModule {}
