
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
  inputs: ['project_id', 'user_id', 'page_idx'],
  entryComponents: [
  	CheckboxQuestionComponent,
  	RatingQuestionComponent,
  	MatrixQuestionComponent
  ]
})
export class QuestionListComponent {
	public  dev = false;
	public  questions:any;
	public  page_idx:number;
	private componentRefs;

	constructor(
		private qss: QuestionListService,
		private viewContainer: ViewContainerRef, 
		private componentFactoryResolver:ComponentFactoryResolver
	){}
	
	ngAfterContentInit(){
		this.qss.setQuestionsForPage(this.page_idx);
		this.questions 			= this.qss.getQuestionsForPage(this.page_idx);
		
		this.createQuestionFactories();
		this.componentRefs = this.projectQuestionComponents(this.questions);
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
		
		questions.forEach(question => {
			let type  			 = question.type;
			let name 			 = type[0].toUpperCase() + type.substring(1) + 'QuestionFactory';

			//2) Create a ComponentRef window['that'].viewContainer.createComponent(componentFactory);
			_questionComponents.push(this.viewContainer.createComponent(window['factories'][name]));
		});

		return _questionComponents;
	}
}
