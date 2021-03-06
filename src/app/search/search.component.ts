import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  formControl = new FormControl();

  @Output()
  searchString = new EventEmitter<string>();

  @Output()
  sortByTime = new EventEmitter<boolean>();

  @Output()
  sortByVotes = new EventEmitter<boolean>();

  searchStr : string = "" ;


  constructor() {
    this.formControl.valueChanges
    //   .pipe(
    //   startWith(''),
    //   map(value => console.log(value))
    // )
      .pipe(startWith(''))
      .subscribe({
      next : value => {
        this.searchString.emit(value);
        //console.log(value);
      }
    });
  }

  ngOnInit(): void {
  }

  getQuestionsByUpvotes() {
    this.sortByVotes.emit(true);
  }

  getQuestionsByTime() {
    this.sortByTime.emit(true);
  }

  onBackSpace()
  {
    this.searchString.emit("");
    // this.formControl.setValue("");
  }
}
