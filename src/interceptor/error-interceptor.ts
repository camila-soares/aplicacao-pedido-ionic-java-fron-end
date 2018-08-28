import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS,} from '../../node_modules/@angular/common/http';
import { Observable } from 'rxjs/Rx';//IMPORTEANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/Storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
constructor(public storage:StorageService, public alertCtrl: AlertController){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo intercptor:");
            console.log(errorObj);

            switch(errorObj.status){
                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                case 422:
                this.handle422(errorObj);
                break;

                default:
                this.handleDefaultError(errorObj);
                break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    //funçao auxiliar para erro 403
    handle403(){
        this.storage.setLocalUser(null);
    }

    handle401(){
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha Inválidos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            //message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }


    handleDefaultError(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro' + errorObj.status + ':' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }
}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};