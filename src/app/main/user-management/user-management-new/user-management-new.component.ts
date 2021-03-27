import { Component, OnInit, ViewChild } from '@angular/core';
import { OFormComponent, OValueChangeEvent } from 'ontimize-web-ngx';
import { UserRole } from '../../constants/user-role.constant';
import { YesNo } from '../../constants/yes-no.constant';

@Component({
  selector: 'app-user-management-new',
  templateUrl: './user-management-new.component.html'
})
export class UserManagementNewComponent implements OnInit{


  @ViewChild('oForm', { static: false })
  private formFilter: OFormComponent;
  public listRole: UserRole[];
  public listYesNo: YesNo[];
  public isChangePassword: boolean;
  public showChangesPasswordCheckbox: boolean;
  public isActiveEnable: boolean;
  constructor() {
    this.listRole = UserRole.values;
    this.listYesNo = YesNo.values;
    this.isChangePassword = false;
    this.showChangesPasswordCheckbox = false;
    this.isActiveEnable = true;
  }
  ngOnInit() {
  }

  public checkInsert() {
    this.showChangesPasswordCheckbox = false;
    this.isChangePassword = true;
    this.isActiveEnable = false;
  }

  public checkUpdate() {
    this.showChangesPasswordCheckbox = true;
    this.isActiveEnable = true;
  }

  public changesCheck(event?: any) {
    event = event as OValueChangeEvent;
    if (event.newValue){
      this.isChangePassword = true;
    } else {
      this.isChangePassword = false;
    }
  }
}
