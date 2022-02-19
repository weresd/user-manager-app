import { Inject, Injectable } from '@angular/core';

import { UserRepository } from './user';
import { Storages } from '../storages';
import { GroupRepository } from './group';

@Injectable()
export class RepositoriesFabrica
{
    /**
     * Constructor.
     *
     * @param {Storages} storageService
     */
    public constructor(@Inject(Storages) private storageService: Storages)
    {
        return;
    }

    /**
     * Returns user repository.
     *
     * @returns {UserRepository}
     */
    public getUserRepository(): UserRepository
    {
        return new UserRepository(this.storageService);
    }

    /**
     * Returns group repository.
     *
     * @returns {GroupRepository}
     */
    public getGroupRepository(): GroupRepository
    {
        return new GroupRepository(this.storageService);
    }
}
