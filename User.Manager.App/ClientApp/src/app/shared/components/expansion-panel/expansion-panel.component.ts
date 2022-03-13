import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

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
    @Input() public title: string;

    public toggle(): void
    {
        this.expanded = !this.expanded;
    }

    public get expandeState(): string
    {
        return this.expanded ? 'expanded' : 'collapsed';
    }
}
