import { Observable } from 'rxjs';

export interface IRead<TEntity>
{
    /**
     * Returns a list of entities.
     *
     * @returns {Observable<TEntity[]>}
     */
    find(): Observable<TEntity[]>;

    /**
     * Returns an entity by id.
     *
     * @param {string} id
     *
     * @returns {Observable<TEntity>}
     */
    findOne(id: string): Observable<TEntity>;
}
