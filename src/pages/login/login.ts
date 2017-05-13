import { LoginService } from './../../service/login.service';
import { AutenticacaoService } from './../../services/autenticacao.service';
import { NgForm } from '@angular/forms/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private loginService: LoginService) {
  }

  signin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Fazendo o login'
    });
    loading.present();
    this.loginService.usuario.email = form.value.email;
    this.loginService.usuario.senha = form.value.senha;

    this.loginService.logIn(form.value.email, form.value.senha)
      .then(data => {
        loading.dismiss();
        })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Falha no login',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }


}
