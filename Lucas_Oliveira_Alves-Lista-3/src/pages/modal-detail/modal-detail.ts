import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SQLStorage } from '../../providers/sql-storage'

/**
 * Generated class for the ModalDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-detail',
  templateUrl: 'modal-detail.html',
})
export class ModalDetail {

  public taskDate;
  public taskStatus;
  public taskStat;
  public taskStatusBd;
  public taskContent;
  public taskActivity;
  public taskActivityTrabalho;
  public taskActivityProva;
  public taskDescription;
  public taskId;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCrtl: ViewController
    , public toast: ToastController, public db: SQLStorage) {
    this.taskDate="";
    this.taskStatus="";
    this.taskContent="";
    this.taskActivity="";
    this.taskDescription="";
    this.taskStat="";
    this.taskId = this.navParams.get('taskId');
    this.getTask();
  }

  closeModal(){
    this.viewCrtl.dismiss();
  }

  getTask(){
    this.db.query('SELECT * FROM taskTable WHERE id = ?',[this.taskId]).then( resposta => {
      let resultado = resposta.res.rows;
      this.taskDate = resultado.item(0).taskDate;
      this.taskActivity = resultado.item(0).taskActivity;
      this.taskDescription = resultado.item(0).taskDescription;
      this.taskContent = resultado.item(0).taskContent;
      if(resultado.item(0).taskStatus === 0){
        this.taskStatusBd = "false";
      }else{
        this.taskStatusBd = "true";
      }
      if(this.taskActivity == "trabalho"){
        this.taskActivityTrabalho = "true";
        this.taskActivityProva = "false";
      }else if(this.taskActivity == "prova"){
        this.taskActivityTrabalho = "false";
        this.taskActivityProva = "true";
      }

    })
  }

  updateTask(){
    if(this.taskStatus){
      this.taskStat = 1;
    }else {
      this.taskStat = 0;
    }

    this.db.query('UPDATE taskTable SET taskDate = ?, taskActivity = ?, taskDescription = ?, taskContent = ?, taskStatus = ? WHERE id = ?',
    [this.taskDate,this.taskActivity,this.taskDescription,this.taskContent,this.taskStat, this.taskId]).then(result=>{
      this.showToast();
    }).catch(result =>{
      console.log('Erro ao atualizar');
    })
  }

  deleteTask(){
    this.db.query('DELETE FROM taskTable WHERE id = ?',[this.taskId]).then(result=>{
      console.log('Tarefa deletada com sucesso');
      this.cancelAddTask();
    }).catch(result =>{
      console.log('Erro ao deletar');
    })
  }
  cancelAddTask(){
    this.closeModal();
  }

  showToast(){
    let mensagem= this.toast.create({
      message:'Tarefa Atualizada com Sucesso',
      duration: 3000,
      position: 'bottom',
      showCloseButton: true
    });
    mensagem.present();
  }


}
