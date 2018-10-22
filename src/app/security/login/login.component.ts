import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Login } from './login.model'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'hi-pets-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Login) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
  }

  save(){
    if(this.loginForm.value.email !== "" && this.loginForm.value.password != "")
      this.dialogRef.close(this.loginForm.value);
  }
}
