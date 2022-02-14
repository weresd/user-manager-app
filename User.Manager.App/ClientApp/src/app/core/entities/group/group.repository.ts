import { Inject, Injectable } from '@angular/core';

import { Storages } from '../../storages/storages';
import { BaseRepository } from '../base.repository';
import { Group } from './group';

@Injectable()
export class GroupRepository extends BaseRepository<Group>
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
