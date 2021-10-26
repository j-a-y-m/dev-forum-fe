import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenu} from "@angular/material/menu";
import {InboxService} from "./inbox.service";
import {Observable} from "rxjs";
import {Inbox} from "./inbox.model";

@Component({
  selector: 'inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  exportAs: 'menuOfInbox'
})
export class InboxComponent implements OnInit {
  @ViewChild(MatMenu, {static: true})
  menu: MatMenu | undefined;

  inboxMessages : Observable<Inbox[]>

  constructor(private inboxService : InboxService) {
    this.inboxMessages = inboxService.getInbox() ;
  }

  ngOnInit(): void {
  }

   isEmpty(str : string) {
    return (!str || str.length === 0 );
  }
}
