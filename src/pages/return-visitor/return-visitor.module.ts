import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReturnVisitorPage } from './return-visitor';

@NgModule({
  declarations: [
    ReturnVisitorPage,
  ],
  imports: [
    IonicPageModule.forChild(ReturnVisitorPage),
  ],
})
export class ReturnVisitorPageModule {}
