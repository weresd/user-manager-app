import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { GroupRepository, SpinnerService, TitleService, UserRepository } from '@app/core';

@Injectable()
export class UserManagementDashboardResolver implements Resolve<any>
{
    /**
     * Constructor.
     */
    public constructor(
        private titleService: TitleService,
        private userRepository: UserRepository,
        private groupRepository: GroupRepository,
        private spinnerService: SpinnerService
    )
    {
        return;
    }

    /**
     * Resolves data.
     *
     * @param {ActivatedRouteSnapshot} route
     *
     * @returns {Observable<any>}
     */
    public resolve(route: ActivatedRouteSnapshot): Observable<any>
    {
        this.spinnerService.show();

        return forkJoin([
            this.userRepository.find(),
            this.groupRepository.find()
        ])
            .pipe(
                map(([users, groups]) => {
                    return { users: users, groups: groups };
                }),
                tap(() => this.titleService.setTitle('User Management'))
            );
    }
}
