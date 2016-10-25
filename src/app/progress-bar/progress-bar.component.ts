import { Component, OnInit } from '@angular/core';

declare var $:any;
declare var jQuery:any;


@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
	ngOnInit(){}
  	ngAfterContentChecked(){
  		this.initProgressBar();
  	}

  	initProgressBar(){
  		jQuery('#progress_bar').progress({
			duration : 200,
			total    : 100,
			text     : {
				active: '{value} of {total}% done'
			}
		});
  	}
}
