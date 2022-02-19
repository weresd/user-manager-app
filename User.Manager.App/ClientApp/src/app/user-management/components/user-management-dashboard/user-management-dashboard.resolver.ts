import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RepositoriesFabrica, SpinnerService, TitleService } from '@app/core';

@Injectable()
export class UserManagementDashboardResolver implements Resolve<any>
{
    /**
     * Constructor.
     *
     * @param {TitleService} titleService
     * @param {RepositoriesFabrica} repositoriesFabrica
     * @param {SpinnerService} spinnerService
     */
    public constructor(
        private titleService: TitleService,
        private repositoriesFabrica: RepositoriesFabrica,
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
            this.repositoriesFabrica.getUserRepository().find(),
            this.repositoriesFabrica.getGroupRepository().find()
        ])
            .pipe(
                map(([users, groups]) => {
                    return { users: users, groups: groups };
                }),
                tap(() => this.titleService.setTitle('User Management'))
            );
    }
}
