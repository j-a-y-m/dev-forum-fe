import { Component, OnInit } from '@angular/core';
import {SignupService} from "./signup.service";
import {Router} from "@angular/router";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public authStatus : any ;

  constructor(private signupService : SignupService, private router : Router) { }

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
    this.signupService.signUp(formValues.email,formValues.password) ;
  }
}
