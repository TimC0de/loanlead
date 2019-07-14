import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from "../../core/base.service";
import Branch from "./branch.model";

@Injectable({
    providedIn: 'root'
})
export class BranchService extends BaseService {
    constructor(
        http: HttpClient,
    ) {
        super(http);
    }

    public findAll() {
        const url = `${this.baseUrl}/branches`;

        return this.http.get<Branch[]>(
            url,
            this.httpOptions,
        );
    }
}
