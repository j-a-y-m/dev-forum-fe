import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../question/question.service";
import {Observable} from "rxjs";
import {Question} from "../question/question.model";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  questions : Observable<Question[]> ;
  questionsCopy : Observable<Question[]>;

  constructor(private questionService : QuestionService) {

    this.questions = this.questionService.getQuestions() ;
    this.questionsCopy = this.questions ;

  }

  ngOnInit(): void {
  }

  getQuestionsByTime(){
    this.questions = this.questionService.getQuestions() ;
  }

  getQuestionsByUpvotes(){
    this.questions = this.questionService.getQuestionsByUpvotes() ;
}

  search(searchString: string){
    if (HomeComponent.isEmpty(searchString))
    {
      this.questions = this.questionsCopy ;
    }else
    {
      //copy of question is created after every key stroke
      //this.questionsCopy = this.questions ;


      this.questions = this.questions.pipe(map(
      (questions)=>{
        return questions.filter(question=>{
          if(question.content.search("totally") !== -1)
          {
            console.log("filter "+question.content);
          }

          if ((question.title.search(searchString) !== -1) || (question.content.search(searchString) !== -1))
          {
            console.log(question);
            return true
          }else {
            return false
          }
        })
      }
        )
      );


    }

  }

  // private _searchFilter(value: string): Question[] {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.cities.filter(cityIt => cityIt.name.toLowerCase().indexOf(filterValue) === 0);
  // }

  private static isEmpty(str : string) {
    return (!str || str.length === 0 );
  }


  log(value : any){
    //console.log("from home component "+value)
}


}
