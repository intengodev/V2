
import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { PageComponent } from './page/page.component';
import { QuestionComponent } from './question/question.component';
import { RadioQuestionComponent } from './radio-question/radio-question.component';
import { CheckboxQuestionComponent } from './checkbox-question/checkbox-question.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RadioClickQuestionComponent } from './radio-click-question/radio-click-question.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionListService }    from './question-list/question-list-service';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    QuestionComponent,
    RadioQuestionComponent,
    CheckboxQuestionComponent,
    ProgressBarComponent,
    RadioClickQuestionComponent,
    QuestionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [QuestionListService],
  bootstrap: [AppComponent]
})
export class App {}
