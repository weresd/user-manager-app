import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Storages } from '../../storages/storages';
import { RepositoryBase } from '../repository.base';
import { Permission } from './permission';

@Injectable()
export class PermissionRepository extends RepositoryBase<Permission>
{
    /**
     * @inheritdoc
     */
    protected storageKey: string = 'permissions';

    /**
     * @inheritdoc
     */
    protected entityType: any = Permission;

    /**
     * @inheritdoc
     */
    public constructor(@Inject(Storages) storageService: Storages)
    {
        super(storageService);
    }

    /**
     * @inheritdoc
     */
    public save(item: Permission): Observable<Permission>
    {
        throw new Error('Method not supported.');
    }

    /**
     * @inheritdoc
     */
    public delete (item: Permission): Observable<boolean>
    {
        throw new Error('Method not supported.');
    }

    /**
     * @inheritdoc
     */
    protected getStorageData(): Permission[]
    {
        return [
            new Permission({
                id: 'f7ee92ca-e5d2-4b6c-9f1c-9cac7af0c7e8',
                name: 'View Dashboards'
            }),
            new Permission({
                id: '14d3cdf3-ef8d-4a33-b239-bdc34b913566',
                name: 'Edit Dashboards'
            }),
            new Permission({
                id: 'b2b49c27-84c2-4a72-bc31-f292509f8380',
                name: 'Manage Dashboards'
            }),
            new Permission({
                id: 'd49fd1a2-e300-44d8-a253-989ec309a239',
                name: 'Manage Users'
            }),
        ];
    }
}
