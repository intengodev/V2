
import { Http }				from '@angular/http';
import { Injectable } 		from '@angular/core';
import { Mocks }			from '../../../mocks';

let mocks = new Mocks;

@Injectable()
export class QuestionListService {
	private questionsAnswered:number = 0;
	public  questions = [];	
	private endpoint  = './api/questions'
	private tmp:any   = {};
	
	constructor(public http: Http){}

	/* 
	* Fetches By Page Order, not by page id
	*/
	setQuestionsForPage(project_id, page_idx){
		console.log('QuestionListService:setQuestionsForPage: ', page_idx);

		this.http.get(`${this.endpoint}/${project_id}/${page_idx}`).subscribe(
		resp => {
			console.log('resp: ', resp);
		}, 
		err => {
			console.error('error: ', err);
		}, 
		() => {
			console.log('complete');
		});
		this.tmp.questionKeysForPage = (typeof mocks.pages[page_idx] !== 'undefined') ? mocks.pages[page_idx].questions : '';
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

	clearQuestionList(questionRefs){
		console.log('questionRefs: ', questionRefs);
		if(typeof questionRefs == 'undefined' || questionRefs.length == 0) return;
		questionRefs.forEach( ref => {
			ref.destroy();
		}) 
	}
}
