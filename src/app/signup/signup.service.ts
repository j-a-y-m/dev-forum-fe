import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {concat, Observable, Subject} from "rxjs";


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
  signUp(email : string, password : string) : Subject<string>{
    
    
    let result = new Subject<string>()
    this.auth.createUserWithEmailAndPassword(email,password).then((res)=>{
      if(res.user)
      {
        res.user.getIdToken(true).then((idToken)=>{
          var body = {
            idToken : idToken
                  }
                  this.http.post(environment.baseUrl+'/signup',body).subscribe(
                  {
                    next(e)
                    {
                      // console.log(e)
                    }
                  }
                );
        });

      }
    }).catch((err)=>{
      if(err.code)
      {
        let errorMsg = err.code.slice(err.code.indexOf('/')+1).replaceAll('-',' ')
        result.next(errorMsg);

      }else
      result.next(err.toString());
      
    }) ;
    return result ;
      
      




  }
}
