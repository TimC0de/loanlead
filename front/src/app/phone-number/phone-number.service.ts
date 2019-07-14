import {Injectable} from '@angular/core';
import {BaseService} from '../core/base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import PhoneNumber from './phone-number.model';

@Injectable({
    providedIn: 'root'
})
export class PhoneNumberService extends BaseService {

    constructor(
        http: HttpClient,
    ) {
        super(http);
    }

    public isUnique(fieldValue: string) {
        const url = `${this.baseUrl}/phone_numbers`;
        const httpOptions = Object.assign({}, this.httpOptions);
        httpOptions.params = new HttpParams().set('phoneNumber', fieldValue);

        return this.http.get(url, httpOptions)
            .pipe(map((obj: { isUnique: boolean}) => obj.isUnique ? null : { notUnique: true }));
    }

    public add(phoneNumber: PhoneNumber) {
        const url = `${this.baseUrl}/phone_numbers/`;

        return this.http.post(
            url,
            phoneNumber,
            this.httpOptions,
        );
    }
}
