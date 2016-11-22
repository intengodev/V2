
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
	console.log('AppService:contructor');
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
	console.log('AppService:setParamsFromRouter', params);

	this.project_id = params['project_id'];
	this.user_id 	= params['user_id'];
	this.page_idx 	= params['page_idx'];
  }

  delegateEvents(){
  	self = this;
	console.log('AppService delegating events: ');

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
	let oldPageIdx = this.page_idx;
  	let newPageIdx = this.page_idx + 1;

	console.log('AppService:advancePage oldPageIdx / newPageIdx: ', oldPageIdx, newPageIdx);

  	this.transitionPageOut(oldPageIdx);
  	this.transitionPageIn(newPageIdx);
  }

  transitionPageOut(oldPageIdx){
	console.log('AppService:transitionPageOut');
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
