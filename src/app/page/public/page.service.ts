
import { Injectable } 		from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { Router, RouterModule, 
		 ActivatedRoute } 	from '@angular/router';
 
var self;

@Injectable()
export class PageService {
  private pageSubject: BehaviorSubject<any> = new BehaviorSubject({});
  private project_id;
  private user_id;
  private page_idx;

  constructor(public route: ActivatedRoute, public router: Router){
  	window['route'] = route;
  	this.delegateEvents();
  }

  setParamsFromRouter(params){
		console.log('PageService:setParamsFromRouter', params);

		this.project_id = params['project_id'];
		this.user_id 	= params['user_id'];
		this.page_idx 	= params['page_idx'];
  }

  delegateEvents(){
		self = this;
		this.pageSubject.subscribe( dto => {
			if(dto.action === 'page:advance') this.advancePage();
		}, err => {
			console.log('pageSubject:err', err);
		}, () => {});
  }

  advancePage(){
		let oldPageIdx = this.page_idx;
		let newPageIdx = this.page_idx + 1;

		this.transitionPageOut(oldPageIdx);
		this.resetPage(oldPageIdx);
		this.transitionPageIn(newPageIdx);
  }

  transitionPageOut(oldPageIdx){
  	this.pageSubject.next({
  		action: 'page:transition:out',
  		idx: oldPageIdx
  	});
  }

  resetPage(oldPageIdx){
  	this.pageSubject.next({
  		action: 'page:reset',
  		idx: oldPageIdx
  	});
  }

  transitionPageIn(newPageIdx){
  	this.pageSubject.next({
  		action: 'page:transition:in',
  		idx: newPageIdx
  	});
  }

  getPageSubject(){
  	return this.pageSubject;
  }
}
