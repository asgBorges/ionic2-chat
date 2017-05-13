import firebase from 'firebase';
import { LoginService } from './../service/login.service';
import { RegistroPage } from "../pages/registro/registro";
import { LoginPage } from "../pages/login/login";
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ChatPage } from './../pages/chat/chat';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  isAuthenticated: boolean;
  chatPage = ChatPage;
  loginPage = LoginPage;
  registroPage = RegistroPage;
  @ViewChild('nav') nav: NavController;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl: MenuController, 
    private loginService: LoginService) {

    firebase.initializeApp({
      apiKey: "AIzaSyCgy94l8484VbDzrY2zaR909AO8YVHC0Ho",
      authDomain: "chat-799e7.firebaseapp.com",
      databaseURL: "https://chat-799e7.firebaseio.com",
      projectId: "chat-799e7",
      storageBucket: "chat-799e7.appspot.com",
      messagingSenderId: "912399830090"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loginService.preencheUsuarioLogado(user.email);
        this.isAuthenticated=true;
        this.rootPage = ChatPage;
      } else {
        this.isAuthenticated=false;
        this.rootPage = LoginPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  carrega(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  logout() {
    this.loginService.logOut();
    this.menuCtrl.close();
    this.nav.setRoot(LoginPage);
  }
  

}

