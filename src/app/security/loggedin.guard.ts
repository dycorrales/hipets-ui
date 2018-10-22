import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService){

    }

    checkAuthentication(): boolean{
        const loggedIn = this.loginService.isLogged();

        if(!loggedIn){
            this.loginService.handleLoggin();
        }

        return loggedIn;
    }

    canLoad(): boolean{
        return this.checkAuthentication();
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
        return this.checkAuthentication();
    }
}