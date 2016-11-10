
import { Component, OnInit } 		from '@angular/core';
import { QuestionListComponent }  	from '../questions/question-list/question-list.component';

import { BehaviorSubject }  		from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Router }	from '@angular/router';

import { AppRoutingModule }         from './../app-routing.module';
import { AppService } 	 			from './../app.service';

import { Mocks } 					from '../mocks';
let mocks = new Mocks;

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  outputs: ['appSubject']
})
export class PageComponent {
	public  title:string 		= '';
	private project_id:number 	= 20;
	private user_id:number 		= 0;
	private page_idx:any 		= 1;
	public  appSubject:any;
	private route:any;
	
	constructor(private _route: ActivatedRoute, private router: Router, private appService: AppService){
		this.route = _route;

		this.appSubject = appService.getAppSubject();
		window['AppSubject'] = this.appSubject;

		console.log('PageComponent:constructor', this.route.url.value[0].path);
		 
		this.route.params.subscribe( params => {
			console.log('route params subscribe', params);

			this.project_id = params['project_id'];
			this.user_id 	= params['user_id'];
			this.page_idx 	= params['page_idx'];
		});
	}

	ngOnInit(){
		console.log('PageComponent:onInit', this.route.url.value[0].path);
	}
	
	ngAfterViewInit(){
		if(typeof this.page_idx == 'undefined'){ 
			this.page_idx = 0;
			this.title = '';
		} else {
			this.title = mocks.pages[this.page_idx].title;
		}
		
		this.appSubject.subscribe( action =>{
			console.log('PageComponent:AppSubject:next');
			if(action === 'page:advance') this.advancePage();
		}, err => {
			console.log('AppSubject:err', err);
		}, () => {
			console.log('AppSubject:success');
		})
	}

	advancePage(){
		var nextPage  = parseInt(this.page_idx) + 1;
		var pid:any   = this.project_id;
		debugger;
		//this.router.navigate(['/', pid, this.user_id, nextPage]);
	}
}
