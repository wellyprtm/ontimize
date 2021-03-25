import { Injectable, Injector } from '@angular/core';
import { Observable, OntimizeBaseService, OntimizeEEService, ServiceResponse, Util } from 'ontimize-web-ngx';
import { Subscriber } from 'rxjs';
import { UserManagementResponseAdapter } from './user-management-response-adapter.service';

@Injectable()
export class UserManagementService extends OntimizeEEService {

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
    let page = 1;
    if (Util.isDefined(offset)) {
      page = Math.trunc(offset / 10) + 1;
    }
    console.log(kv);
    console.log(av);
    let urlParam = '';
    if (Util.isDefined(kv)) {
      if (kv instanceof Map) {
        urlParam = Object.keys(kv).map(key => key + '=' + kv[key]).join('&');
      } else {
        const a = kv as Map<string, Object>;
        console.log(a.values);
        urlParam = Object.keys(kv.valueOf()).map(key => key + '=' + kv[key]).join('&');
        console.log(Object.keys(kv.valueOf()));
      }
    }
    if (Util.isDefined(av)) {
      urlParam = Object.keys(kv).map(key => key + '=' + kv[key]).join('&');
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
    body.username = required.username;
    body.role = required.role;
    body.active = required.active;

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
