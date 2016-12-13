/* tslint:disable:no-unused-variable */

/**
 * TODOS:
 * - Can I avoid injecting the RouterTestingModule and all of the deps every time?
 * - Create a mock socket service
 * - Move these testing configs into a barrel
 * - Add some specificity to the tests to actually test stuff
 */
import * as tst from '../../../test/index';
import { SocketService, MockSocketService } from '../../../test/index';

describe('PageComponent', () => {
  let component: tst.PageComponent;
  let fixture: tst.ComponentFixture<tst.PageComponent>;
 
  beforeEach(tst.async(() => {
    tst.TestBed.configureTestingModule({
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
      ],
      imports: [
        tst.RouterTestingModule.withRoutes(tst.ROUTES)
      ]  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = tst.TestBed.createComponent(tst.PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
