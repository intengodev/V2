
import { Http }				from '@angular/http';
import { Injectable } 		from '@angular/core';
import { Mocks }			from '../../../mocks';

let mocks = new Mocks;

@Injectable()
export class QuestionListService {
	private questionsAnswered:number = 0;
	public  questions = [];	
	private endpoint  = 'http://localhost:8080/api/questions';
	private tmp:any   = {};
	
	constructor(public http: Http){}

	/* 
	* Fetches By Page Order, not by page id
	*/
	fetchQuestionsForPage(project_id, page_idx){
		return this.http.get(`${this.endpoint}/${project_id}/${page_idx}`);
	}

	setQuestions(questions){
		this.questions = questions;
	}

	getQuestions(){
		return this.questions;
	}

	clearQuestionList(questionRefs){
		console.log('questionRefs: ', questionRefs);
		if(typeof questionRefs == 'undefined' || questionRefs.length == 0) return;
		questionRefs.forEach( ref => {
			ref.destroy();
		}) 
	}
}
