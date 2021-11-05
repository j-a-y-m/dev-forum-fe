import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import { take } from 'rxjs/operators';
import {SubmitAnswerService} from "./submit-answer.service";

@Component({
  selector: 'new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.scss']
})
export class NewAnswerComponent implements OnInit, OnChanges {

  @Input()
   questionId : string | undefined ;

  constructor(private submitAnswerService: SubmitAnswerService, private _snackBar: MatSnackBar) {
  }



  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.questionId = changes["questionId"].currentValue
  }

  submitAnswer(formValues: any) {

    if (NewAnswerComponent.isEmpty(formValues.answer))
    {

      this._snackBar.open('Please write your answer!',"OK", {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 3000
      });

    }else
    { //add snackbar ;
      if (this.questionId)
      {
        this.submitAnswerService.submit(this.questionId,
          formValues.answer
        ).pipe(take(1)).subscribe({
          next : value => {
            // this._snackBar.open("answer posted!",undefined, {
            //   duration: 3000
            // });
            },
          error : err => {
            // this._snackBar.open(err.message,undefined, {
            //   duration: 3000
            // });
          }
        });
      }

    }
  }

  private static isEmpty(str : string) {
    return (!str || str.length === 0 );
  }

}
