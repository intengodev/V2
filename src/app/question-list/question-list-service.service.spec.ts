/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuestionListServiceService } from './question-list-service.service';

describe('Service: QuestionListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionListServiceService]
    });
  });

  it('should ...', inject([QuestionListServiceService], (service: QuestionListServiceService) => {
    expect(service).toBeTruthy();
  }));
});
