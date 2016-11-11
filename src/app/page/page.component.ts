
import { Component, OnInit } 		from '@angular/core';
import { QuestionListComponent }  	from '../questions/question-list/question-list.component';

import { BehaviorSubject }  		from 'rxjs/BehaviorSubject';
import { ActivatedRoute }			from '@angular/router';

import { AppRoutingModule }         from './../app-routing.module';
import { AppService } 	 			from './../app.service';

import { Mocks } 					from '../mocks';
let mocks = new Mocks;

@Component({
  selector: 'page',
  host: { 'class': 'page' },
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
	public  currentState 		= 'dormant';
	
	constructor(private _route: ActivatedRoute, private appService: AppService){
		console.log('PageComponent:constructor');

		this.route = _route;

		this.appSubject = appService.getAppSubject();
		window['AppSubject'] = this.appSubject;
		 
		this.route.params.subscribe( params => {
			console.log('PageComponent:route params subscribe', params);
			this.appService.setParamsFromRouter(params);
			this.listenForEvents();
		});
	}

	listenForEvents(){
		this.appSubject.subscribe(dto => {
			switch (dto.action) {
				case "page:transition:out":
					this.transitionOut(dto);
				break;
				
				default:
				// code...
				break;
			}
		});
	}

	transitionOut(dto){
		this.currentState = 'transitioningOut';
		document.querySelectorAll('.page')[0].classList.add(this.currentState);
	}

	transitionIn(){

	}

	create(){

	}

	remove(){

	}
}
