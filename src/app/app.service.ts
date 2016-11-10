
import { Injectable } 		from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {
  private appSubject: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(){}

  getAppSubject(){
  	return this.appSubject;
  }
}
