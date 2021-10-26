import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'admin-reason',
  templateUrl: './admin-reason.component.html',
  styleUrls: ['./admin-reason.component.scss']
})
export class AdminReasonComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminReasonComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {reason : string}) { }

  ngOnInit(): void {
  }

  submitReason(formValues: any) {
    const reason = formValues.reason ;
    // this.data.reason = reason ;
    this.dialogRef.close({reason: reason});
  }

}
