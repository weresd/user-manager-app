import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { take } from 'rxjs/operators';

import { Permission, RepositoriesFabrica, SpinnerService } from '@app/core';
import { ConfirmDialogComponent } from '@app/shared';

@Component({
    selector: 'app-permissions-management-dialog',
    templateUrl: './permissions-management-dialog.component.html',
    styleUrls: ['./permissions-management-dialog.component.scss']
})
export class PermissionsManagementDialogComponent implements OnInit
{
    /**
     * Editing permission.
     *
     * @type {Permission}
     */
    public editingPermission: Permission = new Permission();

    /**
     * Permission list.
     *
     * @type {Permission[]}
     */
    public permissions: Permission[] = [];

    /**
     * Permission list modified flag.
     *
     * @type {boolean}
     */
    public hasChanged: boolean = false;

    /**
     * Form group.
     *
     * @type {FormGroup}
     */
    public formGroup: FormGroup;

    /**
     * Link to html element with name.
     *
     * @type {ElementRef}
     */
    @ViewChild('nameElement', { static: true }) public nameElement: ElementRef;

    /**
     * Constructor.
     *
     * @param {SpinnerService} spinnerService
     * @param {RepositoriesFabrica} repositoriesFabrica
     * @param {MatSnackBar} snackBarService
     * @param {MatDialog} dialogService
     */
    public constructor(
        private spinnerService: SpinnerService,
        private repositoriesFabrica: RepositoriesFabrica,
        private snackBarService: MatSnackBar,
        private dialogService: MatDialog
    )
    {
        return;
    }

    /**
     * {@inheritdoc}
     */
    public ngOnInit(): void
    {
        this.resetForm();
        this.reloadPermissions();
    }

    /**
     * Resets group form.
     *
     * @returns {void}
     */
    private resetForm(): void
    {
        this.formGroup = new FormGroup({
            name: new FormControl(this.editingPermission.name, [Validators.required, Validators.minLength(4)]),
        })
    }

    /**
     * Edits permission.
     *
     * @param {Permission} permission
     *
     * @returns {void}
     */
    public edit(permission: Permission): void
    {
        this.editingPermission = permission;
        this.nameElement.nativeElement.focus();
        this.resetForm();
    }

    /**
     * Removes permission.
     *
     * @param {Permission} permission
     *
     * @returns {void}
     */
    public delete(permission: Permission): void
    {
        this.spinnerService.show();
        this.repositoriesFabrica
            .getPermissionRepository()
            .delete(permission)
            .pipe(take(1))
            .subscribe(
                () => {
                    this.spinnerService.hide();
                    this.hasChanged = true;
                    this.reloadPermissions();
                    this.snackBarService.open('Permission Deleted', 'ok', { duration: 3000 });
                },
                () => {
                    this.spinnerService.hide();
                    this.snackBarService.open('Error deleting permission', 'ok', { duration: 3000 });
                }
            );
    }

    /**
     * Opens a dialog to confirm deletion.
     *
     * @param {Permission} permission
     *
     * @returns {void}
     */
    public openDeleteDialog(permission: Permission): void
    {
        this.dialogService
            .open(
                ConfirmDialogComponent,
                {
                    data: {
                        confirmText: 'Are you sure you want to delete the permission?'
                    }
                }
            )
            .afterClosed()
            .pipe(take(1))
            .subscribe(answer => {
                if (!answer) {
                    return;
                }

                this.delete(permission);
            });
    }

    /**
     * Adds new permisssion.
     *
     * @returns {void}
     */
    public addNew(): void
    {
        this.editingPermission = new Permission();
        this.nameElement.nativeElement.focus();
        this.resetForm();
    }

    /**
     * Save permission.
     *
     * @returns {void}
     */
    public save(): void
    {
        if (this.formGroup.invalid)
        {
            return;
        }

        this.spinnerService.show();

        this.editingPermission.name = this.formGroup.get('name').value;

        this.repositoriesFabrica
            .getPermissionRepository()
            .save(this.editingPermission)
            .pipe(take(1))
            .subscribe(
                () => {
                    this.spinnerService.hide();
                    this.hasChanged = true;
                    this.reloadPermissions();
                    this.snackBarService.open('Permission saved', 'ok', { duration: 3000 });
                    this.addNew();
                },
                () => {
                    this.spinnerService.hide();
                    this.snackBarService.open('Error saving permission', 'ok', { duration: 3000 });
                }
            );
    }

    /**
     * Reload permission list.
     *
     * @returns {void}
     */
    private reloadPermissions(): void
    {
        this.spinnerService.show();
        this.repositoriesFabrica
            .getPermissionRepository()
            .find()
            .pipe(take(1))
            .subscribe(permissions => {
                this.spinnerService.hide();
                this.permissions = permissions;
            });
    }
}
