import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';
import { MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { UserMenuComponent } from './components';
import { BodyComponent, HeaderComponent, MainMenuComponent, PageNotFoundComponent, SpinnerComponent } from './components';

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
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule,
        MatMenuModule,
        CommonModule
    ],
    exports: [
        BodyComponent,
        PageNotFoundComponent,
    ],
    providers: []
})
export class CoreModule { }
