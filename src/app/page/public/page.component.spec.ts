/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Router, RouterModule, RouterOutlet, ActivatedRoute, RouterOutletMap }   from '@angular/router';
import { RouterTestingModule }    from '@angular/router/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageService }		   from './../../page/public/page.service';
import { SocketService } 	   from "./../../shared/socket.service";

import { AppComponent }           from './../../app.component';
import { QuestionListComponent } from './../../questions/question-list/public/question-list.component';
import { ProgressBarComponent } from './../../progress-bar/progress-bar.component';

import { RadioQuestionComponent }     from './../../questions/radio-question/public/radio-question.component';
import { CheckboxQuestionComponent }  from './../../questions/checkbox-question/public/checkbox-question.component';
import { QuestionListService }        from './../../questions/question-list/public/question-list-service';
import { RatingQuestionComponent }    from './../../questions/rating-question/public/rating-question.component';
import { MatrixQuestionComponent }    from './../../questions/matrix-question/public/matrix-question.component';

import { PageComponent } from './page.component';


describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

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
      providers: 
      [
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
        BaseRequestOptions,
        {
          provide: Router,
          useClass: class {
              navigate = jasmine.createSpy("navigate");
          }
        },
        {
          provide: ActivatedRoute,
          useClass: class { }
        }
      ],
      imports: [RouterModule]  
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
