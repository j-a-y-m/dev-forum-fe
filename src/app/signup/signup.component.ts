import { Component, OnInit } from '@angular/core';
import {SignupService} from "./signup.service";
import {Router} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public authStatus : any ;

  constructor(private signupService : SignupService, private router : Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    var authStatus = this.authStatus ;
    var router = this.router ;
    authStatus = this.signupService.onAuth ;
    this.signupService.onAuth.subscribe({

      next(auth)
      {
        authStatus = auth ;
        if(auth)
        {
          router.navigate(['home']);
        }
      },
      error(e)
      {

      }
    })
  }

  signup(formValues : any)
  {
    this.signupService.signUp(formValues.email,formValues.password).subscribe((errorMsg)=>{
      this.snackbar.open(errorMsg, "OK", {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 3000
      });
    }) ; ;
  }
}
