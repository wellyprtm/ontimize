import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementService } from './user-management.service';

export function starWarsSerficeF(injector: Injector): UserManagementService {
  return new UserManagementService(injector);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{
    provide: 'starWars',
    useFactory: starWarsSerficeF,
    deps: [Injector]
  }]

})
export class UserFactoryModule { }
