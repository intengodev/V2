/* tslint:disable:no-unused-variable */

import * as tst from './../../test/index';
import { SocketService, MockSocketService } from './../../test/index';


// import { ProgressBarComponent }       from './progress-bar.component';

const ROUTES: any = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: tst.PageComponent },
  { 
    path: ':project_id/:user_id/:page_idx', component: tst.PageComponent,
    children: [
      //{ path: '', redirectTo: 'progress', pathMatch: 'full'},
      { path: '', component: tst.ProgressBarComponent }
    ]
  }
]

describe('ProgressBarComponent', () => {
  let component:tst.ProgressBarComponent;
  let fixture: tst.ComponentFixture<tst.ProgressBarComponent>;

  beforeEach(tst.async(() => {
    tst.TestBed.configureTestingModule({
      declarations: [
        tst.QuestionListComponent,
        tst.PageComponent,
        tst.ProgressBarComponent ,
        tst.CheckboxQuestionComponent,
        tst.RadioQuestionComponent,
        tst.RatingQuestionComponent,
        tst.MatrixQuestionComponent
      ],
      providers: [
        tst.PageService,
        tst.QuestionListService,
        tst.MockBackend,
        tst.BaseRequestOptions,
        {
          provide: tst.Http,
          useFactory: (mockBackend, options) => {
            return new tst.Http(mockBackend, options)
          },
          deps: [tst.MockBackend, tst.BaseRequestOptions]
        },
        {
          provide: SocketService,
          useFactory: function() {
            return new MockSocketService()
          }
        }
      ],
      imports: [
        tst.RouterTestingModule.withRoutes(ROUTES)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = tst.TestBed.createComponent(tst.ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
