
import { BrowserModule }              from '@angular/platform-browser';
import { NgModule, 
         CUSTOM_ELEMENTS_SCHEMA 
        }                             from '@angular/core';
import { FormsModule }                from '@angular/forms';
import { HttpModule }                 from '@angular/http';

import { LocationStrategy, 
         HashLocationStrategy }       from '@angular/common';

import { PageService }                from './page/public/page.service';
import { SocketService }              from './shared/socket.service';

import { AppComponent }               from './app.component';
import { ProgressBarComponent }       from './progress-bar/progress-bar.component';

import { PageComponent }              from './page/public/page.component';

import { QuestionComponent }          from './questions/question/public/question.component';
import { RadioQuestionComponent }     from './questions/radio-question/public/radio-question.component';
import { CheckboxQuestionComponent }  from './questions/checkbox-question/public/checkbox-question.component';
import { QuestionListComponent }      from './questions/question-list/public/question-list.component';
import { QuestionListService }        from './questions/question-list/public/question-list-service';
import { RatingQuestionComponent }    from './questions/rating-question/public/rating-question.component';
import { MatrixQuestionComponent }    from './questions/matrix-question/public/matrix-question.component';


import { AppRoutingModule }           from './app-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    PageComponent,
    QuestionComponent,
    RadioQuestionComponent,
    CheckboxQuestionComponent,
    ProgressBarComponent,
    QuestionListComponent,
    RatingQuestionComponent,
    MatrixQuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    QuestionListService,
    PageService,
    SocketService,
    { provide : LocationStrategy , useClass : HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class App {}