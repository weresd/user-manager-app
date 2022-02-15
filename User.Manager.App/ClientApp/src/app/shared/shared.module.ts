import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatIconModule, MatListModule } from '@angular/material';

import { EntitiesChangerComponent, ConfirmDialogComponent, DialogButtonsComponent } from './components';

@NgModule({
    declarations: [
        EntitiesChangerComponent,
        ConfirmDialogComponent,
        DialogButtonsComponent
    ],
    imports: [
        CommonModule,
        MatListModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatDividerModule
    ],
    exports: [
        EntitiesChangerComponent,
        ConfirmDialogComponent,
        DialogButtonsComponent
    ],
    providers: []
})
export class SharedModule { }
