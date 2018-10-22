import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HI_PETS_API } from '../../app.api';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { User } from './user.model';

@Injectable()
export class LoginService {
    user: User;

    constructor(private http: HttpClient, private router: Router) {

    }

    handleLoggin(){
        this.router.navigate(['']);
    }

    isLogged(): boolean {
        return this.user !== undefined;
    }

    logout(){
        return this.user = undefined;
    }

    isAdmin(): Boolean{
        return this.user.isAdmin;
    }

    login(email: string, password: string): Observable<any> {
        return this.http
            .post<any>(`${HI_PETS_API}/login`, { email: email, password: password })
            .do((result: any) => this.user = 
                    { email: email, name: email, accessToken: result.data.access_token, id: result.data.userId, isAdmin: result.data.isAdmin }
                );
    }
}