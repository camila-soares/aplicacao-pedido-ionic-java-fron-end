import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS,} from '../../node_modules/@angular/common/http';
import { Observable } from 'rxjs/Rx';//IMPORTEANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/Storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
constructor(public storage:StorageService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('passou');
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo intercptor");
            console.log(errorObj);

            switch(errorObj.status){
                case 403:
                this.handle403();
                break;
            }

            return Observable.throw(error);
        }) as any;
    }

    //funçao auxiliar para erro 403
    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};