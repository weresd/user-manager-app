import { Component, Input } from '@angular/core';
import { User } from '@app/core';

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent
{
    /**
     * Viewed User.
     *
     * @type {User}
     */
    @Input() public user: User;
}
