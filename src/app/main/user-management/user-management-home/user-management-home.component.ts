import { Component, ViewChild } from '@angular/core';
import { OFormComponent, OTableComponent } from 'ontimize-web-ngx';
import { UserRole } from '../../constants/user-role.constant';
import { YesNo } from '../../constants/yes-no.constant';
import { CustomExpression } from '../../employees/employees-home/employees-home.component';

@Component({
  selector: 'app-user-management-home',
  templateUrl: './user-management-home.component.html',
  styleUrls: ['./user-management-home.component.scss']
})
export class UserManagementHomeComponent {

  @ViewChild('table', { static: true }) table: OTableComponent;
  @ViewChild('formFilter', { static: false })
  private formFilter: OFormComponent;
  private roleList: UserRole[];
  private yesNoList: YesNo[];
  constructor() {
    this.roleList = UserRole.values;
    this.yesNoList = YesNo.values;
  }
  public createFilter1(values: Array<{attr: string, value: any}>): CustomExpression {
    const filters: CustomExpression = {};
    const maps = new Map();
    values.forEach(fil => {
      if (fil.value) {
        console.log(fil);
        maps.set(fil.attr, fil.value);
      }
    });

    // Build complex expression
    if (maps) {
      filters.field = maps;
      console.log(filters);
      return filters;
    } else {
      return null;
    }
  }

}
