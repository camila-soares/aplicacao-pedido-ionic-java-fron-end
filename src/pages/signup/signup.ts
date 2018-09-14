import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDto } from '../../models/cidade.dto';
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
  estados: EstadoDTO[];
  cidades: CidadeDto[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {

      this.formGroup = this.formBuilder.group({
          nome: ['Camila', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
          email: ['camila@gmail.com', [Validators.required, Validators.email]],
          tipo: ['1', [Validators.required]],
          cpfOuCnpj: ['08146639402', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
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
ionViewDidLoad(){
  this.estadoService.findAll()
  .subscribe(response => {
    this.estados = response;
    this.formGroup.controls.estadoId.setValue(this.estados[0].id);
    this.updateCidades();
  },
  error => {});
}

updateCidades(){
  let estado_id = this.formGroup.value.estadoId;
  this.cidadeService.findAll(estado_id)
  .subscribe(response => {
    this.cidades = response;
    this.formGroup.controls.cidadeId.setValue(null);
  })
}

  signupUser(){
    console.log('enviou o form');
  }

  
}
