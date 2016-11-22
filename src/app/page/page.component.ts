
import { Component, OnInit } 		from '@angular/core';
import { QuestionListComponent }  	from '../questions/question-list/question-list.component';

import { BehaviorSubject }  		from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

import { ActivatedRoute, Router}	from '@angular/router';

import { AppRoutingModule }         from './../app-routing.module';
import { AppService } 	 			from './../app.service';

import { Mocks } 					from '../mocks';
window['mocks'] = new Mocks;

@Component({
  selector: 'page',
  host: { 'class': 'page' },
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
	public  title:string;
	private project_id:number; 
	private user_id:number;
	private page_idx:any;

	public  appSubject:any;
	private route:any;
	public  currentState 		= 'dormant';
	public  subscription;
	
	constructor(private _route: ActivatedRoute, private router: Router, private appService: AppService){
		console.log('PageComponent:constructor');
		this.route = _route;
		
		this.appSubject = appService.getAppSubject();
		window['AppSubject'] = this.appSubject;
	}
 	
	ngOnInit(){
		let params = this.route.snapshot.params;

		this.project_id = params['project_id'];
		this.user_id    = params['user_id'];
		this.page_idx   = params['page_idx'];

		this.title 		= window['mocks'].pages[this.page_idx].title
		
		this.listenForEvents();
	}

	listenForEvents(){
		this.subscription = this.route.params.subscribe( params => {
			console.log('PageComponent:route params subscribe', params);
			this.appService.setParamsFromRouter(params);
		});
		
		this.appSubject.filter( dto => {
			if(typeof dto.action !== 'undefined') return dto.action.indexOf("page") > -1
		})
		.subscribe( dto => this.delegatePageEvents(dto));
	}

 	ngOnDestroy () {
		 this.subscription.unsubscribe();
	 }
	
	delegatePageEvents(dto){
		console.log('PageComponent:delegatePageEvents', dto.action);
		if(dto.action == "page:transition:out") this.transitionOut(dto)
		if(dto.action == "page:transition:in") this.transitionIn(dto)
	}

	transitionOut(dto){
		console.log('PageComponent:transitionOut');
		this.currentState = 'transitioningOut';
		document.querySelectorAll('.page')[0].classList.add(this.currentState);
	}

	transitionIn(dto){
		let nextPageIdx = Number(this.page_idx) + 1;
		console.log('PageComponent:transitionIn', nextPageIdx, dto);
		this.router.navigate(['/', this.project_id, this.user_id, nextPageIdx]);
	}
}
