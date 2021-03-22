import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseServiceResponse, OntimizeServiceResponse, ServiceResponseAdapter, Util } from 'ontimize-web-ngx';
import { User } from './user-management.service';

@Injectable({ providedIn: 'root' })
export class StarsWarsResponseAdapter implements ServiceResponseAdapter<BaseServiceResponse> {


  adapt(resp: HttpResponse<User>): BaseServiceResponse {
    let code = 1;
    let data = [];
    const message = '';
    const sqlTypes = {};
    let startRecordIndex = 0;
    let totalQueryRecordsNumber = 0;

    // Adapt the data received from the service
    if (resp.body) {
      code = 0;
      if (resp.body.results) {
        data = resp.body.results;
        totalQueryRecordsNumber = resp.body.count;
      } else {
        data = [resp.body];
      }
    }

    // Create Ontimize service response with the data adapted
    return new OntimizeServiceResponse(code, data, message, sqlTypes, startRecordIndex, totalQueryRecordsNumber);
  }

}
