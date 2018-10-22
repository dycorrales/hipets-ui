import { ErrorHandler, Injectable, Injector, Inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler{
    
    constructor(@Inject(Injector) private readonly injector: Injector){
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if(errorResponse instanceof HttpErrorResponse){
            switch(errorResponse.status){
                case 401:
                    this.toastrService.error("Não autorizado", 'Error!', { onActivateTick: true });
                break;
                case 400:
                this.toastrService.error("Usuário inválido", 'Error!', { onActivateTick: true });
                break;
                case 403:
                    this.toastrService.error("Não autorizado", 'Error!', { onActivateTick: true });
                break;
                case 404:
                    this.toastrService.error("Recurso não encontrado", 'Error!', { onActivateTick: true });
                break;
                case 409:
                this.toastrService.error("Conflito na requisição", 'Error!', { onActivateTick: true });
                break;
                case 500:
                this.toastrService.error("Erro do servidor", 'Error!', { onActivateTick: true });
                break;
            }
        }

        super.handleError(errorResponse);
    }

    private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }

}