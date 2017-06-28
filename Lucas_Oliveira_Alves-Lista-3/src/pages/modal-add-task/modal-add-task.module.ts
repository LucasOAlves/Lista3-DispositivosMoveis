import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddTask } from './modal-add-task';

@NgModule({
  declarations: [
    ModalAddTask,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddTask),
  ],
  exports: [
    ModalAddTask
  ]
})
export class ModalAddTaskModule {}
