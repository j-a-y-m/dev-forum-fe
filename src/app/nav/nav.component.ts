import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Route, Router} from "@angular/router";
import firebase from "firebase";


import {Observable} from "rxjs";
import UserInfo = firebase.UserInfo;
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {NewQuestionComponent} from "../new-question/new-question.component";
import { LoginComponent } from '../login/login.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public authStatus : any ;
  constructor(private auth : AngularFireAuth,
              private router : Router,
              private http : HttpClient,
              private matDialog : MatDialog
              ) {
    this.authStatus = this.auth.authState ;
  }

  ngOnInit(): void {
  }

  login(){
    this.matDialog.open(LoginComponent);
  }

   logout()
  {

    this.auth.authState.subscribe({
    next(user)
    {}
    });
    this.auth.signOut().then(()=>{
      // location.reload();
      // this.router.navigate(["login"])//.then(()=>{
        // location.reload();
      // });
    }) ;


  }

  signUp()
  {
    this.router.navigate(["signup"])
  }

  askQuestion()
  {
    this.matDialog.open(NewQuestionComponent);
  }

  request()
  {
    this.http.post(environment.baseUrl+"/test",{test: "this is a post test from client"}).pipe(take(1)).subscribe({
      next(){
        console.log("post to /test");
      }
    });
  }

}
