
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } 	 from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  inputs: ['AppSubject']
})
export class QuestionComponent {
  private blinked = 0;
  private hightlightState = 0;
  private blinkInterval;
  private blinkRate;
  private selectionSubject = new BehaviorSubject(null);

  ngAfterContentInit(){}

  /*
  * Highlights the selection and does the nice blinking effect
  * returns a BehaviorSubject
  */
  toggleSelection(target, blinkRate, animationSpeed):any{
  	// console.log('parent toggle selection');

  	this.clearOptionSelections(document.querySelectorAll('.question-options .option'));

  	window['that'] = this;
  	this.blinkRate = blinkRate;
  	this.highlight(target);

  	this.blinkInterval = window.setInterval(function(){
  		window['that'].highlight(target);
  	}, animationSpeed);

  	return this.selectionSubject;
  }

  clearOptionSelections(targets){
  	targets.forEach(function(target){
  		target.classList.remove('selected');
  	});
  }

  highlight(target){
  	let toAdd:number 	 = (window['that'].hightlightState == 0) ? 1 : 0;
  	this.hightlightState = toAdd;

  	this.blinked = this.blinked + 1;
  		
	if(this.blinked == (this.blinkRate + 1)){
		window.clearInterval(this.blinkInterval);
		this.blinked = 0;
		this.hightlightState = 0;
		delete this.blinkInterval;
		this.selectionSubject.complete();

		return false;
	}

  	if(toAdd == 1){
  		target.classList.add('selected');
  		this.hightlightState = 1;
  	} else {
  		target.classList.remove('selected');
  	}
  }
}
