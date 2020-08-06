import { Component } from '@angular/core';
import {  IonicPage, NavController, MenuController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { CredenciaisDTO } from '../../models/credenciais.dto';


@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {

    credss: CredenciaisDTO = {
        email: "",
        senha:""
    }

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        public auth: AuthService,
        public alertCtrl: AlertController) {}


        forgot(){
            this.auth.forgotPassWord(this.credss).subscribe(response => {
            this.showInsertOk()
            }, error => {
              let alert = this.alertCtrl.create({
                  title: 'Erro na validação',
                  message: 'Email inválido',
                  enableBackdropDismiss: false,
                  buttons: [
                      {
                          text: 'Ok',
                          handler: () => {
                              this.navCtrl.pop();   

                          }
                      }
                  ]
                 
              });      
              alert.present();    
             
            });
        }



        showInsertOk(){
            let alert = this.alertCtrl.create({
              title: 'Sucesso',
              message: 'Email enviado com sucesso!',
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: 'Ok',
                  handler: () => { 
                    this.navCtrl.pop();
                  }
                }
              ]
            });
            alert.present();
          }
    
}