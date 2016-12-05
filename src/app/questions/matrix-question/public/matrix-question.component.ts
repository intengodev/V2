
import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../../question/public/question.component';

import { PageService }		 from './../../../page/public/page.service';
import { SocketService } 	 from "../../../shared/socket.service";

@Component({
  selector: 'matrix-question',
  host: { 'class': 'matrix-question' },
  templateUrl: './matrix-question.component.html',
  styleUrls: ['./matrix-question.component.css']
})
export class MatrixQuestionComponent extends QuestionComponent {
	private parent;
	private currentPager  	= 0;
	private questionCount 	= 0;
	private selections:any 	= {};
	public  options:any;
	public  questions:any   = [];
	protected connection;

	constructor(public pageService: PageService, protected socketService: SocketService){
		super(pageService, socketService);
		this.questionCount 		= this.questions.length;
		this.selections.count 	= 0;
	
		this.init();
  	}
	
	init(){ 
		this.initSocket();
		this.listenForEvents(); 
	}
	
	ngAfterViewInit(){
		this.questionCount = this['items'].length;
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

		if(this.questionIsFinished(nextIdx)){
			let dto = {
				type: 'matrix',
				selection_type: 'multi',
				selections: this.selections
			};
			
			this.postData(dto).subscribe( resp => {
				console.log('matrix post data resp: ');

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
		let isFinished = (endReached === true && (this.selections.count >= this.questionCount));

		return isFinished;
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

		this.socketService.save(dto);
		return this.connection; 
	}
}
