
import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute }			from '@angular/router';
import { PageService } 	 			from '../page/public/page.service';

declare var $:any;
declare var jQuery:any;
var self;

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
	private pageSubject;
	public progress:number = 0;
	public current_page;
	public page_count;
	public $progressRef;

	constructor(
		public  route: ActivatedRoute,  
		private pageService: PageService
	){
		this.pageSubject = this.pageService.getPageSubject();
	}
	
  	ngAfterViewInit(){
		this.pageSubject.subscribe( dto => {
			if(dto.action === "page:data:refreshed"){
				this.page_count = this.pageService.getPageCount();
				this.initProgressBar();
				this.listenForEvents();
			}
		});
  	}
	
	listenForEvents(){
		this.route.params.subscribe( params => {
			if(typeof this.current_page === "undefined" || this.current_page !== params['page_idx']){
				this.current_page = params['page_idx'];
				this.update(this.current_page, this['page_count']);
			}
		});
	}

  	initProgressBar(){
		this.$progressRef = jQuery('#progress_bar');
  		this.$progressRef.progress({
			duration : 200,
			total    : 100
		});
		this.$progressRef.progress('set label', ' ')
		this.$progressRef.progress('set active');
		this.$progressRef.progress('set progress', 0)
  	}

	update(page_idx, pageCount){		
		this.progress = (page_idx / pageCount) * 100;
		this.$progressRef.progress('increment', this.progress);
	}
}
