import {Injectable} from '@angular/core';
import {BaseService} from '../../core/base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import Template from './template.model';

@Injectable({
    providedIn: 'root'
})
export class TemplateService extends BaseService {
    
    constructor(
        http: HttpClient,
    ) {
        super(http);
    }

    public findAll(page?: number, limit?: number) {
        const url = `${this.baseUrl}/sms-templates`;
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

        return this.http.get<Template[]>(
            url,
            httpOptions
        );
    }

    public findCount() {
        const url = `${this.baseUrl}/sms-templates/count`;

        return this.http.get(
            url,
            this.httpOptions
        );
    }

    public delete(id: number) {
        const url = `${this.baseUrl}/sms-templates`;
        const httpOptions = Object.assign({}, this.httpOptions);
        httpOptions.params = new HttpParams().set('id', id.toString());

        return this.http.delete(
            url,
            httpOptions
        );
    }
}
