import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent
{
    /**
     * Search string.
     *
     * @type {string}
     */
    public searchString: string = '';

    /**
     * Output event "searchInput".
     *
     * @type {EventEmitter<string>}
     */
    @Output() public searchInput: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Search string input event handler.
     *
     * @param {any} event
     *
     * @returns {void}
     */
    public input(event: any): void
    {
        this.searchString = event.target.value;

        this.searchInput.emit(this.searchString);
    }
}
