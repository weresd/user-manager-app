import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatDividerModule,  MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@app/core';
import { ConfirmDialogComponent, SharedModule } from '@app/shared';
import { UserManagementDashboardComponent, UserManagementDashboardResolver, UserFormDialogComponent, GroupFormDialogComponent } from './components';
import { UserManagementRoutingModule } from './user-management-routing.module';

@NgModule({
    declarations: [
        UserManagementDashboardComponent,
        UserFormDialogComponent,
        GroupFormDialogComponent
    ],
    imports: [
        CoreModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        SharedModule,
        UserManagementRoutingModule,
        MatGridListModule,
        MatDividerModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [],
    providers: [
        UserManagementDashboardResolver
    ],
    entryComponents: [
        ConfirmDialogComponent,
        UserFormDialogComponent,
        GroupFormDialogComponent
    ]
})
export class UserManagementModule { }
