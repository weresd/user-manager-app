import { OnInit, Input, Component } from '@angular/core';
import { MenuPositionX } from '@angular/material';

import { User } from '../../entities';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit
{
    /**
     * Position for drop down user menu items.
     *
     *  @type {MenuPositionX}
     */
    @Input() xPosition: MenuPositionX = 'before';

    /**
     * Authorized user.
     *
     * @type {User | null}
     */
    public user: User | null;

    /**
     * Returns user login.
     *
     * @returns {string}
     */
    public get userLogin(): string
    {
        return this.user ? this.user.login : 'Login';
    }

    /**
     * Constructor.
     *
     * @param {AuthService} authService
     */
    public constructor(private authService: AuthService)
    {
        return;
    }

    /**
     * Subscribes to an authorized user change.
     *
     * {@inheritdoc}
     */
    public ngOnInit(): void
    {
        this.authService.user$.subscribe(user => this.user = user);
    }
}
