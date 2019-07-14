import { Injectable } from '@angular/core';
import {BaseService} from "../../core/base.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {

  constructor(
      http: HttpClient
  ) {
      super(http);
  }

  public findAll() {
      const url = `${this.baseUrl}/roles`;

      return this.http.get(
          url,
          this.httpOptions,
      );
  }
}
