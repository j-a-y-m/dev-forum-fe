import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import {CommonModule} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { NavComponent } from './nav/nav.component';

// material
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {environment} from "../environments/environment";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth-interceptor.service"
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import { NewQuestionComponent } from './new-question/new-question.component';
import { QuestionComponent } from './question/question.component';
import { UserComponent } from './user/user.component';
import { QnaComponent } from './qna/qna.component';
import { AnswerComponent } from './answer/answer.component';
import {MatRippleModule} from "@angular/material/core";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NewAnswerComponent } from './new-answer/new-answer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminReasonComponent } from './admin-reason/admin-reason.component';
import { InboxComponent } from './inbox/inbox.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { SearchComponent } from './search/search.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MarkdownModule} from "ngx-markdown";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    NewQuestionComponent,
    QuestionComponent,
    UserComponent,
    QnaComponent,
    AnswerComponent,
    NewAnswerComponent,
    AdminComponent,
    AdminReasonComponent,
    InboxComponent,
    SearchComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        MatRippleModule,
        MatSnackBarModule,
        MatMenuModule,
        MatDividerModule,
        MatButtonToggleModule,
        MatAutocompleteModule,
        MarkdownModule.forRoot(),
        MatProgressSpinnerModule,


    ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
