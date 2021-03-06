import { Component, OnInit } from '@angular/core';
import {SubmitQuestionService} from "./submit-question.service";
import {isHammerJsUsedInTemplate} from "@angular/material/schematics/ng-update/migrations/hammer-gestures-v9/hammer-template-check";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  constructor(private submitQuestionService : SubmitQuestionService
              ,  private router : Router
              , private _snackBar: MatSnackBar
              ,public dialogRef: MatDialogRef<NewQuestionComponent>
  ) { }

  ngOnInit(): void {
  }

  submit(formValues : any)
  {
    // console.log("new-question "+formValues.content)
    if (this.isEmpty(formValues.title)||this.isEmpty(formValues.content)||this.isEmpty(formValues.tags))
    {
      this._snackBar.open('Please fill all the details!',"OK", {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 3000
      });
    }else
    { //add snackbar ;
      this.submitQuestionService.submit(formValues.title,
                                        formValues.content,
                                        formValues.tags).pipe(take(1)).subscribe({
        next : value => {
          // this._snackBar.open("question posted!",undefined, {
          //   duration: 3000
          // });
          // console.log(value)
        this.dialogRef.close();
        },
        error : err => {
          // this._snackBar.open(err.message,undefined, {
          //   duration: 3000
          // });
        }
      })
    }
  }

  private  isEmpty(str : string) {
    return (!str || str.length === 0 );
  }

}
