
import { Component } from '@angular/core';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'checkbox-question',
  templateUrl: './checkbox-question.component.html',
  styleUrls: ['./checkbox-question.component.css']
})
export class CheckboxQuestionComponent extends QuestionComponent {
	public questions:any  = [
		{
		text: 'What is the best phone on the market now?'
		},
		{
		text: 'Do you think Apple is competing technologically with Android?'
		},
		{
		text: 'Apple is going to be losing market share in the coming months?'
		},
		{
		text: 'Android phones are superior due to Apple\'s complacency'
		}
	];

	toggleChildSelection(target, blinkRate, animationSpeed):any{
	  	var selectionSubject = this.toggleSelection(target, blinkRate, animationSpeed);
	  	selectionSubject.subscribe(resp => {
	  		console.log('incrementing');
	  	},
	  	err => {
	  		console.log('error: ', err)
	  	},
	  	() => {
	  		
	  	});

	  	return false;
  	}
}
