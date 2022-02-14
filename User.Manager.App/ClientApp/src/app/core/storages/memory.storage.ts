import { Injectable } from '@angular/core';

import { IStorage } from './istorage';

@Injectable({
    providedIn: 'root'
})
export class MemoryStorage implements IStorage
{
    /**
     * Storage.
     *
     * @type {Map<string, string>}
     */
    private storage: Map<string, string> = new Map<string, string>();

    /**
     * {@inheritdoc}
     */
    public get isSupport(): boolean
    {
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public setItem(key: string, value: string): void
    {
        this.storage.set(key, value);
    }

    /**
     * {@inheritdoc}
     */
    public getItem(key: string): string | null
    {
        return this.storage.get(key);
    }
}
