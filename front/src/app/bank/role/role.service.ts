import { Injectable } from '@angular/core';
import {BaseService} from '../../core/base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import Role from './role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {

  constructor(
      http: HttpClient
  ) {
      super(http);
  }

  public findAll(page?: number, limit?: number) {
      const url = `${this.baseUrl}/roles`;
      const httpOptions = Object.assign({}, this.httpOptions);
      let httpParams = new HttpParams();
      
      if (page || limit) {
          if (page) {
              httpParams = httpParams.set('page', page.toString());
          }
          
          if (limit) {
              httpParams = httpParams.set('limit', limit.toString());
          }
          
          httpOptions.params = httpParams;
      }

      return this.http.get<Role[]>(
          url,
          httpOptions,
      );
  }
  
  public findCount() {
      const url = `${this.baseUrl}/roles/count`;
      
      return this.http.get(
          url,
          this.httpOptions
      );
  }
  
  public updateSendSMS(enableSMSSending: boolean, id: number) {
      const url = `${this.baseUrl}/roles/${id}`;
      
      return this.http.put<Role[]>(
          url,
          {
              sendSMS: enableSMSSending,
          },
          this.httpOptions
      );
  }
}
