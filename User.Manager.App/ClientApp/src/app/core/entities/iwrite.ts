import { Observable } from 'rxjs';

export interface IWrite<TEntity>
{
    /**
     * Creates a new entity or modifies it.
     *
     * @param {TEntity} item
     *
     * @returns {Observable<TEntity>}
     */
    save(item: TEntity): Observable<TEntity>;

    /**
     * Deletes the entity.
     *
     * @param {TEntity} item
     *
     * @returns {Observable<boolean>}
     */
    delete(item: TEntity): Observable<boolean>;
}
