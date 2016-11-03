
import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'matrix-question',
  host: { 'class': 'matrix-question' },
  templateUrl: './matrix-question.component.html',
  styleUrls: ['./matrix-question.component.css']
})
export class MatrixQuestionComponent extends QuestionComponent implements OnInit {
  public questions:any = [
  {
  	text: 'What is the best phone on the market now?'
  },
  {
  	text: 'Do you think Apple is competing technologically with Android?'
  },
  {
  	text: 'Apple is going to be losing market share in the coming months?'
  },
  {
  	text: 'Android phones are superior due to Apple\'s complacency'
  }
  ];
  public options:any = [
  {
  	text: 'Dont Agree'
  },
  {
  	text: 'Neutral'
  },
  {
  	text: 'Definately Agree'
  }
  ];

  constructor(){
  	super();
  }

  ngOnInit(){}


}
