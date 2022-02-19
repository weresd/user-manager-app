import { EventEmitter, Output, Component } from '@angular/core';

import { MenuItem } from './menu-item';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent
{
    /**
     * Output event "itemClick".
     *
     * Emit when a menu item is clicked.
     *
     * @type {EventEmitter<MenuItem>}
     */
    @Output() public itemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

    /**
     * Menu items.
     *
     * @type {Array<MenuItem>}
     */
    public menuItems: Array<MenuItem> = [
        new MenuItem('User management', '/user-management'),
    ];

    /**
     * Emits event "itemClick" and navigate to menu item route.
     *
     * @param {MenuItem} menuItem
     *
     * @returns {void}
     */
    public changeItem(menuItem: MenuItem): void
    {
        this.itemClick.emit(menuItem);
    }
}
