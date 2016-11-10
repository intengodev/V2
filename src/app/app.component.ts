
import { Component } 		from '@angular/core';
import { AppService }       from './app.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  outputs: ['AppService']
})
export class AppComponent {
	constructor(public appService: AppService){}
}
