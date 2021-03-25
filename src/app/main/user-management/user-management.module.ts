import { Injector, NgModule } from '@angular/core';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementHomeComponent } from './user-management-home/user-management-home.component';
import { UserManagementService } from 'src/app/services/user-management.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { UserManagementNewComponent } from './user-management-new/user-management-new.component';
import { UserManagementDetailComponent } from './user-management-detail/user-management-detail.component';

export function userManagementServiceFactory(injector: Injector): UserManagementService {
  return new UserManagementService(injector);
}

@NgModule({
  declarations: [UserManagementHomeComponent, UserManagementNewComponent, UserManagementDetailComponent],
  imports: [
    SharedModule,
    OntimizeWebModule,
    UserManagementRoutingModule
  ],
  providers : [{
    provide: 'userService',
    useFactory: userManagementServiceFactory,
    deps: [Injector]
  }]
})
export class UserManagementModule { }
