import { MatSnackBar } from '@angular/material';
import { take } from 'rxjs/operators';

import { Group, Permission, RepositoriesFabrica, SpinnerService, User } from '@app/core';

export class EntityManagementDataSource
{
    /**
     * Users.
     *
     * @type {User[]}
     */
    public users: User[] = [];

    /**
     * Groups.
     *
     * @type {Group[]}
     */
    public groups: Group[] = [];

    /**
     * Permissions.
     *
     * @type {Permission[]}
     */
    public permissions: Permission[] = [];

    /**
     * Constructor.
     *
     * @param {RepositoriesFabrica} repositoriesFabrica
     * @param {SpinnerService} spinnerService
     * @param {MatSnackBar} snackBarService
     */
    public constructor(
        private repositoriesFabrica: RepositoriesFabrica,
        private spinnerService: SpinnerService,
        private snackBarService: MatSnackBar
    )
    {
        return;
    }

    /**
     * Reloads user list from repository.
     *
     * @returns {void}
     */
    public reloadUsers(): void
    {
        this.spinnerService.show();
        this.repositoriesFabrica
            .getUserRepository()
            .find()
            .pipe(take(1))
            .subscribe(users => {
                this.users = users;
                this.spinnerService.hide();
            });
    }

    /**
     * Reloads group list from repository.
     *
     * @returns {void}
     */
    public reloadGroups(): void
    {
        this.spinnerService.show();
        this.repositoriesFabrica
            .getGroupRepository()
            .find()
            .pipe(take(1))
            .subscribe(groups => {
                this.groups = groups;
                this.spinnerService.hide();
            });
    }

    /**
     * Reloads permission list from repository.
     *
     * @returns {void}
     */
    public reloadPermissions(): void
    {
        this.spinnerService.show();
        this.repositoriesFabrica
            .getPermissionRepository()
            .find()
            .pipe(take(1))
            .subscribe(permissions => {
                this.permissions = permissions;
                this.spinnerService.hide();
            });
    }

    /**
     * Deletes user.
     *
     * @param {User} user
     *
     * @returns {void}
     */
    public deleteUser(user: User): void
    {
        this.spinnerService.show();
        this.repositoriesFabrica
            .getUserRepository()
            .delete(user)
            .pipe(take(1))
            .subscribe(
                () => {
                    this.spinnerService.hide();
                    this.reloadUsers();
                    this.snackBarService.open('User deleted', 'ok', { duration: 3000 });
                },
                () => {
                    this.snackBarService.open('Error deleting user', 'ok', { duration: 3000 });
                }
            );
    }

    /**
     * Deletes group.
     *
     * @param {Group} group
     *
     * @returns {void}
     */
    public deleteGroup(group: Group): void
    {
        this.spinnerService.show();
        this.repositoriesFabrica
            .getGroupRepository()
            .delete(group)
            .pipe(take(1))
            .subscribe(
                () => {
                    this.spinnerService.hide();
                    this.reloadGroups();
                    this.snackBarService.open('Group deleted', 'ok', { duration: 3000 });
                },
                () => {
                    this.snackBarService.open('Error deleting group', 'ok', { duration: 3000 });
                }
            );
    }

    /**
     * Returns all user permissions ids.
     *
     * @param {User} user
     *
     * @returns {string[]}
     */
    public getUserActivePermissionIds(user: User): string[]
    {
        const userGroupsPermissions = [];

        this.groups
            .filter(g => user.groups.indexOf(g.id) !== -1)
            .map(g => userGroupsPermissions.push(...g.permissions));

        return this.permissions
            .map(p => p.id)
            .filter(p => userGroupsPermissions.indexOf(p) !== -1 || user.permissions.indexOf(p) !== -1);
    }
}
