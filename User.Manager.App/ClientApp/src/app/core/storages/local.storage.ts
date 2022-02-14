import { Injectable } from '@angular/core';

import { IStorage } from './istorage';

@Injectable()
export class LocalStorage implements IStorage
{
    /**
     * {@inheritdoc}
     */
    public get isSupport(): boolean
    {
        return typeof window.localStorage == 'object';
    }

    /**
     * {@inheritdoc}
     */
    public setItem(key: string, value: string): void
    {
        window.localStorage.setItem(key, value);
    }

    /**
     * {@inheritdoc}
     */
    public getItem(key: string): string | null
    {
        return window.localStorage.getItem(key);
    }
}
