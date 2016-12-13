/* tslint:disable:no-unused-variable */
import * as tst from '../test/index';
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
  BaseRequestOptions
} from '../test/index';

describe('App: V2', () => {
  console.log('App Component Spec');
  
  beforeEach(tst.async(() => {
    tst.TestBed.configureTestingModule({
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
        tst.RouterTestingModule.withRoutes([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: PageComponent },
            { 
              path: ':project_id/:user_id/:page_idx', component: PageComponent,
              children: [
                //{ path: '', redirectTo: 'progress', pathMatch: 'full'},
                { path: '', component: ProgressBarComponent }
              ]
            }
          ])
      ]
    });
  }));

  it('should create the app', tst.async(() => {
    let fixture = tst.TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, tst.async(() => {
    let fixture = tst.TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Intengo Hub');
  }));

  // it('should render title in a h1 tag', async(() => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
