import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDetail } from './modal-detail';

@NgModule({
  declarations: [
    ModalDetail,
  ],
  imports: [
    IonicPageModule.forChild(ModalDetail),
  ],
  exports: [
    ModalDetail
  ]
})
export class ModalDetailModule {}
