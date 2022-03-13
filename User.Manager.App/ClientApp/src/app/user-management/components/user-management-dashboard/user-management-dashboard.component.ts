import { OnInit, Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';

import { ConfirmDialogComponent } from '@app/shared';
import {Group, RepositoriesFabrica, SpinnerService, User } from '@app/core';
import { EntityManagementDataSource } from './entity-management.datasource';
import { UserFormDialogComponent } from '../user-form-dialog';
import { GroupFormDialogComponent } from '../group-form-dialog';

@Component({
    selector: 'app-user-management-dashboard',
    templateUrl: './user-management-dashboard.component.html',
    styleUrls: ['./user-management-dashboard.component.scss']
})
export class UserManagementDashboardComponent implements OnInit
{
    /**
     * Selected user or group.
     *
     * @type {User | Group | null}
     */
    public selectedEntity: User | Group | null = null;

    /**
     * Data source.
     *
     * @type {EntityManagementDataSource}
     */
    public entityManagementDataSource: EntityManagementDataSource;

    /**
     * State of user and group profile extension panels.
     *
     * @type {boolean}
     */
    public viewExpansionPanelState: boolean = true;

    /**
     * State of group and user permissions extension panels.
     *
     * @type {boolean}
     */
    public permissionsExpansionPanelState: boolean = true;

    /**
     * State of user effective permissions extension panels.
     *
     * @type {boolean}
     */
    public effectivePermissionsExpansionPanelState: boolean = true;

    /**
     * Status of group list extension Panels.
     *
     * @type {boolean}
     */
    public groupsExpansionPanelState: boolean = true;

    /**
     * Presence of the selected entity.
     *
     * @type {boolean}
     */
    public get hasSelectedEntity(): boolean
    {
        return this.selectedEntity !== null;
    }

    /**
     * Selected entity is a user.
     *
     * @type {boolean}
     */
    public get isUserSelected(): boolean
    {
        return this.selectedEntity instanceof User;
    }

    /**
     * Selected entity is a group.
     *
     * @type {boolean}
     */
    public get isGroupSelected(): boolean
    {
        return this.selectedEntity instanceof Group;
    }

    /**
     * Constructor.
     *
     * @param {ActivatedRoute} activatedRoute
     * @param {RepositoriesFabrica} repositoriesFabrica
     * @param {SpinnerService} spinnerService
     * @param {MatDialog} dialogService
     * @param {MatSnackBar} snackBarService
     */
    public constructor(
        private activatedRoute: ActivatedRoute,
        private repositoriesFabrica: RepositoriesFabrica,
        private spinnerService: SpinnerService,
        private dialogService: MatDialog,
        private snackBarService: MatSnackBar
    )
    {
        this.entityManagementDataSource = new EntityManagementDataSource(
            this.repositoriesFabrica,
            this.spinnerService,
            this.snackBarService
        );
    }

    /**
     * {@inheritdoc}
     */
    public ngOnInit(): void
    {
        this.activatedRoute.data
            .pipe(
                take(1),
                tap(() => this.spinnerService.hide())
            )
            .subscribe(routeData => {
                this.entityManagementDataSource.users = routeData.requestData.users;
                this.entityManagementDataSource.groups = routeData.requestData.groups;
                this.entityManagementDataSource.permissions = routeData.requestData.permissions;
            });
    }

    /**
     * Entity change handler.
     *
     * @param {User | Group} entity
     *
     * @returns {void}
     */
    public entityChangeHandler(entity: User | Group): void
    {
        this.selectedEntity = entity;
    }

    /**
     * Deletes selected entity.
     *
     * @returns {void}
     */
    public deleteSelectedEntity(): void
    {
        if (this.selectedEntity === null) {
            return;
        }

        this.dialogService.open(
                ConfirmDialogComponent,
                {
                    data: {
                        confirmText: 'Are you sure you want to delete the entity?'
                    }
                }
            )
            .afterClosed()
            .pipe(take(1))
            .subscribe(answer => {
                if (!answer) {
                    return;
                }

                if (this.selectedEntity instanceof User) {
                    this.entityManagementDataSource.deleteUser(this.selectedEntity);
                    this.selectedEntity = null;
                }

                if (this.selectedEntity instanceof Group) {
                    this.entityManagementDataSource.deleteGroup(this.selectedEntity);
                    this.selectedEntity = null;
                }
            });
    }

    /**
     * Edites selected entity.
     *
     * @returns {void}
     */
    public editSelectedEntity(): void
    {
        if (this.selectedEntity === null) {
            return;
        }

        if (this.selectedEntity instanceof User) {
            this.openEditUserDialog(this.selectedEntity);
        }

        if (this.selectedEntity instanceof Group) {
            this.openEditGroupDialog(this.selectedEntity);
        }
    }

    /**
     * Opens a dialog box for editing or creating a user.
     *
     * @param {User | null} user
     *
     * @returns {void}
     */
    public openEditUserDialog(user: User | null): void
    {
        this.dialogService.open(
                UserFormDialogComponent,
                {
                    data: {
                        user: user
                    }
                }
            )
            .afterClosed()
            .pipe(take(1))
            .subscribe(result => {
                if (result) {
                    this.snackBarService.open('User saved', 'ok', { duration: 3000 });
                    this.entityManagementDataSource.reloadUsers();
                }
            });
    }

    /**
     * Opens a dialog box for editing or creating a group.
     *
     * @param {Group | null} user
     *
     * @returns {void}
     */
    public openEditGroupDialog(group: Group | null): void
    {
        this.dialogService.open(
                GroupFormDialogComponent,
                {
                    data: {
                        group: group
                    }
                }
            )
            .afterClosed()
            .pipe(take(1))
            .subscribe(result => {
                if (result) {
                    this.snackBarService.open('Group saved', 'ok', { duration: 3000 });
                    this.entityManagementDataSource.reloadGroups();
                }
            });
    }

    /**
     * Permisssion change handler.
     *
     * @param {string[]} permissionIds
     *
     * @returns {void}
     */
    public permisssionChangeHandler(permissionIds: string[]): void
    {
        if (this.selectedEntity instanceof User) {
            this.spinnerService.show();
            this.selectedEntity.permissions = permissionIds;
            this.repositoriesFabrica
                .getUserRepository()
                .save(this.selectedEntity)
                .pipe(take(1))
                .subscribe(() => this.spinnerService.hide());
        }

        if (this.selectedEntity instanceof Group) {
            this.spinnerService.show();
            this.selectedEntity.permissions = permissionIds;
            this.repositoriesFabrica
                .getGroupRepository()
                .save(this.selectedEntity)
                .pipe(take(1))
                .subscribe(() => this.spinnerService.hide());
        }
    }

    /**
     * Grooup change handler.
     *
     * @param {string[]} groupIds
     *
     * @returns {void}
     */
    public groupChangeHandler(groupIds: string[]): void
    {
        if (this.selectedEntity instanceof User) {
            this.spinnerService.show();
            this.selectedEntity.groups = groupIds;
            this.repositoriesFabrica
                .getUserRepository()
                .save(this.selectedEntity)
                .pipe(take(1))
                .subscribe(() => this.spinnerService.hide());
        }
    }
}
