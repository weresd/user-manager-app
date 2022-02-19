import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

import { Group } from '@app/core';

@Component({
    selector: 'app-groups-changer',
    templateUrl: './groups-changer.component.html',
    styleUrls: ['./groups-changer.component.scss']
})
export class GroupsChangerComponent
{
    /**
     * Selected groups ids.
     *
     * @type {string[]}
     */
    @Input() public selectedGroups: string[] = [];

    /**
     * Groups list.
     *
     * @type {Group[]}
     */
    @Input() public groups: Group[] = [];

    /**
     * Output event "groupsChanged".
     *
     * @type {EventEmitter<string[]>}
     */
    @Output() public groupsChanged: EventEmitter<string[]> = new EventEmitter<string[]>()

    /**
     * Check if group is selected.
     *
     * @param {group} group
     *
     * @returns {boolean}
     */
    public isChecked(group: Group): boolean
    {
        return this.selectedGroups.indexOf(group.id) !== -1;
    }

    /**
     * Handler handling group selection.
     *
     * @param {Group} group
     * @param {MatCheckboxChange} event
     *
     * @returns {void}
     */
    public change(group: Group, event: MatCheckboxChange): void
    {
        if (event.checked) {
            this.selectedGroups.push(group.id);
        } else {
            this.selectedGroups = this.selectedGroups.filter(p => p !== group.id);
        }

        this.groupsChanged.emit(this.selectedGroups);
    }
}
