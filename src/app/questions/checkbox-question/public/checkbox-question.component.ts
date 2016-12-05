
import { Component, Inject } from '@angular/core';
import { QuestionComponent } from '../../question/public/question.component';

import { PageService }		 from './../../../page/public/page.service';
import { SocketService } 	 from "../../../shared/socket.service";

@Component({
  selector: 'checkbox-question',
  templateUrl: './checkbox-question.component.html',
  styleUrls: ['./checkbox-question.component.css']
})
export class CheckboxQuestionComponent extends QuestionComponent {
	public items:any;
	public name;
	protected connection;

	constructor(public pageService: PageService, protected socketService: SocketService){
	  super(pageService, socketService);
	  this.init();
  	}
	
	init(){ this.initSocket(); }

	initSocket(){
		this.socketService 	  = new SocketService();
		this.connection 	  = this.socketService.get(this.endpoint);
	}
	
	toggleChildSelection(target, blinkRate, animationSpeed):any{
	  	this.makeSelection(this, target, blinkRate, animationSpeed);
		  
	  	return false;
  	}
	
	extractDtoFromTarget(target){
		let dto:any  		= {};
		dto.text 	 		= target.innerHTML.trim(); 
		dto.type 	 		= 'checkbox';
		dto.selection_type 	= 'single';
		
		return dto;
	}

	postData(dto){ 
		this.socketService.save(dto);
		return this.connection; 
	}
}
