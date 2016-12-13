/* tslint:disable:no-unused-variable */
import * as tst from '../../../../test/index';
import { SocketService, MockSocketService } from '../../../../test/index';

describe('MatrixQuestionComponent', () => {
  let component: tst.MatrixQuestionComponent;
  let fixture: tst.ComponentFixture<tst.MatrixQuestionComponent>;

  beforeEach(tst.async(() => {
    tst.TestBed.configureTestingModule({
      declarations: [ 
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
      ],
      imports: [
        tst.RouterTestingModule.withRoutes(tst.ROUTES)
      ]  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = tst.TestBed.createComponent(tst.MatrixQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
