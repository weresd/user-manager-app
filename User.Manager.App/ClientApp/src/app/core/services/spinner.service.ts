import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService
{
    /**
     * Spinner display flag.
     *
     * @type {boolean}
     */
    private displayingSpinner: boolean = false;

    /**
     * Getter for displayingSpinner property.
     *
     * @returns {boolean}
     */
    public get displaying(): boolean
    {
        return this.displayingSpinner;
    }

    /**
     * Shows spinner.
     *
     * @returns {void}
     */
    public show(): void
    {
        this.displayingSpinner = true;
    }

    /**
     * Hides the spinner.
     *
     * @returns {void}
     */
    public hide(): void
    {
        this.displayingSpinner = false;
    }
}
