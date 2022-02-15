import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SpinnerService, User, UserRepository } from '@app/core';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-user-form-dialog',
    templateUrl: './user-form-dialog.component.html',
    styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent implements OnInit
{
    /**
     * Editable user.
     *
     * @type {User}
     */
    public user: User;

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
        private dialogRef: MatDialogRef<UserFormDialogComponent>,
        private spinnerService: SpinnerService,
        private userRepository: UserRepository,
        @Inject(MAT_DIALOG_DATA) private data: any
    )
    {
        this.user = data.user === null ? new User() : data.user;

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
     * Resets user form.
     *
     * @returns {void}
     */
    private resetForm(): void
    {
        this.formGroup = new FormGroup({
            name: new FormControl(this.user.name, [Validators.required, Validators.minLength(4)]),
            login: new FormControl(this.user.login, [Validators.required, Validators.minLength(4)]),
            email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        })
    }

    /**
     * Save user.
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

        this.user.name = this.formGroup.get('name').value;
        this.user.login = this.formGroup.get('login').value;
        this.user.email = this.formGroup.get('email').value;

        this.userRepository
            .save(this.user)
            .pipe(take(1))
            .subscribe(user => {
                this.dialogRef.close(user);
                this.spinnerService.hide();
            });
    }
}
