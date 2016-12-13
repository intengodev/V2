/* tslint:disable:no-unused-variable */
import * as tst from '../../../../test/index';
import { 
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
  BaseRequestOptions
} from '../../../../test/index';

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: tst.ComponentFixture<QuestionListComponent>;

  beforeEach(tst.async(() => {
    tst.TestBed.configureTestingModule({
      schemas: [tst.CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ 
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
      ],
      imports: [
        tst.RouterTestingModule.withRoutes(tst.ROUTES)
      ]  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = tst.TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
