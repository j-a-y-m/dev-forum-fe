import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from "./user.model";
import {UserService} from "./user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnChanges {


  @Input()
  uid : string | undefined;

  user : Observable<User | undefined> | undefined ;
  constructor(private userService : UserService) {

  }

  ngOnChanges(changes: SimpleChanges): void {

    this.uid = changes["uid"].currentValue ;
  }

  ngOnInit(): void {
    if (this.uid){
      this.user = this.userService.getUser(this.uid) ;
    }

  }



}
