import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TitleService
{
    /**
     * Title state.
     *
     * @type {BehaviorSubject<string>}
     */
    public readonly $title: BehaviorSubject<string> = new BehaviorSubject<string>('');

    /**
     * Constructor.
     * 
     * @param {Title} browserTitle
     */
    public constructor(public browserTitle: Title)
    {
        return;
    }

    /**
     * Sets title.
     * 
     * @param {string} title
     *
     * @returns {void}
     */
    public setTitle(title: string): void
    {
        this.browserTitle.setTitle(title);
        this.$title.next(title);
    }
}
