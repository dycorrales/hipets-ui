import { Component, OnInit } from '@angular/core';
import { User } from '../security/login/user.model';
import { LoginService } from '../security/login/login.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from "../security/login/login.component";
import { Router } from '@angular/router';

@Component({
  selector: 'hi-pets-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  active = false;
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(private loginService: LoginService, public dialog: MatDialog, private router: Router) { }

  activeItem(){
    this.active = true;
  }

  isLogged(): Boolean{
    return this.loginService.isLogged();
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

  logout(){
    this.loginService.logout();
    this.router.navigate(['']);
  }

  ngOnInit() {
  }

}
