import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {flatMap, map} from "rxjs/operators";
import {Observable} from "rxjs";
import firebase from "firebase";
import IdTokenResult = firebase.auth.IdTokenResult;
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private auth : AngularFireAuth, private http: HttpClient) { }

  getToken() : Observable<IdTokenResult | null>{
    return this.auth.idTokenResult ;
  }

  deleteContent(contentType: string, contentId : string, reason : string) : Observable<any>{
    let body = {
      contentType: contentType,
      contentId : contentId,
      reason : reason
    }
    return this.http.post(environment.baseUrl+"/admin/delete",body);
  }

  banUser(uid : string,reason : string){
    let body = {
      uid : uid,
      reason : reason
    }
    return this.http.post(environment.baseUrl+"/admin/ban",body);
  }
}
