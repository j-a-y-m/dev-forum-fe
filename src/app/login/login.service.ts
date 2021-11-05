import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {concat, Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth : AngularFireAuth,private http :HttpClient) { }
  public onAuth = new Observable((subscriber => {

    this.auth.authState.subscribe({
      next(user)
      {
        if(user)
        {
          subscriber.next(user) ;
        }
      },
      error(e)
      {
        subscriber.error(e);
      }

    })
    subscriber.next()
  }))
  //async signUp(email : string, username : string, password : string) {
  login(email : string, password : string) : Subject<string> {
      let result = new Subject<string>()
      this.auth.signInWithEmailAndPassword(email,password).then((res)=>{
      }).catch((err)=>{
        if(err.code)
        {
          let errorMsg = err.code.slice(err.code.indexOf('/')+1).replaceAll('-',' ')
          result.next(errorMsg);
        }else
        {
          result.next("error occured");
          console.log(err);
        }
      }) ;
      return result ;




  }
}
