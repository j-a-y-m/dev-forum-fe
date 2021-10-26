import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubmitAnswerService {

  constructor(private http : HttpClient) { }

  submit(questionId : string ,content : string)
  {
    const body = {
      questionId : questionId,
      content : content
    }
    return this.http.post(environment.baseUrl+"/newAnswer",body);
  }
}
