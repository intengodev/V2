
import { Component, OnInit } 		from '@angular/core';
import { QuestionListComponent }  	from '../../questions/question-list/public/question-list.component';

import 'rxjs/add/operator/filter';

import { ActivatedRoute, Router}	from '@angular/router';

import { AppRoutingModule }         from './../../app-routing.module';
import { PageService } 	 			from './page.service';

import { Mocks } 					from '../../mocks';
window['mocks'] = new Mocks;

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
//test pc
	private animationSpeed = 200;

	public  pageSubject:any;
	public  currentState 		= 'dormant';
	public  subscription;
	
	constructor(private route: ActivatedRoute, private router: Router, private pageService: PageService){
		console.log('PageComponent:constructor');
		
		this.pageSubject = pageService.getPageSubject();
		window['AppSubject'] = this.pageSubject;
	}
 	
	ngOnInit(){
		let params = this.route.snapshot.params;

		this.project_id = params['project_id'];
		this.user_id    = params['user_id'];
		this.page_idx   = params['page_idx'];
		
		if(typeof this.page_idx !== 'undefined') this.title 		= window['mocks'].pages[this.page_idx].title;
		
		this.listenForEvents();
	}
	
	/**
	 * Listens for route and page changes
	 *  */
	listenForEvents(){
		this.subscription = this.route.params.subscribe( params => {
			console.log('PageComponent:route params subscribe', params);
			this.refreshPageData(params);
			this.pageService.setParamsFromRouter(params);
		});
		
		//Filter only page events
		this.pageSubject.filter( dto => {
			if(typeof dto.action !== 'undefined') return (dto.action.indexOf("page") > -1);
		})
		.subscribe( dto => this.delegatePageEvents(dto));
	}

	refreshPageData(props){
		this.project_id = props['project_id'];
		this.user_id 	= props['user_id'];
		this.page_idx 	= props['page_idx'];

		if(typeof this.page_idx !== 'undefined') this.title 		= window['mocks'].pages[this.page_idx].title;
	}
	
	delegatePageEvents(dto){
		console.log('PageComponent:delegatePageEvents', dto.action);

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
