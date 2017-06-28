import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { SQLStorage } from '../../providers/sql-storage';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the ModalAddTask page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-add-task',
  templateUrl: 'modal-add-task.html',
})
export class ModalAddTask {

  public taskDate;
  public taskStatus;
  public taskStat;
  public taskContent;
  public taskActivity;
  public taskDescription;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCrtl: ViewController
    , public db: SQLStorage, public toast: ToastController) {
    this.taskDate="";
    this.taskStatus="false";
    this.taskContent="";
    this.taskActivity="";
    this.taskDescription="";

  }

  closeModal(){
    this.viewCrtl.dismiss();
  }

  saveTask(){
    if(this.taskStatus=="true"){
      this.taskStat = 1;
    }else{
      this.taskStat = 0;
    }
    this.db.query('INSERT INTO taskTable (taskDate, taskActivity, taskDescription, taskContent, taskStatus) VALUES (?,?,?,?,?)',
    [this.taskDate,this.taskActivity,this.taskDescription,this.taskContent,this.taskStat]).then(result=>{
      console.log('O ID inserido é:' +result.res.insertID);
      this.showToast();
    }).catch(result =>{
      console.log("Erro na inserção")
    })
  }

  cancelAddTask(){
    this.closeModal();
  }

  showToast(){
    let mensagem= this.toast.create({
      message:'Tarefa Inserida com Sucesso',
      duration: 3000,
      position: 'bottom',
      showCloseButton: true
    });
    mensagem.present();
  }

}
