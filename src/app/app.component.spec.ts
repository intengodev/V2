/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async }         from '@angular/core/testing';

import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Router, RouterModule, RouterOutlet, ActivatedRoute }   from '@angular/router';
import { RouterTestingModule }    from '@angular/router/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageService }		   from './page/public/page.service';
import { SocketService } 	   from "./shared/socket.service";

import { AppComponent }           from './app.component';
import { PageComponent } 		    from './page/public/page.component';
import { QuestionListComponent } from './questions/question-list/public/question-list.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

import { RadioQuestionComponent }     from './questions/radio-question/public/radio-question.component';
import { CheckboxQuestionComponent }  from './questions/checkbox-question/public/checkbox-question.component';
import { QuestionListService }        from './questions/question-list/public/question-list-service';
import { RatingQuestionComponent }    from './questions/rating-question/public/rating-question.component';
import { MatrixQuestionComponent }    from './questions/matrix-question/public/matrix-question.component';

describe('App: V2', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PageComponent,
        QuestionListComponent,
        ProgressBarComponent,
        CheckboxQuestionComponent,
        RadioQuestionComponent,
        MatrixQuestionComponent,
        RatingQuestionComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: PageComponent },
            { 
              path: ':project_id/:user_id/:page_idx', component: PageComponent,
              children: [
                //{ path: '', redirectTo: 'progress', pathMatch: 'full'},
                { path: '', component: ProgressBarComponent }
              ]
            }
          ])
      ]
    });
  }));

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Intengo Hub');
  }));

  // it('should render title in a h1 tag', async(() => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
