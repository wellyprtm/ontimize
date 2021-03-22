import { Injectable, Injector } from '@angular/core';
import { Observable, OntimizeBaseService, Util } from 'ontimize-web-ngx';
import { StarsWarsResponseAdapter } from './user-management-response-adapter.service';

@Injectable()
export class UserManagementService extends OntimizeBaseService {

  constructor(protected injector: Injector) {
    super(injector);
  }

  public configureAdapter(){
    this.adapter = this.injector.get(StarsWarsResponseAdapter);
  }

  public query(kv?: Object, av?: Array<string>, entity?: string, sqltypes?: Object): Observable<any> {
    const urlApi = 'https://swapi.dev/api/' + entity + '/?format=json';

    return this.doRequest({
      method: 'GET',
      url: urlApi,
      options: {}
    });
  }

  public advancedQuery(kv?: Object, av?: Array<string>, entity?: string, sqltypes?: Object, offset?: number, pagesize?: number, orderby?: Array<Object>): Observable<any> {
    offset = (Util.isDefined(offset)) ? offset : this.offset;

    // Calculate page
    let page = 0;
    if (Util.isDefined(offset)) {
      page = Math.trunc(offset / 10) + 1;
    }

    let urlApi = 'https://swapi.dev/api/' + entity + '/?format=json' + '&page=' + page;

    return this.doRequest({
      method: 'GET',
      url: urlApi,
      options: {}
    });
  }

  public getSkywalker(): Observable<any> {
    const url = 'https://swapi.dev/api/people/1/?format=json';

    return this.doRequest({
      method: 'GET',
      url: url,
      options: {}
    });
  }
}

export interface User {
  count: number;
  next: string;
  previous: string;
  results: Object[];
}
