
import { NgModule, Injectable } from '@angular/core';
import { RouterModule, 
         Routes }        		    from '@angular/router';

import { AppComponent } 		    from './app.component';
import { PageComponent } 		    from './page/public/page.component';

const routes: Routes =[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageComponent },
  { path: ':project_id/:user_id/:page_idx', component: PageComponent }
];

//http://localhost:4200/#/20/876876/1

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  //this.router.navigate(['/', pid, this.user_id, nextPage]);
}