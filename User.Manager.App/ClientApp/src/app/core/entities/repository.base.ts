import { Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Guid } from 'guid-typescript';

import { IWrite } from './iwrite';
import { IRead } from './iread';
import { EntityBase } from './entity.base';
import { IStorage } from '../storages/istorage';
import { Storages } from '../storages/storages';
import { JsonHelper } from '../helpers';

export abstract class RepositoryBase<TEntity extends EntityBase> implements IWrite<TEntity>, IRead<TEntity>
{
    /**
     * Data storage.
     *
     * @type {IStorage}
     */
    protected storage: IStorage;

    /**
     * Storage key.
     *
     * @type {string}
     */
    protected storageKey: string;

    /**
     * Repositore entity type.
     *
     * @type {any}
     */
    protected entityType: any;

    /**
     * Constructor.
     *
     * @param {Storages} storageService
     */
    public constructor(storageService: Storages)
    {
        this.storage = storageService.getSupportedStorage();

        if (this.storage == null)
        {
            throw new Error('No supported storages found.');
        }

        return;
    }

    /**
     * @inheritdoc
     */
    public save(item: TEntity): Observable<TEntity>
    {
        let items = this.getStorageData();

        if (item.id == null)
        {
            item.id = Guid.create().toString();
            items.push(item);
        }
        else
        {
            items = items.map(i =>
            {
                if (i.id == item.id)
                {
                    i = item;
                }

                return i;
            });
        }

        this.storage.setItem(this.storageKey, JSON.stringify(items));

        return of(item);
    }

    /**
     * @inheritdoc
     */
    public delete (item: TEntity): Observable<boolean>
    {
        const items = this.getStorageData().filter(i => i.id !== item.id);

        this.storage.setItem(this.storageKey, JSON.stringify(items));

        return of(true);
    }

    /**
     * @inheritdoc
     */
    public find(): Observable<TEntity[]>
    {
        return of(this.getStorageData());
    }

    /**
     * @inheritdoc
     */
    public findOne(id: string): Observable<TEntity>
    {
        return this
            .find()
            .pipe(
                map(items => items.find(i => i.id == id)),
                mergeMap(item => item == null ? throwError('Not founded entity') : of(item))
            );
    }

    /**
     * Returns all data from storage by storageKey.
     *
     * @returns {TEntity[]}
     */
    protected getStorageData(): TEntity[]
    {
        const json = this.storage.getItem(this.storageKey);

        let items = [];

        if (json !== null)
        {
            items = JsonHelper.decode(json, []);
        }

        items = items.map(i => new this.entityType(i));

        return items;
    }
}
