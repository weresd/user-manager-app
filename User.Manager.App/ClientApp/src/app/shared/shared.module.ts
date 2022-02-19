import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';

import { EntitiesChangerComponent, ConfirmDialogComponent, DialogButtonsComponent } from './components';
import { SearchBarComponent } from './components';
import { NamedEntitySearchPipe } from './pipes';

@NgModule({
    declarations: [
        EntitiesChangerComponent,
        ConfirmDialogComponent,
        DialogButtonsComponent,
        SearchBarComponent,
        NamedEntitySearchPipe
    ],
    imports: [
        CommonModule,
        MatListModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        EntitiesChangerComponent,
        ConfirmDialogComponent,
        DialogButtonsComponent,
        SearchBarComponent,
        NamedEntitySearchPipe
    ],
    providers: []
})
export class SharedModule { }
