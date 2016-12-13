/* tslint:disable:no-unused-variable */

/**
 * TODOS:
 * - Can I avoid injecting the RouterTestingModule and all of the deps every time?
 * - Create a mock socket service
 * - Move these testing configs into a barrel
 * - Add some specificity to the tests to actually test stuff
 */
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

describe('PageComponent', () => {
  let component: tst.PageComponent;
  let fixture: tst.ComponentFixture<tst.PageComponent>;
 
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
        MockBackend,
        BaseRequestOptions,
        {
          provide: tst.Http,
          useFactory: (mockBackend, options) => {
            return new tst.Http(mockBackend, options)
          },
          deps: [ MockBackend, BaseRequestOptions]
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
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
