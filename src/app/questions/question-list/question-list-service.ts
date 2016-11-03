
import { Injectable } 		from '@angular/core';

import { MockQuestions }	from './questions.mock';
let mocks = new MockQuestions;

@Injectable()
export class QuestionListService {
	private questionsAnswered:number = 0;
	public  questions = [];

	constructor(){
		this.questions =mocks.questions;
	}

	fetchQuestions(page_id){
		//some nifty http observable to get questions by page_id
		return this.questions;
	}
}
