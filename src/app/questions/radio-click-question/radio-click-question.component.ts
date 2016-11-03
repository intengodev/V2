import { Component, OnInit } from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'radio-click-question',
  templateUrl: './radio-click-question.component.html',
  styleUrls: ['./radio-click-question.component.css']
})
export class RadioClickQuestionComponent implements OnInit {
  private uiBound:boolean = false;
  public items:string[]   = [
  	'How often do you use checkboxes?',
  	'Once a week',
  	'2-3 times a week',
  	'Once a day',
  	'Twice a day'
  ];

  constructor(){}
  ngOnInit(){}
  ngAfterContentChecked(){}

  makeSelection(evt){
  	jQuery(evt.target).transition({
		animation   : 'flash', 
		duration    : '600ms',
		repaint		: true,
		displayType : 'block'
	});

	return false;
  }
}
