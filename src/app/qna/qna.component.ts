import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Question} from "../question/question.model";
import {NewQuestionComponent} from "../new-question/new-question.component";
import {Observable} from "rxjs";
import {Answer} from "../answer/answer.model";
import {AnswerService} from "../answer/answer.service";
import {QuestionService} from "../question/question.service";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.scss']
})
export class QnaComponent implements OnInit {
  answers : Observable<Answer[]> ;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {question : Question},
              private matDialog : MatDialog,
              private answerService : AnswerService,
              private questionService : QuestionService
              ) {

    this.answers = this.answerService.getAnswers(data.question.questionId) ;
  }

  ngOnInit(): void {
  }

  openDialog(){
    this.matDialog.open(NewQuestionComponent);
  }

  upvote(question: Question) {
    this.questionService.upvote(question.questionId).pipe(take(1)).subscribe({
      next : value => {console.log(value)}
    });
  }

  downvote(question: Question) {
    this.questionService.downvote(question.questionId).pipe(take(1)).subscribe({
      next : value => {console.log(value)}
    });
  }
}
