import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementHomeComponent } from './user-management-home/user-management-home.component';


const routes: Routes = [{
  path: '',
  component: UserManagementHomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
