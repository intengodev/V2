
import { Component, ViewChild, 
		 ViewContainerRef, 
		 ComponentFactoryResolver }   from '@angular/core';

import { QuestionComponent }		  from '../question/question.component';
import { CheckboxQuestionComponent }  from '../checkbox-question/checkbox-question.component';
import { RatingQuestionComponent }    from '../rating-question/rating-question.component';
import { MatrixQuestionComponent }    from '../matrix-question/matrix-question.component';

import { QuestionListService }		  from './question-list-service';

window['factories'] = {};

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  inputs: ['project_id', 'user_id', 'page_id'],
  entryComponents: [
  	CheckboxQuestionComponent,
  	RatingQuestionComponent,
  	MatrixQuestionComponent
  ]
})
export class QuestionListComponent {
	@ViewChild('container', {read:ViewContainerRef}) container;
	public  dev = false;
	public  questions:any;
	public  page_id:number;
	private componentRefs;

	constructor(
		private qss: QuestionListService,
		private viewContainer: ViewContainerRef, 
		private componentFactoryResolver:ComponentFactoryResolver
	){}
	
	ngAfterContentInit(){
		this.questions 			= this.qss.fetchQuestions(this.page_id);
		
		this.createFactories();
		this.componentRefs = this.fetchQuestionComponents(this.questions);
	}

	createFactories(){
		//1) Create a ComponentFactory	
		window['factories'].CheckboxQuestionFactory = this.componentFactoryResolver.resolveComponentFactory(CheckboxQuestionComponent);		
		window['factories'].RatingQuestionFactory   = this.componentFactoryResolver.resolveComponentFactory(RatingQuestionComponent);
		window['factories'].MatrixQuestionFactory   = this.componentFactoryResolver.resolveComponentFactory(MatrixQuestionComponent);
	}

	fetchQuestionComponents(questions){
		window['that'] = this;
		var _questionComponents = [];
		
		questions.forEach(question => {
			let type  			 = question.type;
			let name 			 = type[0].toUpperCase() + type.substring(1) + 'QuestionFactory';

			//2) Create a ComponentRef window['that'].viewContainer.createComponent(componentFactory);
			_questionComponents.push(this.viewContainer.createComponent(window['factories'][name]));
		});

		return _questionComponents;
	}

	projectQuestions(questionComponents){
		console.log(questionComponents);
	}
}
