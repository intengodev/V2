
import { Component, OnInit } 		from '@angular/core';

import { QuestionComponent }		from '../question/question.component';
import { QuestionListService }		from './question-list-service';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
	public questions:any;
	constructor(private qss: QuestionListService){
		this.questions = this.qss.fetchQuestions(5);
	}
	ngOnInit(){}

}
