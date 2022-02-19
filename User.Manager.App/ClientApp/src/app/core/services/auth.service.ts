import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../entities';

@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    /**
     * Authorized user.
     * For an unauthorized user, the value is null.
     *
     * @type {BehaviorSubject<User|null>}
     */
    public readonly user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

    /**
     * Constructor.
     */
    public constructor()
    {
        this.user$.next(new User({
            login: 'admin',
            email: ''
        }));
    }
}
