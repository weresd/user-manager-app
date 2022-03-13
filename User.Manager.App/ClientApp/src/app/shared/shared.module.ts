import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule, MatListModule } from '@angular/material';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule } from '@angular/material';

import { EntitiesChangerComponent, ConfirmDialogComponent, DialogButtonsComponent } from './components';
import { SearchBarComponent, ExpansionPanelComponent, CheckboxComponent, ViewRowComponent } from './components';
import { NamedEntitySearchPipe } from './pipes';

@NgModule({
    declarations: [
        EntitiesChangerComponent,
        ConfirmDialogComponent,
        DialogButtonsComponent,
        SearchBarComponent,
        NamedEntitySearchPipe,
        ExpansionPanelComponent,
        CheckboxComponent,
        ViewRowComponent
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
        NamedEntitySearchPipe,
        ExpansionPanelComponent,
        CheckboxComponent,
        ViewRowComponent
    ],
    providers: []
})
export class SharedModule { }
