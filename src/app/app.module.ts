import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { ErrorInterceptorProvider } from '../interceptor/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/Storage.service';
import { ClienteService } from '../services/cliente.service';
import { AuthInterceptorProvider } from '../interceptor/auth-interceptor';
import { ProdutoService } from '../services/domain/produto.service';
import { CartService } from '../services/domain/cart.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService, 
    StorageService,
    ClienteService,
    ProdutoService, 
    CartService
  ]
})
export class AppModule {}
