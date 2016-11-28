
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
	public questionOptions:any;
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
		console.log('CheckboxQuestionComponent:extractDtoFromTarget');
		
		let dto:any  = {};
		dto.text 	 = target.innerHTML.trim(); 
		dto.type 	 = 'checkbox';

		return dto;
	}

	postData(dto){
		console.log('CheckboxQuestionComponent:postData');
		return this.http.post(this.endpoint, dto);
	}
}
