import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatDividerModule,  MatExpansionModule,  MatFormFieldModule, MatListModule } from '@angular/material';
import { MatIconModule, MatInputModule, MatMenuModule, MatSnackBarModule, MatGridListModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@app/core';
import { ConfirmDialogComponent, SharedModule } from '@app/shared';
import { GroupFormDialogComponent, UserViewComponent, GroupViewComponent } from './components';
import { UserManagementDashboardComponent, UserManagementDashboardResolver, UserFormDialogComponent } from './components';
import { UserManagementRoutingModule } from './user-management-routing.module';

@NgModule({
    declarations: [
        UserManagementDashboardComponent,
        UserFormDialogComponent,
        GroupFormDialogComponent,
        UserViewComponent,
        GroupViewComponent
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
        MatFormFieldModule,
        MatExpansionModule,
        MatListModule
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
