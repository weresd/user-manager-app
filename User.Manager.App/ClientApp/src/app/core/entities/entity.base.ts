import { isString } from 'util';
import { id } from '@app/shared';

export class EntityBase
{
    /**
     * Entity ID.
     *
     * @type {id}
     */
    public id: id = null;

    /**
     * Constructor.
     *
     * @param {object} data
     */
    public constructor(data: any = {})
    {
        if (data.id && isString(data.id))
        {
            this.id = data.id;
        }

        return;
    }
}
