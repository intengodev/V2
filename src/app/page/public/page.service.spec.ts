/* tslint:disable:no-unused-variable */
import * as tst from '../../../test/index';
import { 
  AppComponent,
  SocketService, 
  MockSocketService,
  PageComponent,
  QuestionListComponent,
  ProgressBarComponent,
  CheckboxQuestionComponent,
  RadioQuestionComponent,
  MatrixQuestionComponent,
  RatingQuestionComponent,
  QuestionListService,
  PageService,
  MockBackend,
  BaseRequestOptions,
  async,
  inject,
  TestBed
} from '../../../test/index';
import { Observable } from 'rxjs/Observable';

describe('Service: PageService', () => {  
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [ tst.CUSTOM_ELEMENTS_SCHEMA ],
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
        MockBackend,
        BaseRequestOptions,
        {
          provide: tst.Http,
          useFactory: (mockBackend, options) => {
            return new tst.Http(mockBackend, options)
          },
          deps: [ tst.MockBackend, tst.BaseRequestOptions]
        },
        {
          provide: SocketService,
          useFactory: function() {
            return new MockSocketService()
          }
        }
      ]
    });
  });

  it('should create a page service', inject([PageService], (service: PageService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a page socket observable', inject([tst.PageService], (service: PageService) => {
    expect(service.socketObservable instanceof Observable).toBeTruthy();
  }));
});
