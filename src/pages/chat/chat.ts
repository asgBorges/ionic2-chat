import { Mensagem } from './../../model/mensagem';
import { LoginService } from './../../service/login.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  
  mensagem : string;
  lista : Mensagem[] = [];
  listaRef : any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private loginService: LoginService) {
    this.listaRef = this.loginService.getTableAsRef('chat');
  }

  scrollToBottom() {
        setTimeout(() => {
            this.content.scrollToBottom(300);
        });
  }

  observaLista() {
    this.loginService.getTableAsList('chat').subscribe(lista => {
      if (this.lista !== lista) {
        this.lista = lista;
        this.scrollToBottom();
      }  
    });
  }

  enviarMsg() {
    let msg : Mensagem = {
      usuario: this.loginService.getUsuario(),
      texto: this.mensagem,
      data: new Date().toString()
    };
    this.mensagem = "";
    this.listaRef.push(msg);
  }

  ionViewWillEnter() {
    this.observaLista();
  }

}
