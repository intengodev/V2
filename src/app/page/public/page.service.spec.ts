/* tslint:disable:no-unused-variable */
import * as tst from '../../../test/index';
import { SocketService, MockSocketService } from '../../../test/index';

describe('Service: PageService', () => {
  console.log('PageService Spec');
  
  beforeEach(() => {
    tst.TestBed.configureTestingModule({
      schemas: [ tst.CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ 
        tst.AppComponent,
        tst.PageComponent,
        tst.QuestionListComponent,
        tst.ProgressBarComponent,
        tst.CheckboxQuestionComponent,
        tst.RadioQuestionComponent,
        tst.MatrixQuestionComponent,
        tst.RatingQuestionComponent 
      ],
      providers: 
      [
        tst.QuestionListService,
        tst.PageService,
        tst.MockBackend,
        tst.BaseRequestOptions,
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

  it('should ...', tst.inject([tst.PageService], (service: tst.PageService) => {
    expect(service).toBeTruthy();
  }));
});
