import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Question} from "./question.model";
import {NewQuestionComponent} from "../new-question/new-question.component";
import {MatDialog} from "@angular/material/dialog";
import {QnaComponent} from "../qna/qna.component";
import {QuestionService} from "./question.service";
import { take } from 'rxjs/operators';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit,OnChanges {

  @Input()
  question: Question | undefined;

  constructor(private matDialog : MatDialog, private questionService : QuestionService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.question = changes["question"].currentValue;

  }

  limitContent(content : string) : string{
    if(content.length > 300)
    {
      return content.substring(0,300).concat(" ....");
    }else return content ;
  }

  showQuestion(question: Question){

    this.matDialog.open(QnaComponent,
      {
        data : {question : question}
      });
  }

  log(){
    console.log("button");
  }

  upvote(question: Question) {
    this.questionService.upvote(question.questionId).pipe(take(1)).subscribe({
      next : value => {}
    });
  }

  downvote(question: Question) {
    this.questionService.downvote(question.questionId).pipe(take(1)).subscribe({
      next : value => {}
    });
  }
}
