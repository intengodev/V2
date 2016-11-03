import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'rating-question',
  templateUrl: './rating-question.component.html',
  styleUrls: ['./rating-question.component.css']
})
export class RatingQuestionComponent implements OnInit {
  constructor(){}
  ngOnInit(){}

  ngAfterViewChecked(){
  	$('.ui.rating').rating('setting', 'clearable', true);
  }
}
