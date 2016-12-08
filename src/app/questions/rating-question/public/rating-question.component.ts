
import { Component }         from '@angular/core';
import { QuestionComponent } from '../../question/public/question.component';

import { PageService }		   from './../../../page/public/page.service';
import { SocketService } 	   from "../../../shared/socket.service";

declare var $:any;

@Component({
  selector: 'rating-question',
  templateUrl: './rating-question.component.html',
  styleUrls: ['./rating-question.component.css']
})
export class RatingQuestionComponent extends QuestionComponent {
	private selections:any 	= {};
	public  options:any;
	protected connection;

  constructor(public pageService: PageService, protected socketService: SocketService){
		super(pageService, socketService);
		this.init();
  }
	
	init(){ 
		this.initSocket();
		this.listenForEvents(); 
	}

  initSocket(){
		this.socketService 	  = new SocketService();
		this.connection 	  = this.socketService.get(this.endpoint);
	}

  listenForEvents(){
		this.pageSubject.subscribe( dto => {
			if(dto.action == 'question:multiselection:made') this.advanceQuestion(); 
		});
	}

  ngAfterViewInit(){ 
		$('.ui.rating').rating('setting', 'clearable', true); 
	}

	toggleChildSelection(target, blinkRate, animationSpeed):any{
    target.skipHighlight = true;

		this.makeSelection(this, target, blinkRate, animationSpeed);	  
		return false;
	}

	advanceQuestion($event?){
			let dto = {
				type: 'rating',
				selection_type: 'single'
			};
			
			this.postData(dto).subscribe( resp => {
				console.log('matrix post data resp: ');

				this.pageSubject.next({
					action: 'question:selection:made',
					type: 'rating'
				});
			});
	}

	extractDtoFromTarget(target){
		let dto:any  		    = {};
		dto.text 	 		      = (target.parentElement.querySelectorAll('.selected').length - 1); 
		dto.type 	 		      = 'rating';
		dto.selection_type  = 'single';
		
		return dto;
	}
	
	postData(dto){
		delete dto.count;  

		this.socketService.save(dto);
		return this.connection; 
	}
}
