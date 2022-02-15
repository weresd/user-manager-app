import { id } from '../types';

export interface INamedEntity
{
    /**
     * Entity ID.
     *
     * @type {id}
     */
    id: id;

    /**
     * Entity name.
     *
     * @type {name}
     */
    name: string;
}
