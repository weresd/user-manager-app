import { Inject, Injectable } from '@angular/core';

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

        return;
    }
}
