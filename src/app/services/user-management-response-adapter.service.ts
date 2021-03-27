import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseServiceResponse, OntimizeServiceResponse, ServiceResponseAdapter, Util } from 'ontimize-web-ngx';

@Injectable({ providedIn: 'root' })
export class UserManagementResponseAdapter implements ServiceResponseAdapter<BaseServiceResponse> {


  adapt(resp: HttpResponse<BaseResponse>): BaseServiceResponse {
    let code = 1;
    let data = [];
    const message = '';
    const sqlTypes = {};
    let startRecordIndex = 0;
    let totalQueryRecordsNumber = 0;
    // Adapt the data received from the service
    if (resp.ok) {
      code = 0;
      if (resp.body) {
        if (resp.body.data) {
          data = resp.body.data;
          if (resp.body.pagination) {
            totalQueryRecordsNumber = resp.body.pagination.totalRecords;
          }

        } else {
          data = [resp.body];
        }
      } else {
        data = [];
      }

    }

    // Create Ontimize service response with the data adapted
    return new OntimizeServiceResponse(code, data, message, sqlTypes, startRecordIndex, totalQueryRecordsNumber);
  }

}

export interface BaseResponse {
  data?: any;
  pagination?: SgPaging;
  notices?: SgApiMessage[];
  warnings?: SgApiMessage[];
  errors?: SgApiMessage[];
  multiWarnings?: SgApiMessage[];
  status?: string;
}

export interface SgApiMessage {
  code?: string;
  desc?: string;
  hint?: any;
  args?: any[];
  recordId?: string;
}

export interface SgPaging {
  page?: number;
  pageSize?: number;
  totalPages?: number;
  totalRecords?: number;
}
