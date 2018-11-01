import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutenticatePage } from './autenticate';

@NgModule({
  declarations: [
    AutenticatePage,
  ],
  imports: [
    IonicPageModule.forChild(AutenticatePage),
  ],
})
export class AutenticatePageModule {}
