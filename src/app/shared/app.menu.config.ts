import { MenuRootItem } from 'ontimize-web-ngx';

import { AccountsCardComponent } from './accounts-card/accounts-card.component';
import { BranchesCardComponent } from './branches-card/branches-card.component';
import { CustomersCardComponent } from './customers-card/customers-card.component';
import { EmployeesCardComponent } from './employees-card/employees-card.component';

export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'dashboard', route: '/main/home' },
  {
    id: 'views', name: 'VIEW', icon: 'remove_red_eye', opened: true,
    items: [
      {
        id: 'customers',
        name: 'CUSTOMERS',
        tooltip: 'CUSTOMERS_CONTENT',
        route: '/main/customers',
        icon: 'people',
        image: 'assets/images/ic_clientes.png',
        component: CustomersCardComponent
      },
      {
        id: 'accounts',
        name: 'ACCOUNTS',
        tooltip: 'ACCOUNTS_CONTENT',
        route: '/main/accounts',
        icon: 'credit_card',
        image: 'assets/images/ic_cuentas.png',
        component: AccountsCardComponent
      },
      {
        id: 'branches',
        name: 'BRANCHES',
        tooltip: 'BRANCHES_CONTENT',
        route: '/main/branches',
        icon: 'account_balance',
        image: 'assets/images/ic_sucursales.png',
        component: BranchesCardComponent
      },
      {
        id: 'employees',
        name: 'EMPLOYEES',
        tooltip: 'EMPLOYEES_CONTENT',
        route: '/main/employees',
        icon: 'person',
        image: 'assets/images/ic_empleados.png',
        component: EmployeesCardComponent
      }
    ]
  },
  {
    id: 'general', name: 'GENERAL', icon: 'info_outline', opened: false,
    items: [
      { id: 'settings', name: 'SETTINGS', route: '/main/settings', icon: 'settings' },
      { id: 'about', name: 'ABOUT', route: '/main/about', icon: 'help_outline' }
    ]
  },
  { id: 'user-management', name: 'User Management', icon: 'people', route: '/main/user-management' },
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' }
];

export const MENU_COMPONENTS = [
  AccountsCardComponent,
  CustomersCardComponent,
  BranchesCardComponent,
  EmployeesCardComponent
];
