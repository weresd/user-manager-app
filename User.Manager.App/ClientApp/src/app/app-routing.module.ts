import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'user-management',
        pathMatch: 'full'
    },
    {
        path: 'user-management',
        loadChildren: () => import('./user-management').then(m => m.UserManagementModule)
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
