import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {concat, Observable} from "rxjs";


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
  async login(email : string, password : string) {
    try {
      await this.auth.signInWithEmailAndPassword(email,password) ;
      // console.log(environment.baseUrl+"/signup") ;
      var http  = this.http ;
      // this.auth.authState.subscribe({
      //   async next(user)
      //   {
      //     if(user!=null)
      //     {
      //
      //       var idToken = await user.getIdToken() ;
      //       var body = {
      //         idToken,
      //         "uid" : user.uid
      //       }
      //       http.post('http://localhost:3000/signup',body).subscribe(
      //         {
      //           next(e)
      //           {
      //             console.log(e);
      //           }
      //         }
      //       );
      //       user.getIdToken().then((id)=>console.log(id) );
      //
      //     }
      //     else
      //     {
      //       console.log("not authenticated") ;
      //
      //     }
      //   },
      //   error(e)
      //   {
      //
      //     console.log(e) ;
      //   }
      // })
      //
      // ;

    }catch (e)
    {
      console.log(e);
    }



  }
}
