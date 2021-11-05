import { Component, OnInit, Optional } from '@angular/core';
import {SignupService} from "../signup/signup.service";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public authStatus : any ;

  constructor(private loginService : LoginService , private router : Router, private snackbar: MatSnackBar, @Optional() public dialogRef?: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {

    var router = this.router ;
    this.authStatus = this.loginService.onAuth ;
    this.loginService.onAuth.subscribe((auth)=>{
      if(auth)
        {
          this.dialogRef?.close();
          router.navigate(['home']);
        }

    })
  }

  login(formValues : any)
  {
    this.loginService.login(formValues.email,formValues.password).subscribe((errorMsg)=>{
      this.snackbar.open(errorMsg, "OK", {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 3000
      });
    }) ;
  }
}
