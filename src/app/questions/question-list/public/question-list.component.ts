
import { Component, Input, ViewChild, 
		 ViewContainerRef, 
		 ComponentFactoryResolver }   from '@angular/core';

import { ActivatedRoute }			  from '@angular/router';

import { QuestionComponent }		  from '../../question/public/question.component';
import { CheckboxQuestionComponent }  from '../../checkbox-question/public/checkbox-question.component';
import { RatingQuestionComponent }    from '../../rating-question/public/rating-question.component';
import { MatrixQuestionComponent }    from '../../matrix-question/public/matrix-question.component';

import { QuestionListService }		  from './question-list-service';
import { PageService } 	 			  from './../../../page/public/page.service';

window['factories'] = {};

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  entryComponents: [
  	CheckboxQuestionComponent,
  	RatingQuestionComponent,
  	MatrixQuestionComponent
  ]
})
export class QuestionListComponent {
	@Input() project_id: number;
	@Input() page_idx:number;
	@Input() user_id:any;

	public  dev = false;
	public  questions:any;
	private componentRefs;
	private questionsAnswered = 0;
	private routesSubscription;
	public  pageSubject:any;

	constructor(
		private qss: QuestionListService,
		private viewContainer: ViewContainerRef, 
		private componentFactoryResolver:ComponentFactoryResolver,
		public pageService: PageService,
		private route: ActivatedRoute
	){
		this.pageSubject = this.pageService.getPageSubject();
	}
	
	ngAfterContentInit(){			
		this.createQuestionFactories();
		this.listenForEvents();
	}

	listenForEvents(){
		this.pageSubject.subscribe(dto => {
			if(dto.action === 'question:selection:made') {
				this.questionsAnswered = this.questionsAnswered + 1;
				this.dispatchQuestionSelection();
			}
		},
		err => {});

		this.routesSubscription = this.route.params.subscribe( params => {			
			if(typeof params['page_idx'] == 'undefined') return;
			
			this.qss.clearQuestionList(this.componentRefs);
			this.questionsAnswered = 0;
			
			this.qss.fetchQuestionsForPage(this.project_id, params['page_idx']).subscribe(
			resp => {
				let questions  = resp.json();
				this.qss.setQuestions(questions);
				this.questions = questions;
			}, 
			err => {
				console.error('error: ', err);
			}, 
			() => {
				this.questions 		= this.qss.getQuestions();
				this.componentRefs  = this.projectQuestionComponents(this.questions);
			});
		});
	}
	
	dispatchQuestionSelection(){
		let allQuestionsAnswered = this.haveAllQuestionsBeenAnswered();
		if(allQuestionsAnswered) return this.pageSubject.next({
			action: 'page:advance'
		});
	}

	haveAllQuestionsBeenAnswered(){
		return (this.questionsAnswered === this.questions.length); 
	}

	createQuestionFactories(){
		//1) Create a ComponentFactory	
		window['factories'].CheckboxQuestionFactory = this.componentFactoryResolver.resolveComponentFactory(CheckboxQuestionComponent);		
		window['factories'].RatingQuestionFactory   = this.componentFactoryResolver.resolveComponentFactory(RatingQuestionComponent);
		window['factories'].MatrixQuestionFactory   = this.componentFactoryResolver.resolveComponentFactory(MatrixQuestionComponent);
	}

	projectQuestionComponents(questions){
		window['that'] = this;
		var _questionComponents = [];
		let _questions = (typeof questions !== 'undefined') ? questions : [];

		_questions.forEach((question, idx) => {
			let type  			 = question.type;
			let name 			 = type[0].toUpperCase() + type.substring(1) + 'QuestionFactory';
			var component 		 = this.viewContainer.createComponent(window['factories'][name]);
			
			//Set some attributes on the component instance
			component.instance['appSubject'] 		= window['that'].appSubject;
			component.instance['name'] 				= window['that'].questions[idx].name;
			component.instance['items'] 			= window['that'].questions[idx].items;
			component.instance['options'] 			= window['that'].questions[idx].options;						

			_questionComponents.push(component);
		});

		return _questionComponents;
	}
}
