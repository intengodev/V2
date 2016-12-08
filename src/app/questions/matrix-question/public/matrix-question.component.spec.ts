/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Router, RouterModule, RouterOutlet, ActivatedRoute }   from '@angular/router';
import { RouterTestingModule }    from '@angular/router/testing';

import { PageService }		   from './../../../page/public/page.service';
import { SocketService } 	   from "../../../shared/socket.service";
import { QuestionListService }        from './../../question-list/public/question-list-service';

import { MatrixQuestionComponent } from './matrix-question.component';

describe('MatrixQuestionComponent', () => {
  let component: MatrixQuestionComponent;
  let fixture: ComponentFixture<MatrixQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixQuestionComponent ],
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
    fixture = TestBed.createComponent(MatrixQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
