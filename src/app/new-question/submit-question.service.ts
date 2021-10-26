import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubmitQuestionService {

  constructor(private http : HttpClient) { }

  submit(title : string, content : string, tags : string)
  {
      const body = {
        title : title,
        content : content,
        tags : tags
      }
      return this.http.post(environment.baseUrl+"/newQuestion",body);
  }


}
