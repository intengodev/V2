
import { Component, Inject } from '@angular/core';
import { QuestionComponent } from '../../question/public/question.component';
import { PageService }		 from './../../../page/public/page.service';
import { Http } 			 from '@angular/http';

@Component({
  selector: 'checkbox-question',
  templateUrl: './checkbox-question.component.html',
  styleUrls: ['./checkbox-question.component.css']
})
export class CheckboxQuestionComponent extends QuestionComponent {
	public items:any;
	public name;
	public endpoint = './api/questions/checkbox';

	constructor(public pageService: PageService, public http: Http){
	  super(pageService);
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

	postData(dto){ return this.http.post(this.endpoint, dto); }
}
