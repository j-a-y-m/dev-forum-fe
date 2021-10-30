import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {concat, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private auth : AngularFireAuth,private http  :HttpClient) { }
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
  async signUp(email : string, password : string) {
    try {
      let sup = await this.auth.createUserWithEmailAndPassword(email,password) ;
      if(sup.user)
      {
        var idToken =await sup.user.getIdToken(true);
        var http  = this.http ;
        var body = {
          idToken : idToken
                }
        http.post(environment.baseUrl+'/signup',body).subscribe(
                {
                  next(e)
                  {
                      console.log(e);
                  }
                }
              );
      }


      }
      catch (e)
    {
      console.log(e);
    }



  }
}
