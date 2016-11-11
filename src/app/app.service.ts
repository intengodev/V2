
import { Injectable } 		from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { Router, RouterModule, 
		 ActivatedRoute } 	from '@angular/router';

var self;

@Injectable()
export class AppService {
  private appSubject: BehaviorSubject<any> = new BehaviorSubject({});
  private project_id;
  private user_id;
  private page_idx;
  private _route:any;

  constructor(public route: ActivatedRoute, public router: Router){
  	this._route = window['route'] = route;

  	this.listenForRouteChanges(route);
  	this.delegateEvents();
  }

  listenForRouteChanges(route){
  	this.route.params.subscribe( params => {
		console.log('AppService:route params subscribe', params);
		this.setParamsFromRouter(params);
	});
  }

  setParamsFromRouter(params){
	this.project_id = params['project_id'];
	this.user_id 	= params['user_id'];
	this.page_idx 	= params['page_idx'];
  }

  delegateEvents(){
  	self = this;

  	this.appSubject.subscribe( dto => {
		console.log('AppService:AppSubject:next', dto);

		if(dto.action === 'page:advance') this.advancePage();
	}, err => {
		console.log('AppSubject:err', err);
	}, () => {
		//console.log('AppSubject:success');
	});
  }

  advancePage(){
  	console.log('AppService:advancePage');
  	
  	this.transitionPageOut(this.page_idx);
  	this.removeCurrentPage(this.page_idx);
  	this.createPage(this.page_idx + 1);
  	this.transitionPageIn(this.page_idx + 1);
  }

  removeCurrentPage(oldPageIdx){
  	this.appSubject.next({
  		action: 'page:remove',
  		idx: oldPageIdx
  	});
  }

  createPage(newPageIdx){
  	this.appSubject.next({
  		action: 'page:create',
  		idx: newPageIdx
  	});
  }

  transitionPageOut(oldPageIdx){
  	this.appSubject.next({
  		action: 'page:transition:out',
  		idx: oldPageIdx
  	});
  }

  transitionPageIn(newPageIdx){
  	this.appSubject.next({
  		action: 'page:transition:in',
  		idx: newPageIdx
  	});
  }

  getAppSubject(){
  	return this.appSubject;
  }
}
