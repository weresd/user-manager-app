import { EventEmitter } from '@angular/core';
import { Component, Output } from '@angular/core';

import { TitleService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent
{
    /**
     * Output event "burgerClick".
     *
     * Emits when the hamburger menu icon is clicked.
     *
     * @type {EventEmitter<boolean>}
     */
    @Output() public burgerClick: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * Constructor.
     * 
     * @param {TitleService} titleService
     */
    public constructor(public titleService: TitleService)
    {
        return;
    }
}
