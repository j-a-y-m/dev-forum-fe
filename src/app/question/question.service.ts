import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Question} from "./question.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private firestore : AngularFirestore,private http: HttpClient) { }

  getQuestions() : Observable<Question[]>{
      const questionRef = this.firestore.collection("questions") ;

      return this.firestore.collection<Question>("questions",ref => ref.orderBy('createdAt',"desc"))
        .valueChanges({idField: 'questionId'});
  }

  getQuestionsByUpvotes() : Observable<Question[]> {
    const questionRef = this.firestore.collection("questions") ;

    return this.firestore.collection<Question>("questions",ref => ref.orderBy('votes',"desc"))
      .valueChanges({idField: 'questionId'});
  }

  upvote(questionId: string) {
    const body = {
      contentType: "questions",
      vote: 1,
      id: questionId
    }
    return this.http.post(environment.baseUrl+"/vote",body);
  }

  downvote(questionId: string) {
    const body = {
      contentType: "questions",
      vote: -1,
      id: questionId
    }
    return this.http.post(environment.baseUrl+"/vote",body);
  }


}
