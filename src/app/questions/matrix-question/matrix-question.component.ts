
import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'matrix-question',
  host: { 'class': 'matrix-question' },
  templateUrl: './matrix-question.component.html',
  styleUrls: ['./matrix-question.component.css']
})
export class MatrixQuestionComponent extends QuestionComponent {
	private parent;
	private currentPager  = 0;
	private questionCount = 0
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

	public options:any = [
	  {
	  	text: 'Dont Agree'
	  },
	  {
	  	text: 'Neutral'
	  },
	  {
	  	text: 'Definately Agree'
	  }
	];

  constructor(){
  	super();
  	this.questionCount = this.questions.length;
  }

  ngAfterContentInit(){
  	//init code here
  }

  toggleChildSelection(target, blinkRate, animationSpeed):any{
  	var selectionSubject = this.toggleSelection(target, blinkRate, animationSpeed);
  	selectionSubject.subscribe(resp => {
  		console.log('incrementing');
  	},
  	err => {
  		console.log('error: ', err)
  	},
  	() => {
  		this.advanceQuestion();
  	});

  	return false;
  }

  advanceQuestion(){
  	this.animateOutOldQuestion(this.currentPager);
  	this.incrementPager((this.currentPager + 1));
  	this.animateInNewQuestion(this.currentPager);
  }

  animateOutOldQuestion(oldQuestionIdx){
  	var targetQuestion  = document.querySelectorAll('#question-' + oldQuestionIdx)[0];
  	targetQuestion.classList.add('remove');
  	targetQuestion.classList.remove('remove');
  }

  animateInNewQuestion(currentPager){
  	var targetQuestion  = document.querySelectorAll('#question-' + currentPager)[0];
  	targetQuestion.classList.add('current');
  }

  incrementPager(to:number){
  	if(to == this.questionCount) {
  		console.log('reached the end at: ', this.questionCount);
  		return this.currentPager = 0;
  	}
  	this.currentPager = to;
  }
}
