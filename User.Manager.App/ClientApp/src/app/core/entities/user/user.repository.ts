import { Inject, Injectable } from '@angular/core';

import { Storages } from '../../storages/storages';
import { RepositoryBase } from '../repository.base';
import { User } from './user';

@Injectable()
export class UserRepository extends RepositoryBase<User>
{
    /**
     * @inheritdoc
     */
    protected storageKey: string = 'users';

    /**
     * @inheritdoc
     */
    protected entityType: any = User;

    /**
     * @inheritdoc
     */
    public constructor(@Inject(Storages) storageService: Storages)
    {
        super(storageService);

        return;
    }
}
