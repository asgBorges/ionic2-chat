import { PasswordValidator } from './../../directives/password-validator.directive';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LoginService } from "../../service/login.service";
import { ChatPage } from './../chat/chat';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  f: FormGroup;
  nome: AbstractControl;
  email: AbstractControl;
  senha: AbstractControl;
  confirmaSenha: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private loginService: LoginService,
    private alertCtrl: AlertController,
    private builder: FormBuilder) {

    this.f = builder.group({
      'nome': ['', [Validators.required, Validators.minLength(3)]],
      'email': ['', [Validators.required, Validators.pattern(".+@.+")]],
      'senha': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      'confirmaSenha': ['', Validators.required]
    }, { 'validator': PasswordValidator.isMatching });

    this.email = this.f.controls['email'];
    this.nome = this.f.controls['nome'];
    this.senha = this.f.controls['senha'];
    this.confirmaSenha = this.f.controls['confirmaSenha'];
  }

  registra(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Fazendo o registro'
    });
    loading.present();
    console.log("registro.registra()",this.loginService.usuario);
    this.loginService.usuario.email = form.value.email;
    this.loginService.usuario.nome = form.value.nome;
    this.loginService.usuario.senha = form.value.senha;

    this.loginService.signIn()
      .then(data => {
        loading.dismiss();
        })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Falha no registro',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
