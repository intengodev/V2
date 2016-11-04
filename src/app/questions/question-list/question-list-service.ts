
import { Injectable } 		from '@angular/core';
import { Mocks }	from '../../mocks';

let mocks = new Mocks;

@Injectable()
export class QuestionListService {
	private questionsAnswered:number = 0;
	public  questions = [];	
	private tmp:any   = {};

	/*
	* Fetches By Page Order, not by page id
	*/
	setQuestionsForPage(page_idx){
		this.tmp.questionKeysForPage = mocks.pages[page_idx].questions;
		this.tmp.questionsForPage 	= [];
		
		mocks.questions.forEach( question => {
			if(this.tmp.questionKeysForPage.includes(question._id)) this.tmp.questionsForPage.push(question);
		}, this);

		this.questions = this.tmp.questionsForPage;
		//rm tmp
	}

	getQuestionsForPage(page_idx){
		return this.questions;
	}
}
