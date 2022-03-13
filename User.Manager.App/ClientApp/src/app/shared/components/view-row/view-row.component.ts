import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-view-row',
    templateUrl: './view-row.component.html',
    styleUrls: ['./view-row.component.scss']
})
export class ViewRowComponent
{
    /**
     * Row label.
     *
     * @type {string}
     */
    @Input() public label: string;

    /**
     * Row value.
     *
     * @type {string | number}
     */
    @Input() public value: string | number;
}
