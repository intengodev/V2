/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { RouterTestingModule }   from '@angular/router/testing';

import { PageService }		   from './../page/public/page.service';
import { SocketService } 	   from "./../shared/socket.service";
import { QuestionListService }        from './../questions/question-list/public/question-list-service';

//import { AppComponent }             from './../../app.component';
import { PageComponent }              from './../page/public/page.component';
import { QuestionListComponent }      from './../questions/question-list/public/question-list.component';
import { RadioQuestionComponent }     from './../questions/radio-question/public/radio-question.component';
import { CheckboxQuestionComponent }  from './../questions/checkbox-question/public/checkbox-question.component';
import { RatingQuestionComponent }    from './../questions/rating-question/public/rating-question.component';
import { MatrixQuestionComponent }    from './../questions/matrix-question/public/matrix-question.component';

import { ProgressBarComponent }       from './progress-bar.component';

const ROUTES: any = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageComponent },
  { 
    path: ':project_id/:user_id/:page_idx', component: PageComponent,
    children: [
      //{ path: '', redirectTo: 'progress', pathMatch: 'full'},
      { path: '', component: ProgressBarComponent }
    ]
  }
]

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestionListComponent,
        PageComponent,
        ProgressBarComponent ,
        CheckboxQuestionComponent,
        RadioQuestionComponent,
        RatingQuestionComponent,
        MatrixQuestionComponent
      ],
      providers: [
        PageService,
        QuestionListService,
        SocketService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options)
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        RouterTestingModule.withRoutes(ROUTES)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
