
import { Component } from '@angular/core';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'checkbox-question',
  templateUrl: './checkbox-question.component.html',
  styleUrls: ['./checkbox-question.component.css'],
  inputs: ['appSubject']
})
export class CheckboxQuestionComponent extends QuestionComponent {
	public questionOptions:any;
	public name;

	toggleChildSelection(target, blinkRate, animationSpeed):any{
	  	var selectionSubject = this.toggleSelection(target, blinkRate, animationSpeed);
	  	selectionSubject.subscribe(resp => {
	  		console.log('CheckboxQuestionComponent:toggleChildSelection:next');
	  	},
	  	err => {
	  		console.log('error: ', err)
	  	},
	  	() => {
	  		this['appSubject'].next({
	  			action: 'question:selection:made'
	  		});
	  	});

	  	return false;
  	}
}
