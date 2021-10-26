import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../question/question.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {Answer} from "./answer.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private firestore : AngularFirestore, private http: HttpClient) { }

  getAnswers(questionId : string) : Observable<Answer[]>{
    const questionRef = this.firestore.collection("answers") ;

    return this.firestore.collection<Answer>("answers",ref => ref.where("questionId","==",questionId)
        .orderBy("votes","desc"))
      .valueChanges({idField: 'answerId'});
  }

  upvote(answerId: string) {
    const body = {
      contentType: "answers",
      vote: 1,
      id: answerId
    }
    return this.http.post(environment.baseUrl+"/vote",body);
  }

  downvote(answerId: string) {
    const body = {
      contentType: "answers",
      vote: -1,
      id: answerId
    }
    return this.http.post(environment.baseUrl+"/vote",body);
  }
}
