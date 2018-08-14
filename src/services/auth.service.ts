import { Injectable} from '@angular/core';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { HttpClient, HttpResponse } from '../../node_modules/@angular/common/http';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthService {
    constructor(public http: HttpClient){

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
}