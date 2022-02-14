import { isString } from 'util';
import { INamedEntity } from '@app/shared';

import { EntityBase } from '../entity.base';

export class User extends EntityBase implements INamedEntity
{
    /**
     * User name.
     *
     * @type {string}
     */
    public name: string;

    /**
     * User login.
     *
     * @type {string}
     */
    public login: string;

    /**
     * User email.
     *
     * @type {string}
     */
    public email: string;

    /**
     * Constructor.
     *
     * @param {any} data
     */
    public constructor(data: any = {})
    {
        super(data);

        if (data.name && isString(data.name))
        {
            this.name = data.name;
        }

        if (data.login && isString(data.login))
        {
            this.login = data.login;
        }

        if (data.email && isString(data.email))
        {
            this.email = data.email;
        }
    }
}
