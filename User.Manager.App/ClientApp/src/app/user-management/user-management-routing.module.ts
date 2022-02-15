import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagementDashboardComponent, UserManagementDashboardResolver } from './components';

const routes: Routes = [
    {
        path: '',
        component: UserManagementDashboardComponent,
        resolve: {
            requestData: UserManagementDashboardResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserManagementRoutingModule { }
