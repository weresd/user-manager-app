import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INamedEntity } from '../../interfaces';

@Component({
    selector: 'app-entities-changer',
    templateUrl: './entities-changer.component.html',
    styleUrls: ['./entities-changer.component.scss']
})
export class EntitiesChangerComponent
{
    /**
     * List of entities.
     *
     * @type {INamedEntity[]}
     */
    @Input() public entities: INamedEntity[] = [];

    /**
     * List title.
     *
     * @type {string}
     */
    @Input() public title: string;

    /**
     * Icon for list items.
     *
     * @type {string | null}
     */
    @Input() public entityIcon: string | null = null;

    /**
     * Selected entity.
     *
     * @type {INamedEntity | null}
     */
    @Input() public selectedEntity: INamedEntity | null = null;

    /**
     * Emitter for event "entityChanged".
     *
     * @type {EventEmitter<INamedEntity>}
     */
    @Output() public entityChanged: EventEmitter<INamedEntity> = new EventEmitter<INamedEntity>();

    /**
     * Entity selection handler.
     *
     * @param {INamedEntity} entity
     *
     * @returns {void}
     */
    public change(entity: INamedEntity): void
    {
        this.entityChanged.emit(entity);
    }
}
