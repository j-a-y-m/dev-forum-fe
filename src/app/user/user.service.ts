import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "./user.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore : AngularFirestore) { }

  getUser(uid : string) : Observable<User | undefined>{
    return this.firestore.collection("users")
      .doc<User>(uid).get().pipe(map((document)=>
      {
        return document.data();
      }))
  }
}
