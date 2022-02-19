import { Component, Input } from '@angular/core';
import { Group } from '@app/core';

@Component({
    selector: 'app-group-view',
    templateUrl: './group-view.component.html',
    styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent
{
    /**
     * Viewed Group.
     *
     * @type {Group}
     */
    @Input() public group: Group;
}
