import { Component, OnInit, ViewChild } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';
import { UserRole } from '../../constants/user-role.constant';
import { YesNo } from '../../constants/yes-no.constant';
import { CustomExpression } from '../../employees/employees-home/employees-home.component';

@Component({
  selector: 'app-user-management-new',
  templateUrl: './user-management-new.component.html'
})
export class UserManagementNewComponent {


  @ViewChild('formFilter', { static: false })
  private formFilter: OFormComponent;
  public listRole: UserRole[];
  public listYesNo: YesNo[];
  constructor() {
    this.listRole = UserRole.values;
    this.listYesNo = YesNo.values;
  }


}
