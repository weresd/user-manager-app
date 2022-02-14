import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';
import { MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { Storages, LocalStorage } from './storages';

import { UserMenuComponent } from './components';
import { BodyComponent, HeaderComponent, MainMenuComponent, PageNotFoundComponent, SpinnerComponent } from './components';
import { UserRepository, GroupRepository } from './entities';
import { SharedModule } from '@app/shared';

@NgModule({
    declarations: [
        BodyComponent,
        HeaderComponent,
        SpinnerComponent,
        MainMenuComponent,
        PageNotFoundComponent,
        UserMenuComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule,
        MatMenuModule
    ],
    exports: [
        BodyComponent,
        PageNotFoundComponent,
    ],
    providers: [
        UserRepository,
        GroupRepository,
        Storages,
        LocalStorage
    ]
})
export class CoreModule { }
