
import { Component, ViewChild, 
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
  inputs: ['project_id', 'user_id', 'page_idx', 'appSubject'],
  entryComponents: [
  	CheckboxQuestionComponent,
  	RatingQuestionComponent,
  	MatrixQuestionComponent
  ]
})
export class QuestionListComponent {
	public  dev = false;
	public  questions:any;
	private componentRefs;
	private questionsAnswered = 0;
	private routesSubscription;
	public 	project_id:number;
	public  page_idx:number;
	public  pageSubject:any;

	constructor(
		private qss: QuestionListService,
		private viewContainer: ViewContainerRef, 
		private componentFactoryResolver:ComponentFactoryResolver,
		public pageService: PageService,
		private route: ActivatedRoute
	){
		console.log('QuestionListComponent:constructor');
		this.pageSubject = this.pageService.getPageSubject();
	}
	
	ngAfterContentInit(){
		console.log('questions initially: ', this.questions);
			
		this.createQuestionFactories();

		this.listenForEvents();
	}

	listenForEvents(){
		this.pageSubject.subscribe(dto => {
			console.log('QuestionListComponent:ngAfterContentInit', dto);

			if(dto.action === 'question:selection:made') {
				this.questionsAnswered = this.questionsAnswered + 1;
				this.dispatchQuestionSelection();
			}
		},
		err => {});

		this.routesSubscription = this.route.params.subscribe( params => {
			console.log('QuestionListService route subscribe', params);
			
			this.qss.clearQuestionList(this.componentRefs);
			this.questionsAnswered = 0;
			
			this.qss.setQuestionsForPage(this.project_id, params['page_idx']);
			this.questions = this.qss.getQuestionsForPage(params['page_idx']);

			
			this.componentRefs = this.projectQuestionComponents(this.questions);
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
		console.log('questions: ', questions);
		let _questions = (typeof questions !== 'undefined') ? questions : [];
		_questions.forEach((question, idx) => {
			let type  			 = question.type;
			let name 			 = type[0].toUpperCase() + type.substring(1) + 'QuestionFactory';
			var component 		 = this.viewContainer.createComponent(window['factories'][name]);
			
			//Set some attributes on the component instance
			component.instance['appSubject'] 		= window['that'].appSubject;
			component.instance['name'] 				= window['that'].questions[idx].name;
			component.instance['questionOptions'] 	= window['that'].questions[idx].items;			

			_questionComponents.push(component);
		});

		return _questionComponents;
	}
}
