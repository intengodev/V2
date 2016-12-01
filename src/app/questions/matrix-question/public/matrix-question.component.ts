
import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../../question/public/question.component';
import { PageService }		 from './../../../page/public/page.service';
import { Http }				 from '@angular/http';

@Component({
  selector: 'matrix-question',
  host: { 'class': 'matrix-question' },
  templateUrl: './matrix-question.component.html',
  styleUrls: ['./matrix-question.component.css']
})
export class MatrixQuestionComponent extends QuestionComponent {
	private parent;
	private endpoint 	  	= './api/questions/matrix';
	private currentPager  	= 0;
	private questionCount 	= 0;
	private selections:any 	= {};
	public  options:any;
	public  questions:any  	= [
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

	constructor(public pageService: PageService, public http: Http){
		super(pageService);
		this.questionCount = this.questions.length;
		this.selections.count = 0;

		this.listenForEvents();	
	}

	listenForEvents(){
		this.pageSubject.subscribe( dto => { if(dto.action == 'question:multiselection:made') this.advanceQuestion(); });
	}

	toggleChildSelection(target, blinkRate, animationSpeed):any{
		this.makeSelection(this, target, blinkRate, animationSpeed);	  
		return false;
	}

	getNextIndex($event?){
		let to;
		if(typeof $event !== 'undefined'){
			to = ($event.target.classList.contains('left') == true) ? (this.currentPager - 1) : (this.currentPager + 1);
		} else {
			to = (this.currentPager + 1);
		}

		return to;
	}

	advanceQuestion($event?){
		let nextIdx = this.getNextIndex($event);	
		console.log('nextIdx: ', nextIdx);

		if(this.questionIsFinished(nextIdx)){
			this.postData(this.selections).subscribe( resp => {
				this.pageSubject.next({
					action: 'question:selection:made',
					type: 'matrix'
				});
			});
		}

		this.animateOutOldQuestion(this.currentPager);
		this.incrementPager(nextIdx);
		this.animateInNewQuestion(this.currentPager);

		return false;
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
		if(to == this.questionCount) return this.currentPager = 0;
		this.currentPager = to;
	}
	
	questionIsFinished(count):boolean {
		let endReached = count == this.questionCount;

		return (endReached === true && (this.selections.count >= this.questionCount));
	}

	extractDtoFromTarget(target){
		let dto:any  		= {};

		let question_text 	= target.parentElement.parentElement.querySelector('.question.current').innerHTML.trim();
		let option_text 	= target.innerHTML.trim();

		dto.text 	 		= `${question_text}:${option_text}`; 
		dto.type 	 		= 'matrix';
		dto.selection_type  = 'multi';
		
		this.selections.count = this.selections.count + 1; 
		this.selections[this.currentPager] = dto.text;

		return dto;
	}
	
	postData(dto){
		delete dto.count; 
		return this.http.post(this.endpoint, dto); 
	}
}
