import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { take } from 'rxjs/operators';

import { Group, GroupRepository, SpinnerService, } from '@app/core';

@Component({
    selector: 'app-group-form-dialog',
    templateUrl: './group-form-dialog.component.html',
    styleUrls: ['./group-form-dialog.component.scss']
})
export class GroupFormDialogComponent implements OnInit
{
    /**
     * Editable group.
     *
     * @type {Group}
     */
    public group: Group;

    /**
     * Form group.
     *
     * @type {FormGroup}
     */
    public formGroup: FormGroup;

    /**
     * Constructor.
     *
     * @param {MatDialogRef<UserFormDialogComponent>} dialogRef
     * @param {SpinnerService} spinnerService
     * @param {UserRepository} userRepository
     * @param {any} data
     */
    public constructor(
        private dialogRef: MatDialogRef<GroupFormDialogComponent>,
        private spinnerService: SpinnerService,
        private groupRepository: GroupRepository,
        @Inject(MAT_DIALOG_DATA) private data: any
    )
    {
        this.group = data.group === null ? new Group() : data.group;

        return;
    }

    /**
     * {@inheritdoc}
     */
    public ngOnInit(): void
    {
        this.resetForm();
    }

    /**
     * Resets group form.
     *
     * @returns {void}
     */
    private resetForm(): void
    {
        this.formGroup = new FormGroup({
            name: new FormControl(this.group.name, [Validators.required, Validators.minLength(4)]),
        })
    }

    /**
     * Save group.
     *
     * @returns {void}
     */
    public save(): void
    {
        if (this.formGroup.invalid)
        {
            return;
        }

        this.spinnerService.show();

        this.group.name = this.formGroup.get('name').value;

        this.groupRepository
            .save(this.group)
            .pipe(take(1))
            .subscribe(group => {
                this.dialogRef.close(group);
                this.spinnerService.hide();
            });
    }
}
