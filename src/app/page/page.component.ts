
import { Component, OnInit } 		from '@angular/core';

import { QuestionListComponent }  	from '../questions/question-list/question-list.component';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
	public title:string;

	constructor(){
		this.title = 'sample page';
	}
	
	ngOnInit(){}

}
