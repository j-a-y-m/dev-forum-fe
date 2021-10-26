import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public uid : string | undefined  ;
  public idToken : string | undefined ;

  constructor(private auth : AngularFireAuth) {

    this.auth.authState.subscribe(
      {
        next : async user => {
          this.uid = user?.uid;
          this.idToken = await user?.getIdToken()
        }
      }
    )

  }


}
