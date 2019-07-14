import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    protected baseUrl = 'http://localhost:3000/api';
    protected httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        params: {},
    };

    constructor(
        protected http: HttpClient
    ) {
    }
}
