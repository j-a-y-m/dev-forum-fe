import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {map, mergeMap} from "rxjs/operators";
import {Inbox} from "./inbox.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  constructor(private firestore : AngularFirestore, private auth : AngularFireAuth) { }

  getInbox() : Observable<Inbox[]>{


    // this.auth.user.subscribe({
    //   next: (user)=>{
    //     return this.firestore.collection("users")
    //       .doc(user?.uid).collection<Inbox>("inbox").valueChanges({idField:"id"});
    //   }
    // })

    // return this.auth.user.pipe(map((user)=>{
    //
    //   return this.firestore.collection("users")
    //     .doc(user?.uid).collection<Inbox>("inbox").valueChanges();
    // }));

    return this.auth.user.pipe(map((user)=>{
      return user?.uid
    })).pipe(mergeMap((uid)=>{

        return this.firestore.collection("users")
          .doc(uid).collection<Inbox>("inbox",ref => ref.orderBy("time","desc")).valueChanges();
      }));



    //   .pipe(map((uid)=>{
    //  return this.firestore.collection("users")
    //     .doc(uid).collection<Inbox>("inbox").valueChanges({idField:"id"});
    // }))
  }


}
