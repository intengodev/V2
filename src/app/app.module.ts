
import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule, 
         Routes }        from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent }               from './app.component';
import { ProgressBarComponent }       from './progress-bar/progress-bar.component';

import { PageComponent }              from './page/page.component';

import { QuestionComponent }          from './questions/question/question.component';
import { RadioQuestionComponent }     from './questions/radio-question/radio-question.component';
import { CheckboxQuestionComponent }  from './questions/checkbox-question/checkbox-question.component';
import { RadioClickQuestionComponent }from './questions/radio-click-question/radio-click-question.component';
import { QuestionListComponent }      from './questions/question-list/question-list.component';
import { QuestionListService }        from './questions/question-list/question-list-service';
import { RatingQuestionComponent }    from './questions/rating-question/rating-question.component';
import { MatrixQuestionComponent }    from './questions/matrix-question/matrix-question.component';

const routes: Routes =[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageComponent },
  { path: ':project_id/:user_id/:page_idx', component: PageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    QuestionComponent,
    RadioQuestionComponent,
    CheckboxQuestionComponent,
    ProgressBarComponent,
    RadioClickQuestionComponent,
    QuestionListComponent,
    RatingQuestionComponent,
    MatrixQuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    QuestionListService,
    { provide : LocationStrategy , useClass : HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class App {}
