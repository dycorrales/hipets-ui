import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { LoginComponent } from "../security/login/login.component";
import { LoginService } from "../security/login/login.service";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'hi-pets-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() headerComponent: HeaderComponent;

  constructor(public dialog: MatDialog, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      data: { email: "", password: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loginService.login(result.email, result.password)
        .subscribe(user => {
          this.router.navigate(['/animal-foradoption-list']);
        });
    });
  }
}
