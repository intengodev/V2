
import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute }			from '@angular/router';
import { QuestionListComponent }  	from '../questions/question-list/question-list.component';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
	public  title:string = 'sample page';
	private project_id:number;
	private user_id:number;
	private page_id:number;
	

	constructor(private route: ActivatedRoute){
		route.params.subscribe( params => {
			this.project_id = params['project_id'];
			this.user_id 	= params['user_id'];
			this.page_id 	= params['page_id'];
		});
	}
	
	ngOnInit(){}

}
