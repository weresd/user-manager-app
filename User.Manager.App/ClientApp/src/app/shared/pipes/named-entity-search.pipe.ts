import { Pipe, PipeTransform } from '@angular/core';

import { INamedEntity } from '../interfaces';

@Pipe({name: 'namedEntitySearch' })
export class NamedEntitySearchPipe implements PipeTransform
{
    /**
     * @inheritdoc
     */
    public transform(entities: INamedEntity[], searchName: string = '')
    {
        if (searchName.length === 0) {
            return entities;
        }

        return entities.filter(e => e.name.indexOf(searchName) !== -1);
    }
}
