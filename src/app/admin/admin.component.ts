import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AdminService} from "./admin.service";
import {map, mergeMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {NewQuestionComponent} from "../new-question/new-question.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminReasonComponent} from "../admin-reason/admin-reason.component";

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnChanges {


  @Input()
  contentId : string | undefined;

  @Input()
  contentType : string | undefined;

  @Input()
  uid : string | undefined;

  admin : boolean | undefined ;
  constructor(public adminService: AdminService,
              private matDialog : MatDialog,
              private _snackBar: MatSnackBar) {
    let f=  this.adminService.getToken().pipe(map((token) => {
        return  token?.claims.admin ;
      }
    ));

    f.subscribe({
      next: value => {console.log(value);this.admin=value}
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.contentId = changes["contentId"].currentValue;
    this.contentType = changes["contentType"].currentValue;
    this.uid = changes["uid"].currentValue;

  }

  isAdmin() : Observable<any> {
    let f=  this.adminService.getToken().pipe(map((token) => {
            return  token?.claims.admin ;
      }
    ));

    f.subscribe({
      next: value => {console.log(value);this.admin=value}
    })
    return f;
  }

  delete() {
    const reasonDialogRef = this.matDialog.open(AdminReasonComponent);
    reasonDialogRef.afterClosed().subscribe({
      next: data => {
        const reason = data.reason ;
        if (this.contentType && this.contentId){
          console.log(this.contentId);
          // this.matDialog.open(NewQuestionComponent);
          this.adminService.deleteContent(this.contentType,this.contentId,reason).subscribe({
              next: res => {
              //   this._snackBar.open('deleted',undefined, {
              //   duration: 3000
              // }); 
            },
              error: err => {
              //   this._snackBar.open(err.message,undefined, {
              //   duration: 3000
              // });
            }
            }
          );
        }
      }
    })


  }

  banUser() {

    const reasonDialogRef = this.matDialog.open(AdminReasonComponent);
    reasonDialogRef.afterClosed().subscribe({
      next: data => {
        const reason = data.reason;
        if (this.uid) {
          this.adminService.banUser(this.uid, reason).subscribe({
              next: res => {
                // this._snackBar.open('user banned', undefined, {
                //   duration: 3000
                // });
              },
              error: err => {
                // this._snackBar.open(err.message, undefined, {
                //   duration: 3000
                // });
              }
            }
          );
        }
      }
    });


  }

}
