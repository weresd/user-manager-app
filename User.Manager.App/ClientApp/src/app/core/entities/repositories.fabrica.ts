import { Inject, Injectable } from '@angular/core';

import { PermissionRepository } from './permission';
import { UserRepository } from './user';
import { GroupRepository } from './group';
import { Storages } from '../storages';

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

    /**
     * Returns permission repository.
     *
     * @returns {PermissionRepository}
     */
    public getPermissionRepository(): PermissionRepository
    {
        return new PermissionRepository(this.storageService);
    }
}
