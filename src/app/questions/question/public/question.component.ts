
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } 	 from 'rxjs/BehaviorSubject';

import { PageService }		 from './../../../page/public/page.service';
import { SocketService } 	 from "../../../shared/socket.service";

@Component({
  selector: 'app-question',
  template: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  private   blinked = 0;
  private   hightlightState = 0;
  private   blinkInterval;
  private   blinkRate;
  protected pageSubject;
  protected endpoint:string = '/questions';

  constructor(public pageService: PageService, protected socketService: SocketService){
	  this.pageSubject = this.pageService.getPageSubject();
  }
  

  /*
  * Initiates the HTTP request to save the selection and delegates the 
  * questionAnimation
  */
  makeSelection(child, target, blinkRate, animationSpeed):any {
	this.toggleSelection(target, blinkRate, animationSpeed);
	
	let dto  = child.extractDtoFromTarget(target);
	if(typeof dto.selection_type !== 'undefined' && dto.selection_type !== 'multi'){
		child.postData(dto).subscribe( dto => {
			if(dto.action == 'item:save:success'){
				this['pageSubject'].next({
					action: 'question:selection:made',
					data: dto
				}); 
			} else {
				console.error('question data post failed: ', dto);
			}
		}, 
		err => {
			console.log('post error: ', err);
		}, 
		resp => {});
	} else {
		this['pageSubject'].next({
			action: 'question:multiselection:made'
	 	});	
	}
  }
  
  /*
  * Highlights the selection and does the nice blinking effect
  * returns a BehaviorSubject
  */
  toggleSelection(target, blinkRate, animationSpeed):any {
	if(typeof target.skipHighlight !== "undefined" && target.skipHighlight == true) return;
	
  	this.clearOptionSelections(document.querySelectorAll('.question-options .option'));
  	this.blinkRate = blinkRate;
  	this.highlight(target);
	
  	this.blinkInterval = window.setInterval(() => {
  		this.highlight(target);
  	}, animationSpeed);
  }

  clearOptionSelections(targets){
  	targets.forEach(function(target){
  		target.classList.remove('selected');
  	});
  }

  highlight(target){
  	let toAdd:number 	 = (this.hightlightState == 0) ? 1 : 0;
  	this.hightlightState = toAdd;

  	this.blinked = this.blinked + 1;
  		
	if(this.blinked == (this.blinkRate + 1)){
		window.clearInterval(this.blinkInterval);
		this.blinked = 0;
		this.hightlightState = 0;
		delete this.blinkInterval;
		
		return false;
	}

  	if(toAdd == 1){
  		target.classList.add('selected');
  		this.hightlightState = 1;
  	} else {
  		target.classList.remove('selected');
  	}
  }
}
