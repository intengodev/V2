
import { Component, OnInit } 		from '@angular/core';
import { QuestionListComponent }  	from '../../questions/question-list/public/question-list.component';

import 'rxjs/add/operator/filter';

import { ActivatedRoute, Router}	from '@angular/router';

import { AppRoutingModule }         from './../../app-routing.module';
import { PageService } 	 			from './page.service';

@Component({
  selector: 'page',
  host: { 'class': 'page active' },
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
	public  title:string = '';
	private project_id:number; 
	private user_id:number;
	private page_idx:any;
	private animationSpeed = 200;

	public  pageSubject:any;
	public  currentState 		= 'dormant';
	public  subscription;
	
	constructor(
		private route: ActivatedRoute, 
		private router: Router, 
		private pageService: PageService
	){		
		this.pageSubject = pageService.getPageSubject();
	}
 	
	ngOnInit(){
		let params = this.route.snapshot.params;

		this.project_id = params['project_id'];
		this.user_id    = params['user_id'];
		this.page_idx   = params['page_idx'];
		
		this.listenForEvents();
	}
	
	/**
	 * Listens for route and page changes
	 *  */
	listenForEvents(){
		this.subscription = this.route.params.subscribe( params => { this.updatePage(params); });
		this.pageSubject.filter( dto => {
			if(typeof dto.action !== 'undefined') return (dto.action.indexOf("page") > -1);
		}).subscribe( dto => this.delegatePageEvents(dto));
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
			this.pageService.setPagesData(page_resp.json()); //cache the data in the service to avoid subsequent page calls
			this.refreshPageData(params, page_resp);
		});
	}
	
	/**
	 * Refresh the data in the page component
	 */
	refreshPageData(params, page_data){
		this.pageService.setParamsFromRouter(params);

		this.project_id = params['project_id'];
		this.user_id 	= params['user_id'];
		this.page_idx 	= params['page_idx'];
		
		this.title 		= (typeof this.page_idx !== 'undefined') ? page_data.title : '';
	}
	
	delegatePageEvents(dto){
		if(dto.action == "page:transition:out") this.transitionOut(dto);
		if(dto.action == "page:reset") this.resetPageState(dto);
		if(dto.action == "page:transition:in") this.transitionIn(dto);
	}

	transitionOut(dto){
		this.currentState = 'transitioningOut';
		document.querySelectorAll('.page')[0].classList.add(this.currentState);
	}
	
	//TODO: Remove these timeouts in favor of an angular 2 animation strategy
	resetPageState(dto){
		window.setTimeout(() => {
			console.log('Page:resetPageState', dto);
			let node = document.querySelectorAll('.page.active')[0];
			this.currentState = 'dormant';
			node.classList.remove('active', 'transitioningOut');
			
		}, this.animationSpeed + 150);
	}

	transitionIn(dto){
		window.setTimeout(() => {
			let nextPageIdx = Number(this.page_idx) + 1;
			let node = document.querySelectorAll('.page')[0];
			console.log('PageComponent:transitionIn', nextPageIdx, dto);

			this.router.navigate(['/', this.project_id, this.user_id, nextPageIdx]);
			
			this.currentState = 'transitioningIn';
			node.classList.add(this.currentState);

			window.setTimeout(() => {
				this.currentState = 'active';
				node.classList.add(this.currentState);
				node.classList.remove('transitioningIn');
			}, this.animationSpeed);
		}, this.animationSpeed + 250);
	}

	ngOnDestroy () {
		 this.subscription.unsubscribe();
	 }
}
