import {Injectable} from '@angular/core';
import {BaseService} from '../../core/base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import Entity from './entity.model';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EntityService extends BaseService {

    constructor(
        http: HttpClient,
    ) {
        super(http);
    }

    public findAll(page?: number, limit?: number) {
        const url = `${this.baseUrl}/entities`;
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

        return this.http.get<Entity[]>(
            url,
            httpOptions,
        );
    }

    public findById(entityId: number) {
        const url = `${this.baseUrl}/entities/${entityId}`;

        return this.http.get(
            url,
            this.httpOptions,
        );
    }


    public findCount() {
        const url = `${this.baseUrl}/entities/count`;

        return this.http.get(
            url,
            this.httpOptions
        );
    }

    public isUnique(fieldType: string, fieldValue: any) {
        const url = `${this.baseUrl}/entities/unique/${fieldType}`;
        const httpOptions = Object.assign({}, this.httpOptions);
        httpOptions.params = new HttpParams()
            .set('value', fieldValue);

        return this.http.get(
            url,
            httpOptions,
        ).pipe(
            map((unique: { isUnique: boolean}) => unique.isUnique
                ? null
                : { notUnique: true }
            )
        );
    }

    public add(entity: Entity) {
        const url = `${this.baseUrl}/entities`;

        return this.http.post(
            url,
            entity
        );
    }

    public update(entity: Entity, id: number) {
        const url = `${this.baseUrl}/entities/${id}`;

        return this.http.put(
            url,
            entity,
            this.httpOptions
        );
    }

    public delete(entityId) {
        const url = `${this.baseUrl}/entities`;
        const httpOptions = Object.assign({}, this.httpOptions);
        httpOptions.params = new HttpParams()
            .set('id', entityId);

        return this.http.delete(
            url,
            httpOptions
        );
    }
}
