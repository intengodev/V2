
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
  private _route:any;

  constructor(public route: ActivatedRoute, public router: Router){
		console.log('PageService:contructor');
  	this._route = window['route'] = route;

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
		console.log('PageService delegating events: ');

		this.pageSubject.subscribe( dto => {
			console.log('PageService:AppSubject:next', dto);
			if(dto.action === 'page:advance') this.advancePage();
		}, err => {
			console.log('AppSubject:err', err);
		}, () => {
			//console.log('AppSubject:success');
		});
  }

  advancePage(){
		let oldPageIdx = this.page_idx;
		let newPageIdx = this.page_idx + 1;

		console.log('PageService:advancePage oldPageIdx / newPageIdx: ', oldPageIdx, newPageIdx);

		this.transitionPageOut(oldPageIdx);
		this.resetPage(oldPageIdx);
		this.transitionPageIn(newPageIdx);
  }

  transitionPageOut(oldPageIdx){
		console.log('PageService:transitionPageOut');
  	this.pageSubject.next({
  		action: 'page:transition:out',
  		idx: oldPageIdx
  	});
  }

  resetPage(oldPageIdx){
		console.log('PageService:resetPage');
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
