
import { 
	Component,
	trigger,
	state,
	style,
	transition,
	animate
} 									from '@angular/core';
import { QuestionListComponent }  	from '../../questions/question-list/public/question-list.component';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/debounce';

import { ActivatedRoute, Router }	from '@angular/router';
import { PageService } 	 			from './page.service';

@Component({
  selector: 'page',
  host: { 
	  'class': 'page',
	  '[@pageState]': 'currentState'
},
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  animations: [
    trigger('pageState', [
		state('void', style({
			transform: 'translateX(200%)',
		})),
		state('active', style({
			transform: 'translateX(0%)',
		})),
		state('inactive',   style({
			transform: 'translateX(-100%)'
		})),

      transition('void   	=> active', animate('500ms  ease-in')),
      transition('active 	=> inactive', animate('200ms ease-out'))
    ])
  ]
})
export class PageComponent {
	public  title:string;
	private project_id:number; 
	private user_id:number;
	private page_idx:any;
	
	private animationSpeed  = 200;
	private transitionDelay = this.animationSpeed * 10;
	public  currentState    = 'void';
	
	public  pageSubject:any;
	private transitionSubscription;
	private transitionSource;
	public  subscription;
	
	constructor(
		public route: ActivatedRoute, 
		public router: Router, 
		private pageService: PageService
	){		
		this.pageSubject = pageService.getPageSubject();
	}
 	
	ngOnInit(){
		let params = this.route.snapshot.params;

		this.project_id = params['project_id'];
		this.user_id    = params['user_id'];
		this.page_idx   = params['page_idx'];
		
		this.transitionSubscription = this.getTransitionSubscription();
		
		window.setTimeout(() => {
			this.currentState = 'active';
		}, 500);

		this.listenForEvents();
	}
	
	getTransitionSubscription(){
		let page:any = document.querySelectorAll("page")[0];
		return Observable.fromEvent(page, "transitionend")
		.filter( evt => evt['target'].nodeName === 'PAGE');
	}
	
	
	/**
	 * Listens for route and page changes
	 *  */
	listenForEvents(){
		this.subscription = this.route.params.subscribe( params => { this.updatePage(params); });
		this.pageSubject.filter( dto => {
			if(typeof dto.action !== 'undefined') return (dto.action.indexOf("page") > -1);
		})
		.delay(500)
		.subscribe( dto => {
			this.delegatePageEvents(dto) 
		});

		this.transitionSource = this.transitionSubscription.subscribe( dto => {
			//console.log('transition subscription firing', dto);
			if(dto.action == "page:reset") this.resetPageState(dto);
			if(dto.action == "page:transition:in") this.transitionIn(dto);
		}, 
		err => {

		}, 
		(dto) => {
			console.log('transition complete and dto: ', dto);
		});
	}
	
	/**
	 * Decides where to pull data from and updates the component data
	 */
	updatePage(params){
		if(typeof params['page_idx'] === 'undefined') return;

		var pages_data 		= this.pageService.getPagesData();
		if(typeof pages_data !== 'undefined'){
			let page_data	= this.pageService.getDataForPage(params['page_idx']);
			this.refreshPageData(params, page_data);
		} else {
			this.fetch(params);
		}
	}

	fetch(params){
		this.pageService.fetchPagesData(params['project_id']).subscribe( page_resp => {
			var data   = page_resp.json();
			this.pageService.setPagesData(data); //cache the data in the service to avoid subsequent page calls
			this.refreshPageData(params, data);
		});
	}
	
	/**
	 * Refresh the data in the page component
	 */
	refreshPageData(params, page_data){
		this.pageService.setParamsFromRouter(params);
		let page_idx 	= parseInt(params["page_idx"]) - 1;

		this.project_id = params['project_id'];
		this.user_id 	= params['user_id'];
		this.page_idx 	= params['page_idx'];
		this.title 		= (typeof page_data.title !== 'undefined') ? page_data.title : page_data[page_idx].title;

		this.pageSubject.next({
			action: 'page:data:refreshed'
		});
	}
	
	delegatePageEvents(dto){
		//console.log('delegatePageEvents: ', dto.action);
		if(dto.action == "page:transition:out") this.transitionOut(dto);
		this.transitionSource.next(dto);
	}

	transitionOut(dto){
		this.currentState = 'inactive';
	}
	
	//TODO: Remove these timeouts in favor of an angular 2 animation strategy
	resetPageState(dto){
		//this.currentState = 'dormant';	
	}

	transitionIn(dto){
		window.setTimeout(() => {
			let nextPageIdx = Number(this.page_idx) + 1;
			this.router.navigate(['/', this.project_id, this.user_id, nextPageIdx]);
			
			this.currentState = 'void';

			window.setTimeout(() => {
				this.currentState = 'active';
			}, this.animationSpeed + 250);
		}, this.animationSpeed);
	}

	ngOnDestroy () {
		console.log('ngOnDestroy');
		 this.subscription.unsubscribe();
	 }
}
