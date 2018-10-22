import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
         MatButtonModule, MatCheckboxModule, MatGridListModule, MatTableModule, MatChipsModule, MatSelectModule,
         MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSortModule, MatCardModule, MatDialogModule
        } 
from '@angular/material';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import { ROUTES } from './app.routes';
import { LoginComponent } from './security/login/login.component';
import { AnimalForAdoptionListComponent } from './animal/animal-foradoption-list/animal-foradoption-list.component';
import { HeaderComponent } from './header/header.component';
import { AnimalAdoptedListComponent } from './animal/animal-adopted-list/animal-adopted-list.component';
import { AdoptionRequestListComponent } from './animal/adoption-request-list/adoption-request-list.component';
import { AdoptionStatusDialogComponent } from './animal/adoption-status-dialog/adoption-status-dialog.component';

import { AnimalService } from './animal/animal.service';
import { LoginService } from './security/login/login.service';
import { LoggedInGuard } from './security/loggedin.guard';
import { AuthInterceptor } from './security/auth.interceptor';
import { ApplicationErrorHandler } from './app.error-handler';
import { AnimalRegisterComponent } from './animal/animal-register/animal-register.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    AnimalForAdoptionListComponent,
    HeaderComponent,
    AnimalAdoptedListComponent,
    AdoptionRequestListComponent,
    AdoptionStatusDialogComponent,
    AnimalRegisterComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatChipsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatGridListModule ,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSortModule,
    RouterModule.forRoot(ROUTES),
    ToastrModule.forRoot()
  ],
  entryComponents: [
    AdoptionStatusDialogComponent,
    LoginComponent,
    AnimalRegisterComponent
  ],
  providers: [AnimalService, LoginService, LoggedInGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ApplicationErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
