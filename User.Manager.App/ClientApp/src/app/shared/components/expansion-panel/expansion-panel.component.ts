import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-expansion-panel',
    templateUrl: './expansion-panel.component.html',
    styleUrls: ['./expansion-panel.component.scss'],
    animations: [
        trigger('rotate', [
            state('expanded', style({ })),
            state('collapsed', style({ transform: 'rotate(180deg)' })),
            transition('expanded <=> collapsed', [animate('500ms ease')])
        ]),
        trigger('expande', [
            state('collapsed, void', style({height: '0px', visibility: 'hidden'})),
            state('expanded', style({height: '*', visibility: 'visible'})),
            transition('expanded <=> collapsed', [animate('500ms ease')])
        ]),
    ]
})
export class ExpansionPanelComponent
{
    /**
     * Expanded flag.
     *
     * @type {boolean}
     */
    @Input() public expanded: boolean = true;

    /**
     * Panel title.
     */
    @Input() public title: string;

    /**
     * Output event "expandedChange".
     *
     * @type {EventEmitter<boolean>}
     */
    @Output() public expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * Toggles the expanded state of the panel.
     *
     * @returns {void}
     */
    public toggle(): void
    {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    }

    /**
     * Returns the name of the animation trigger based on the expanded state of the panel.
     *
     * @returns {string}
     */
    public get expandeState(): string
    {
        return this.expanded ? 'expanded' : 'collapsed';
    }
}
