/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Router, RouterModule, RouterOutlet, ActivatedRoute }   from '@angular/router';
import { RouterTestingModule }    from '@angular/router/testing';

import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarComponent ],
      providers: [
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
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
