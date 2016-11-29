
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
	public page_count;
	public $progressRef;

	constructor(
		private route: ActivatedRoute,  
		private pageService: PageService
	){
		console.log('progress bar constructor');
		this.pageSubject = this.pageService.getPageSubject();
	}
	
	ngOnInit(){
		console.log('initing pgoress bar'); 
	}
	
  	ngAfterViewInit(){
		this.listenForEvents();
		this.page_count = this.pageService.getPageCount();

		this.initProgressBar();
  	}
	
	listenForEvents(){
		self = this;
		this.pageSubject.subscribe( dto => {
			if(dto.action == 'page:transition:in'){
				let pageCount = this.pageService.getPageCount();
				this.update(dto.idx, pageCount);
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
