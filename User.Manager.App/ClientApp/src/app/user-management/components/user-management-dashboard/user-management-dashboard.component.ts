import { OnInit, Component, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';

import { ConfirmDialogComponent } from '@app/shared';
import {Group, GroupRepository, SpinnerService, User, UserRepository } from '@app/core';
import { EntityManagmentDataSource } from './entity-managment.datasource';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { GroupFormDialogComponent } from '../group-form-dialog/group-form-dialog.component';

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
     * @type {EntityManagmentDataSource}
     */
    public entityManagmentDataSource: EntityManagmentDataSource;

    /**
     * Constructor.
     *
     * @param {ActivatedRoute} activatedRoute
     * @param {UserRepository} userRepository
     * @param {GroupRepository} groupRepository
     * @param {SpinnerService} spinnerService
     * @param {MatDialog} dialogService
     * @param {MatSnackBar} snackBarService
     */
    public constructor(
        private activatedRoute: ActivatedRoute,
        private userRepository: UserRepository,
        private groupRepository: GroupRepository,
        private spinnerService: SpinnerService,
        private dialogService: MatDialog,
        private snackBarService: MatSnackBar
    )
    {
        this.entityManagmentDataSource = new EntityManagmentDataSource(
            this.userRepository,
            this.groupRepository,
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
                this.entityManagmentDataSource.setUsers(routeData.requestData.users);
                this.entityManagmentDataSource.setGroups(routeData.requestData.groups);
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
                    this.entityManagmentDataSource.deleteUser(this.selectedEntity);
                    this.selectedEntity = null;
                }

                if (this.selectedEntity instanceof Group) {
                    this.entityManagmentDataSource.deleteGroup(this.selectedEntity);
                    this.selectedEntity = null;
                }
            });
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
                this.entityManagmentDataSource.reloadUsers();
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
                this.entityManagmentDataSource.reloadGroups();
            }
        });
    }
}
