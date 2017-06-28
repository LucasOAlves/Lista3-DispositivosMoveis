import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLStorage } from '../../providers/sql-storage';
import { ModalController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tasks;

  constructor(public navCtrl: NavController, public db: SQLStorage, public modalCrtl: ModalController, public navParams: NavParams) {
    this.tasks=[];
    // Cria banco de dados:
    this.db.create('Lucas_Oliveira_Alves-Lista-3');

    // Descreve cada tabela necessária
    //let tabela = 'tarefas(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo text)';
    let sqlCreateTable = 'taskTable(id INTEGER PRIMARY KEY AUTOINCREMENT, taskDate TEXT, taskActivity TEXT, taskDescription TEXT, taskContent TEXT, taskStatus INTEGER)';

    //Cria tabela se nao existir, no storage local ou nativo.
    //this.db.query(`CREATE TABLE IF NOT EXISTS ${tabela}`).then(data =>{
      //console.log("Tabela criada com sucesso!");
    //});

    this.db.query(`CREATE TABLE IF NOT EXISTS ${sqlCreateTable}`).then(data=>{
      //console.log("Tabela criada com sucesso!");
    })
    this.getTask();
  }

  getTask(){
    this.tasks=[];
    this.db.query('SELECT * FROM taskTable').then( resposta => {
      let resultado = resposta.res.rows;
      for(let i=0; i<resultado.length; i++){
        this.tasks.push({
          id: resultado.item(i).id,
          taskDate: resultado.item(i).taskDate,
          taskActivity: resultado.item(i).taskActivity,
          taskDescription: resultado.item(i).taskDescription,
          taskContent: resultado.item(i).taskContent
        })
      }
    })
  }

  openDetail(id){
    let modal = this.modalCrtl.create('ModalDetail', {
      taskId: id
    });
    modal.onDidDismiss(()=>{
      this.getTask();
    });
    modal.present();

  }

  openModalAddTask(){
     let modal = this.modalCrtl.create('ModalAddTask');
     modal.onDidDismiss(() => {
      this.getTask();
    });
     modal.present();
  }
}
