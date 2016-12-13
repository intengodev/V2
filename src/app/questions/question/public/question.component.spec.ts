/* tslint:disable:no-unused-variable */
import * as tst from '../../../../test/index';
import { SocketService, MockSocketService } from '../../../../test/index';

describe('QuestionComponent', () => {
  console.log('Question Spec');

  let component: tst.QuestionComponent;
  let fixture: tst.ComponentFixture<tst.QuestionComponent>;

  beforeEach(tst.async(() => {
    tst.TestBed.configureTestingModule({
      declarations: [ tst.QuestionComponent ],
      providers: [
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = tst.TestBed.createComponent(tst.QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
