import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BaseService} from '../../core/base.service';
import Branch from './branch.model';

@Injectable({
    providedIn: 'root'
})
export class BranchService extends BaseService {
    constructor(
        http: HttpClient,
    ) {
        super(http);
    }

    public findAll(page?: number, limit?: number) {
        const url = `${this.baseUrl}/branches`;
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

        return this.http.get<Branch[]>(
            url,
            httpOptions,
        );
    }

    public findCount() {
        const url = `${this.baseUrl}/branches/count`;

        return this.http.get(
            url,
            this.httpOptions
        );
    }

    public findById(id: number) {
        const url = `${this.baseUrl}/branches/${id}`;

        return this.http.get(
            url,
            this.httpOptions,
        );
    }

    public add(branch: Branch) {
        const url = `${this.baseUrl}/branches`;

        return this.http.post(
            url,
            branch,
            this.httpOptions
        );
    }

    public update(branch: Branch, id: number) {
        const url = `${this.baseUrl}/branches/${id}`;

        return this.http.put(
            url,
            branch,
            this.httpOptions
        );
    }

    public delete(id: number) {
        const url = `${this.baseUrl}/branches`;
        const httpOptions = Object.assign({}, this.httpOptions);
        httpOptions.params = new HttpParams().set('id', id.toString());

        return this.http.delete(
            url,
            this.httpOptions
        );
    }
}
