import { Component } from '@angular/core';

import { SpinnerService } from '../../services/spinner.service';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent
{
    /**
     * Constructor.
     *
     * @param {SpinnerService} spinnerService
     */
    public constructor(private spinnerService: SpinnerService)
    {
        return;
    }

    /**
     *  Gets mode.
     *
     *  Returns the mode for the progress bar depending on the state of the spinner service.
     *
     *  @returns {string}
     */
    public get mode(): string
    {
        return this.spinnerService.displaying ? 'query' : 'determinate';
    }
}
