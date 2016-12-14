
import { NgModule, Injectable } from '@angular/core';
import { RouterModule, 
         Routes }        		    from '@angular/router';

import { AppComponent } 		    from './app.component';
import { PageComponent } 		    from './page/public/page.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

//Admin
import { AuthGuard }            from './admin/shared/auth-guard.service';
import { AdminLoginComponent } 	from './admin/admin-login/admin-login.component';
import { AdminHomeComponent } 	from './admin/admin-home/admin-home.component';


//https://angular.io/docs/ts/latest/guide/router.html
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageComponent },
  { path: 'admin', component: AdminLoginComponent },
  { path: 'admin/home', component: AdminHomeComponent, canActivate: [AuthGuard] },
  { 
    path: ':project_id/:user_id/:page_idx', component: PageComponent,
    children: [
      //{ path: '', redirectTo: 'progress', pathMatch: 'full'},
      { path: '', component: ProgressBarComponent }
    ]
  }
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