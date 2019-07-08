import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    url = 'http://localhost:3000/api/users/login';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(
        private http: HttpClient,
    ) {
    }

    public login(body: { employeeId: string, password: string }): Observable<any> {
        return this.http.post(
            this.url,
            body,
            this.httpOptions);
    }
}
