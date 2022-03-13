import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent
{
    /**
     * Checked flag.
     *
     * @type {boolean}
     */
    @Input() public checked: boolean = false;

    /**
     * Disabled flag.
     *
     * @type {boolean}
     */
    @Input() public disabled: boolean = false;

    /**
     * Checkbox value.
     *
     * @type {string | number}
     */
    @Input() public value: string | number = '';

    /**
     * Output event "changeValue".
     *
     * @type {EventEmitter<strbooleaning>}
     */
    @Output() public changeValue: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * Search string input event handler.
     *
     * @param {any} event
     *
     * @returns {void}
     */
    public input(event: any): void
    {
        this.checked = event.target.checked;

        this.changeValue.emit(this.checked);
    }
}
