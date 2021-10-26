import { Component, OnInit } from '@angular/core';
import {SignupService} from "../signup/signup.service";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public authStatus : any ;

  constructor(private loginService : LoginService , private router : Router) { }

  ngOnInit(): void {

    var router = this.router ;
    this.authStatus = this.loginService.onAuth ;
    this.loginService.onAuth.subscribe({

      next(auth)
      {
        //authStatus = auth ;
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

  login(formValues : any)
  {
    this.loginService.login(formValues.email,formValues.password) ;
  }
}
