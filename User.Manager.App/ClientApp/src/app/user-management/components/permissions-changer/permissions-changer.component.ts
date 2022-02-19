import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

import { Permission } from '@app/core';

@Component({
    selector: 'app-permissions-changer',
    templateUrl: './permissions-changer.component.html',
    styleUrls: ['./permissions-changer.component.scss']
})
export class PermissionsChangerComponent
{
    /**
     * Selected permissions.
     *
     * @type {string[]}
     */
    @Input() public selectedPermissions: string[] = [];

    /**
     * Permissions list.
     *
     * @type {Permission[]}
     */
    @Input() public permissions: Permission[] = [];

    /**
     * Readonly flag.
     *
     * @type {boolean}
     */
    @Input() public readonly: boolean = false;

    /**
     * Output event "permisssionsChanged".
     *
     * @type {EventEmitter<string[]>}
     */
    @Output() public permisssionsChanged: EventEmitter<string[]> = new EventEmitter<string[]>()

    /**
     * Check if access is selected.
     *
     * @param {Permission} permission
     *
     * @returns {boolean}
     */
    public isChecked(permission: Permission): boolean
    {
        return this.selectedPermissions.indexOf(permission.id) !== -1;
    }

    /**
     * Handler handling permission selection.
     *
     * @param {Permission} permission
     * @param {MatCheckboxChange} event
     *
     * @returns {void}
     */
    public change(permission: Permission, event: MatCheckboxChange): void
    {
        if (event.checked) {
            this.selectedPermissions.push(permission.id);
        } else {
            this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission.id);
        }

        this.permisssionsChanged.emit(this.selectedPermissions);
    }
}
