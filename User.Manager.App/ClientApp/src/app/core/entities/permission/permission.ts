import { isString } from 'util';
import { INamedEntity } from '@app/shared';

import { EntityBase } from '../entity.base';

export class Permission extends EntityBase implements INamedEntity
{
    /**
     * Permission name.
     *
     * @type {string}
     */
    public name: string;

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
    }
}
