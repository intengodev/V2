/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageService }		   from './../../../page/public/page.service';
import { SocketService } 	   from "../../../shared/socket.service";

import { RatingQuestionComponent } from './rating-question.component';

describe('RatingQuestionComponent', () => {
  let component: RatingQuestionComponent;
  let fixture: ComponentFixture<RatingQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingQuestionComponent ],
      providers: [
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
