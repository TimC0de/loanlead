import {Injectable} from '@angular/core';
import {BaseService} from '../../core/base.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import User from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    constructor(
        http: HttpClient
    ) {
        super(http);
    }

    public isUnique(fieldType: string, fieldValue: string): Observable<any> {
        const url = `${this.baseUrl}/users/unique/${fieldType}`;
        const httpOptions = Object.assign({}, this.httpOptions);
        httpOptions.params = new HttpParams().set('value', fieldValue);

        return this.http.get(url, httpOptions)
            .pipe(map((obj: {isUnique: boolean}) => obj.isUnique ? null : { notUnique: true }));
    }

    public login(
        body: { employeeId: string, password: string }
    ): Observable<any> {
        const url = `${this.baseUrl}/users/login`;

        return this.http.post(
            url,
            body,
            this.httpOptions);
    }

    public signUp(formData: FormData) {
        const url = `${this.baseUrl}/users/`;

        return this.http.post(
            url,
            formData
        );
    }

    public findTypeCount(type: string) {
        const url = `${this.baseUrl}/users/count`;
        const httpOptions = Object.assign({}, this.httpOptions);
        httpOptions.params = new HttpParams()
            .set('type', type);

        return this.http.get(
            url,
            httpOptions,
        ).pipe(map(
            (countObj: { count: number}) => countObj.count,
        ));
    }

    public findType(type: string, page?: number, limit?: number) {
        const url = `${this.baseUrl}/users`;
        const httpOptions = Object.assign({}, this.httpOptions);
        let httpParams = new HttpParams()
            .set('type', type);

        if (page) {
            httpParams = httpParams.set('page', page.toString());
        }

        if (limit) {
            httpParams = httpParams.set('limit', limit.toString());
        }

        httpOptions.params = httpParams;

        return this.http.get<User[]>(
            url,
            httpOptions
        );
    }
}
