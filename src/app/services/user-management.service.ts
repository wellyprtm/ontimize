import { Injectable, Injector } from '@angular/core';
import { Observable, OntimizeBaseService, OntimizeEEService, ServiceResponse, Util } from 'ontimize-web-ngx';
import { Subscriber } from 'rxjs';
import { CustomExpression } from '../main/employees/employees-home/employees-home.component';
import { UserManagementResponseAdapter } from './user-management-response-adapter.service';

@Injectable()
export class UserManagementService extends OntimizeBaseService {

  private baseUrl: string;

  constructor(protected injector: Injector) {
    super(injector);
    this.baseUrl = 'http://localhost:8080/api/private/';
  }

  public configureAdapter(){
    this.adapter = this.injector.get(UserManagementResponseAdapter);
  }

  public query(kv?: Object, av?: Array<string>, entity?: string, sqltypes?: Object): Observable<any> {
    const user = kv as User;
    const urlApi = this.baseUrl + entity + '/' + user.id;

    return this.doRequest({
      method: 'GET',
      url: urlApi,
      options: {}
    });
  }

  public advancedQuery(kv?: Object, av?: Array<string>, entity?: string,
    sqltypes?: Object, offset?: number, pagesize?: number, orderby?: Array<Object>): Observable<any> {
    offset = (Util.isDefined(offset)) ? offset : this.offset;

    // Calculate page
    console.log(orderby)
    let page = 1;
    if (Util.isDefined(offset)) {
      page = Math.trunc(offset / 10) + 1;
    }
    let urlParam = '';
    if (Object.keys(kv).length) {
      if (kv instanceof Map) {
        urlParam = Object.keys(kv).map(key => key + '=' + kv[key]).join('&');
      } else {
        let map = new Object();
        Object.keys(kv).map(key => map = kv[key]);
        map = (map as CustomExpression).field;
        urlParam = Object.keys(map).map(k => k + '=' + map[k]).join('&');
      }
    }

    if (urlParam) {
      urlParam = '&' + urlParam;
    }

    if (orderby.length) {
      for (const idx of orderby) {
        urlParam = urlParam + '&sorts=' + idx['columnName'] + '-' + (idx['ascendent'] ? 'asc' : 'desc');
      }
    }

    const fullUrl = this.baseUrl + entity + '?' + 'page=' + page + '&pageSize=' + pagesize + urlParam;
    return this.doRequest({
      method: 'GET',
      url: fullUrl,
      options: {}
    });
  }

  public insert(av: object = {}, entity: string, sqltypes?: object): Observable<any> {

    const url = this.baseUrl + entity;

    const body = av as User;
    return this.doRequest({
      method: 'POST',
      url,
      body,
      successCallback: this.parseSuccessfulInsertResponse,
      errorCallBack: this.parseUnsuccessfulInsertResponse
    });
  }

  public update(kv: object, av: object = {}, entity: string, sqltypes?: object): Observable<any> {

    const url = this.baseUrl + entity;
    const required = kv as User;
    const body = av as User;
    body.id = required.id;
    body.version = required.version;

    if (!body.username) {
      body.username = required.username;
    }

    if (!body.role) {
      body.role = required.role;
    }

    if (!body.realName) {
      body.realName = required.realName;
    }

    if (!Util.isDefined(body.active)) {
      body.active = required.active;
    }

    return this.doRequest({
      method: 'PUT',
      url,
      body,
      successCallback: this.parseSuccessfulUpdateResponse,
      errorCallBack: this.parseUnsuccessfulUpdateResponse
    });
  }

  public delete(kv?: object, entity?: string, sqltypes?: object): Observable<any> {

    const id = (kv as User).id;
    const url = this.baseUrl + entity + '/' + id;

    return this.doRequest({
      method: 'DELETE',
      url,
      successCallback: this.parseSuccessfulUpdateResponse,
      errorCallBack: this.parseUnsuccessfulUpdateResponse
    });
  }


}
export interface User {
  id?: string;
  username?: string;
  realName?: string;
  role?: string;
  version?: number;
  active?: boolean;
  password?: string;
}
