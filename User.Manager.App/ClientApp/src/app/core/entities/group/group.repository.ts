import { Inject, Injectable } from '@angular/core';

import { Storages } from '../../storages/storages';
import { RepositoryBase } from '../repository.base';
import { Group } from './group';

@Injectable()
export class GroupRepository extends RepositoryBase<Group>
{
    /**
     * @inheritdoc
     */
    protected storageKey: string = 'groups';

    /**
     * @inheritdoc
     */
    protected entityType: any = Group;

    /**
     * @inheritdoc
     */
    public constructor(@Inject(Storages) storageService: Storages)
    {
        super(storageService);

        return;
    }
}
