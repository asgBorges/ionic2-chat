import { UtilidadesService } from './../shared/utilidades';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from './../pages/login/login';
import { RegistroPage } from './../pages/registro/registro';
import { ChatPage } from './../pages/chat/chat';

import { HomePage } from '../pages/home/home';

import { LoginService } from "../service/login.service";

@NgModule({
  declarations: [
    MyApp,
    ChatPage,
    LoginPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    LoginPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    UtilidadesService
  ]
})
export class AppModule {}
