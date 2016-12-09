
export { async, ComponentFixture, TestBed } from '@angular/core/testing';

export { Http, BaseRequestOptions } from '@angular/http';
export { MockBackend } from '@angular/http/testing';

export { RouterTestingModule }  from '@angular/router/testing';

export { By } from '@angular/platform-browser';
export { DebugElement } from '@angular/core';

export * from './../app/page/public/page.service';
export * from "./../app/shared/socket.service";

export * from './../app/page/public/page.component';

export * from './../app/app.component';
export * from './../app/questions/question-list/public/question-list.component';
export * from './../app/progress-bar/progress-bar.component';

export * from './../app/questions/radio-question/public/radio-question.component';
export * from './../app/questions/checkbox-question/public/checkbox-question.component';
export * from './../app/questions/question-list/public/question-list-service';
export * from './../app/questions/rating-question/public/rating-question.component';
export * from './../app/questions/matrix-question/public/matrix-question.component';

import { ProgressBarComponent }       from './../app/progress-bar/progress-bar.component';
import { PageComponent }              from './../app/page/public/page.component';

export const ROUTES: any = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageComponent },
  { 
    path: ':project_id/:user_id/:page_idx', component: PageComponent,
    children: [
      //{ path: '', redirectTo: 'progress', pathMatch: 'full'},
      { path: '', component: ProgressBarComponent }
    ]
  }
];