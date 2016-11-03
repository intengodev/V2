
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  private blinked = 0;
  private hightlightState = 0;
  private blinkInterval;
  private blinkRate;

  constructor(){}
  ngOnInit(){}

  toggleSelection(target, blinkRate, animationSpeed){
  	this.clearOptionSelections(document.querySelectorAll('.matrix-options .option'));

  	window['that'] = this;
  	this.blinkRate = blinkRate;
  	this.highlight(target);

  	this.blinkInterval = window.setInterval(function(){
  		console.log('firing interval: ', animationSpeed);
  		window['that'].highlight(target);
  	}, animationSpeed);

  	return false;
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
