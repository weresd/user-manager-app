import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

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
     * Output event "searchStringChange".
     *
     * @type {EventEmitter<string>}
     */
    @Output() public searchStringChange: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Search string HTML element.
     *
     * @type {ElementRef}
     */
    @ViewChild('searchInput', { static: true }) public searchInput: ElementRef;

    /**
     * Search string input event handler.
     *
     * @param {any} event
     *
     * @returns {void}
     */
    public input(event: any): void
    {
        this.changeSearchString(event.target.value);
    }

    /**
     * Clears search string.
     *
     * @returns {void}
     */
    public clear(): void
    {
        this.changeSearchString('');
        this.searchInput.nativeElement.value = '';
    }

    /**
     * Change search string.
     *
     * @returns {void}
     */
    protected changeSearchString(searchString: string): void
    {
        this.searchString = searchString;

        this.searchStringChange.emit(this.searchString);
    }
}
