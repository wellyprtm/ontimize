import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementDetailComponent } from './user-management-detail/user-management-detail.component';
import { UserManagementHomeComponent } from './user-management-home/user-management-home.component';
import { UserManagementNewComponent } from './user-management-new/user-management-new.component';


const routes: Routes = [
  { path: '', component: UserManagementHomeComponent},
  { path: 'new', component: UserManagementNewComponent},
  { path: ':id',
    component: UserManagementNewComponent,
    data: {
      oPermission: {
        permissionId: 'user-management-detail'
      }
    }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
