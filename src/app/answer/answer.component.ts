import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Question} from "../question/question.model";
import {Answer} from "./answer.model";
import {AnswerService} from "./answer.service";

@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit,OnChanges {


  @Input()
  answer: Answer | undefined;

  constructor(private answerService : AnswerService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.answer = changes["answer"].currentValue;
  }

  upvote(answer: Answer) {
    // console.log(answer.answerId);
    this.answerService.upvote(answer.answerId).subscribe({
      next : value => {console.log(value)}
    });
  }

  downvote(answer: Answer) {
    this.answerService.downvote(answer.answerId).subscribe({
      next : value => {console.log(value)}
    });
  }
}
