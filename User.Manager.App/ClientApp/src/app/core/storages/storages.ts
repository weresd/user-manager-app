import { Injectable } from '@angular/core';

import { IStorage } from './istorage';
import { LocalStorage } from './local.storage';
import { MemoryStorage } from './memory.storage';

@Injectable()
export class Storages
{
    /**
     * List of storages.
     *
     * @type {IStorage[]}
     */
    private readonly storages: IStorage[];

    /**
     * Constructor.
     *
     * @param {LocalStorage} localStorage
     * @param {MemoryStorage} memeoryStorage
     */
    public constructor(
        private localStorage: LocalStorage,
        private memeoryStorage: MemoryStorage
    )
    {
        this.storages = [
            this.localStorage,
            this.memeoryStorage,
        ];

        return;
    }

    /**
     * Returns the first supported store.
     *
     * @returns {IStorage | null}
     */
    public getSupportedStorage(): IStorage | null
    {
        for (const storage of this.storages)
        {
            if (storage.isSupport)
            {
                return storage;
            }
        }

        return null;
    }
}
