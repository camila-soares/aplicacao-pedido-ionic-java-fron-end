import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
          nome: ['Camila', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
          email: ['camila@gmail.com', [Validators.required, Validators.email]],
          tipo: ['1', [Validators.required]],
          cpfOuCnpj: ['08146639402', [Validators.required]],
          senha: ['1234', [Validators.required]],
          logradouro:['rua rio apa', [Validators.required]],
          numero:['60', [Validators.required]],
          complemento:['apt 2', [Validators.required]],
          bairro:['agua fria', [Validators.required]],
          cep:['52211-370', [Validators.required]],
          telefone1:['995346681', [Validators.required]],
          telefone2:['', [Validators.required]],
          telefone3:['', [Validators.required]],
          estadoId:[null, [Validators.required]],
          cidadeId:[null, [Validators.required]],
      });
  }

  signupUser(){
    console.log('enviou o form');
  }

  
}
