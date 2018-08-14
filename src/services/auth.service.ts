import { Injectable} from '@angular/core';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { HttpClient, HttpResponse } from '../../node_modules/@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { LocalUser } from '../models/local_user';
import { StorageService } from './Storage.service';

@Injectable()
export class AuthService {
    constructor(public http: HttpClient, public storage: StorageService){

    }
    private readonly newProperty = 'string';

    authenticate(creds: CredenciaisDTO){
       return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
             creds,
            {
                observe: 'response',
                responseType:'text'
            });
    }

    successfullLogin(authrizationValue : string){
        let tok = authrizationValue.substring(7);
        let user: LocalUser = {
            token: tok
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}