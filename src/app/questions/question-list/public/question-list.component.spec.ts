/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Router, RouterModule, RouterOutlet, ActivatedRoute }   from '@angular/router';
import { RouterTestingModule }    from '@angular/router/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageService }		             from './../../../page/public/page.service';
import { SocketService } 	             from "../../../shared/socket.service";

import { PageComponent }              from './../../../page/public/page.component';
import { RadioQuestionComponent }     from './../../radio-question/public/radio-question.component';
import { CheckboxQuestionComponent }  from './../../checkbox-question/public/checkbox-question.component';
import { QuestionListService }        from './../../question-list/public/question-list-service';
import { RatingQuestionComponent }    from './../../rating-question/public/rating-question.component';
import { MatrixQuestionComponent }    from './../../matrix-question/public/matrix-question.component';
import { ProgressBarComponent }       from './../../../progress-bar/progress-bar.component';

//SUT
import { QuestionListComponent } from './question-list.component';

const ROUTES: any = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageComponent },
  { 
    path: ':project_id/:user_id/:page_idx', component: PageComponent,
    children: [
      { path: '', component: ProgressBarComponent }
    ]
  }
]

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ 
        QuestionListComponent,
        PageComponent,
        QuestionListComponent,
        ProgressBarComponent,
        CheckboxQuestionComponent,
        RadioQuestionComponent,
        MatrixQuestionComponent,
        RatingQuestionComponent 
      ],
      providers: [
        QuestionListService,
        PageService,
        SocketService,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options)
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ],
      imports: [ RouterTestingModule.withRoutes(ROUTES) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
