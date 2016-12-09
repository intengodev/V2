
import { Injectable } 		from '@angular/core';
import { Http } 			from '@angular/http';

import { Observable } 		from "rxjs";
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
 
import { SocketService } 	from "./../../shared/socket.service";

var self;

@Injectable()
export class PageService {
	private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
	private endpoint = '/api/pages';
	private pageSubject: BehaviorSubject<any> = new BehaviorSubject({});
  	public  socketObservable;

	private project_id;
	private user_id;
	public  page_idx;
	private page_data; 

	constructor(public http: Http, private socketService: SocketService){
		this.init();
	}

	init(){
		console.log('initing page service');
		this.initSocket();
		this.delegateEvents();
	}

	initSocket(){
		this.socketService 	  = new SocketService();
		this.socketObservable = this.socketService.get('/pages');
		
		this.socketObservable.subscribe((socketItem) => {
			console.log('socket message: ', socketItem);
		}, 
		err => console.error('socket error: ', err));
	}

	setParamsFromRouter(params){
		this.project_id = params['project_id'];
		this.user_id 	= params['user_id'];
		this.page_idx 	= params['page_idx'];
	}

	setPagesData(data){
		this.page_data = data;
	}	

  	getPagesData(){
		return this.page_data;
  	}

	getPageCount(){
		let retVal = (typeof this.page_data === 'undefined') ?  1 : this.page_data.length;
		return retVal;
	}
	
	/**
	 * Fetches all pages data for project
	 * TODO://Change the message the socketObservable submits upon success
	 * TODO:// Come up with a dto interface
	 */
  	fetchPagesData(project_id){
		this.socketService.fetch('pages', project_id);
		return this.socketObservable;
  	}
	
	/**
	 * Get data for a page by index
	 */
	getDataForPage(page_idx){
		let pageData;
		this.page_data.forEach( page => {
			if(page.page_idx == page_idx) pageData = page;
		});

		return pageData;
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
			let newPageIdx = parseInt(this.page_idx) + 1;

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
