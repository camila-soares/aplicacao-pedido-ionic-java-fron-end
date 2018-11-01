import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { ClienteService } from '../../services/cliente.service';
import { Usuario } from '../../models/model';


/**
 * Generated class for the AutenticatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-autenticate',
  templateUrl: 'autenticate.html',
})
export class AutenticatePage {
  [x: string]: any;

  constructor(
     public clienteService: ClienteService,
     public facebook: Facebook) {
  }

  loginFacebook(){
    let permissions = new Array<string>();
    permissions = ['public_profile', 'email'];

    this.facebook.login(permissions)
    .then((response) => {
      let params = new Array<string>();

      this.facebook.api("/me?fields=name,email", params).then(res => {
          let usuario =  new Usuario();
          usuario.nome = res.name;
          usuario.email= res.email;
          usuario.codigo = res.id;
          usuario.login = res.email;
          usuario.senha = res.senha;

        this.logar(usuario);
      }, (error) => {
        alert(error);
        console.log('ERRO LOGIN', error);
      })
    }, (error) => {
      alert(error)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutenticatePage');
  }

  logar(usuario: Usuario){
    this.salvarService.salvarFacebook(usuario).then(() => {
    console.log('Usuario cadastrado via facebook');
    })
  }

}
