/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';

import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Router, RouterModule, RouterOutlet, ActivatedRoute }   from '@angular/router';
import { RouterTestingModule }    from '@angular/router/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageService }		   from './../../../page/public/page.service';
import { SocketService } 	   from "../../../shared/socket.service";

import { QuestionListService } from './question-list-service';

describe('Service: QuestionListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
    });
  });

  it('should ...', inject([QuestionListService], (service: QuestionListService) => {
    expect(service).toBeTruthy();
  }));
});
