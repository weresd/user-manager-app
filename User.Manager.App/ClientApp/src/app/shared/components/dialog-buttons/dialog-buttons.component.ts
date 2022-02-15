import { Component, Input } from '@angular/core';
import { DialogButtonsAlign } from './dialog-buttons-align.type';

@Component({
    selector: 'app-dialog-buttons',
    templateUrl: './dialog-buttons.component.html',
    styleUrls: ['./dialog-buttons.component.scss']
})
export class DialogButtonsComponent
{
    /**
     * Buttons align.
     *
     * @type {DialogButtonsAlign}
     */
    @Input() align: DialogButtonsAlign = 'right';
}
