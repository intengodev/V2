
import { Component, Inject } from '@angular/core';
import { QuestionComponent } from '../../question/public/question.component';
import { PageService }		 from './../../../page/public/page.service';

@Component({
  selector: 'checkbox-question',
  templateUrl: './checkbox-question.component.html',
  styleUrls: ['./checkbox-question.component.css']
})
export class CheckboxQuestionComponent extends QuestionComponent {
	public questionOptions:any;
	public name;
	
	constructor(public pageService: PageService){
	  super(pageService);
  	}

	toggleChildSelection(target, blinkRate, animationSpeed):any{
	  	var selectionSubject = this.toggleSelection(target, blinkRate, animationSpeed);
	  	selectionSubject.subscribe(resp => {
	  		console.log('CheckboxQuestionComponent:toggleChildSelection:next');
	  	},
	  	err => {
	  		console.log('error: ', err)
	  	},
	  	() => {
	  		this['pageSubject'].next({
	  			action: 'question:selection:made'
	  		});
	  	});

	  	return false;
  	}
}
