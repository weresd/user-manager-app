import { MatSnackBar } from '@angular/material';
import { take } from 'rxjs/operators';

import { Group, RepositoriesFabrica, SpinnerService, User } from '@app/core';

export class EntityManagmentDataSource
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
     * Set user list.
     *
     * @param {User[]} users
     *
     * @returns {void}
     */
    public setUsers(users: User[]): void
    {
        this.users = users;
    }

    /**
     * Set group list.
     *
     * @param {Group[]} users
     *
     * @returns {void}
     */
    public setGroups(groups: Group[]): void
    {
        this.groups = groups;
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
    public deleteGroup(group: Group)
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
                },
                () => {
                    this.snackBarService.open('Error deleting group', 'ok', { duration: 3000 });
                }
            );
    }
}
